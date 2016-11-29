import vscode = require('vscode');
import {ApexBaseSymbols} from './apexBaseSymbols'
import {IApexSymbolFetcher} from './ApexSymbolFetcher'
import {ApexSymbolCache} from './apexSymbolCache'
import {IApexSymbol, IApexObject, IApexMethod, ApexScope} from './ApexSymbol'


export class ApexSymbolFetcherBase implements IApexSymbolFetcher {
    public canOverwrite: boolean = true;

    public fetchAll(): Thenable<IApexSymbol[]> {
        return new Promise<IApexSymbol[]>((resolve, reject) => {
            var symbolResults: IApexSymbol[] = [];
            var namespaces = Object.keys(ApexBaseSymbols.publicDeclarations);
            for (var namespace in namespaces) {
                var symbols = Object.keys(ApexBaseSymbols.publicDeclarations[namespaces[namespace]]);
                for (var s in symbols) {
                    var childrens: IApexSymbol[] = [];
                    var symbolObject = ApexBaseSymbols.publicDeclarations[namespaces[namespace]][symbols[s]];
                    symbolObject.methods.forEach(method => {
                        childrens.push({
                            childrens: [],
                            name: method.name,
                            static: method.isStatic,
                            type: "method",
                            scope: ApexScope.public
                        });
                    });
                    symbolResults.push({
                        name: symbols[s],
                        type: "class",
                        scope: ApexScope.public,
                        static: true,
                        childrens: childrens
                    });
                }
            }

            resolve(symbolResults);
        });
    }

    /**
     * TODO: give a description
     */
    public dispose() { }
}
