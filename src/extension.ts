'use strict';

import * as vscode from 'vscode';
import {Connection} from './connection'

let jsforce = require('jsforce');
let fs = require('fs');
var zipFolder = require('zip-folder');

export function activate(context: vscode.ExtensionContext) {
    var conn = new Connection();

    let executeQuery = vscode.commands.registerCommand('extension.executeQuery', () => {
        vscode.window.showInputBox({ prompt: "Query: " }).then(query => conn.executeQuery(query));
    })
    context.subscriptions.push(executeQuery);

    let contextualQuery = vscode.commands.registerCommand('extension.contextualQuery', () => {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        var query = editor.document.getText(editor.selection);
        conn.executeQuery(query);
    })

    let executeCode = vscode.commands.registerCommand('extension.executeCode', () => {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return console.log("Please select a valid SOQL query");
        }
        var query = editor.document.getText(editor.selection);
        conn.executeCode(query);
    });
    context.subscriptions.push(executeCode);

    let sfdeploy = vscode.commands.registerCommand('extension.sfdeploy', () => {
        vscode.workspace.findFiles("package.xml", "").then((value: vscode.Uri[]) => {
            zipFolder(vscode.workspace.rootPath, '/toDeploy.zip', (err: any) => {
                if (err) { return console.error(err) }
                var zipStream = fs.createReadStream("toDeploy.zip");
                conn.execute((conn: any) => {
                    conn.metadata.deploy(zipStream, { "allowMissingFiles": true, "autoUpdatePackage": true, "singlePackage": true })
                        .complete(function (err, result) {
                            if (err) { return console.error(err); }
                            console.log('done ? :' + result.done);
                            console.log('success ? : ' + result.true);
                            console.log(result);
                        })
                })
            })
        },
            (reason: any) => {
                console.error(reason);
            });
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}