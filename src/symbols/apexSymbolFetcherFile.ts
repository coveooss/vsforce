import vscode = require('vscode');
import fs = require('fs');
var antlr4 = require('antlr4/index');

import {IApexSymbolFetcher} from './ApexSymbolFetcher'
import {ApexSymbolCache} from './apexSymbolCache'
import {IApexSymbol, IApexObject, IApexMethod, ApexScope, IApexVariable} from './ApexSymbol'

import ApexListener = require('../antlr4/ApexListener')
import {ApexAnalyzer} from '../antlr4/ApexAnalyzer'

export class ApexSymbolFetcherFile implements IApexSymbolFetcher {
    public canOverwrite: boolean = true;
    private disposable: vscode.Disposable[] = [];

    constructor(private cache: ApexSymbolCache) {
        let fileWatcher = vscode.workspace.createFileSystemWatcher('**/*.cls');
        this.disposable.push(fileWatcher.onDidChange((uri: vscode.Uri) => this.handleFileChange(uri)));
        this.disposable.push(fileWatcher.onDidCreate((uri: vscode.Uri) => this.handleFileChange(uri)));
        this.disposable.push(fileWatcher.onDidDelete((uri: vscode.Uri) => this.handleFileDelete(uri)));
        this.disposable.push(fileWatcher);
    }

    private getListener() {
        var listener = Object.create(ApexListener.ApexListener.prototype);
        var cls: IApexObject = null;
        var lastSymbol = cls;
        var resolve = () => cls;

        return {
            done: new Promise<IApexSymbol>((resolve, reject) => {
                listener.enterClassDeclaration = (ctx) => {
                    var myClass: IApexObject = {
                        name: ctx.Identifier().getText(),
                        type: "class",
                        namespace: null,
                        scope: ApexScope.private,
                        static: null,
                        childrens: []
                    }

                    if (!cls) {
                        cls = myClass;
                    } else {
                        cls.childrens.push(myClass);
                    }

                    lastSymbol = myClass;
                };

                listener.enterMethodDeclaration = (ctx) => {
                    var myMethod: IApexMethod = {
                        name: ctx.Identifier().getText(),
                        type: "method",
                        returnType: ctx.type() ? ctx.type().getText() : "void",
                        attributes: [],
                        childrens: [],
                        static: false,
                        scope: ApexScope.private
                    };

                    lastSymbol.childrens.push(myMethod);
                };

                listener.enterLocalVariableDeclaration = (ctx) => {
                    var declarators: any[] = ctx.variableDeclarators().variableDeclarator();
                    if (declarators.length > 0) {
                        declarators.forEach(d => {
                            var variable: IApexVariable = {
                                childrens: [],
                                name: d.variableDeclaratorId().getText(),
                                scope: ApexScope.public,
                                type: "variable",
                                variableType: ctx.type().getText(),
                                static: false
                            }
                            lastSymbol.childrens[lastSymbol.childrens.length - 1].childrens.push(variable);
                        })
                    }
                }

                listener.exitCompilationUnit = (ctx) => {
                    resolve(cls);
                };
            }),
            listener: listener
        };
    }

    private handleFileChange(uri: vscode.Uri) {
        //this.createComponentFromUri(uri).then((c => this.cache.updateSymbol(c)));
    }

    /**
     * TODO: give a description
     *
     * @param {vscode.Uri} uri file uri
     */
    private handleFileDelete(uri: vscode.Uri) {
        //this.cache.removeComponent(this.getComponentNameByUri(uri));
    }

    /**
     * TODO: give a description
     *
     * @param {vscode.Uri} uri file uri
     *
     * @return {Thenable<IVisualforceComponent>} TODO: give a description
     */
    private getSymbolsFromUri(uri: vscode.Uri): Thenable<IApexSymbol> {
        var listener = this.getListener();
        fs.readFile(uri.fsPath, 'utf8', (err, data) => {
            ApexAnalyzer.analyse(listener.listener, data);
        });

        return listener.done;
    }

    /**
     * TODO: give a description
     *
     * @param {vscode.Uri} uri file name
     */
    private getComponentNameByUri(uri: vscode.Uri) {
        //return `c:${utils.getFileNameFromUri(uri).split('.')[0]}`;
    }

    /**
     * TODO: give a description
     */
    public dispose() {
        this.disposable.forEach(d => d.dispose());
    }


    public fetchAll(): Thenable<IApexSymbol[]> {
        return new Promise<IApexSymbol[]>((resolve, reject) => {
            vscode.workspace.findFiles('**/*.cls', '').then(uris => {
                let classes: Thenable<IApexSymbol>[] = [];
                uris.forEach(uri => {
                    classes.push(this.getSymbolsFromUri(uri));
                });

                Promise.all<IApexSymbol>(classes).then((symbols) => {
                    resolve(symbols);
                });
            });
        });
    }
}
