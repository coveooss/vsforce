import vscode = require('vscode');
import {IApexObject} from '../symbols/apexSymbol';
import {ApexSymbolCacheInstance} from '../symbols/apexSymbolCache';

/**
 * Visualforce Completion Item Provider class.
 *
 * TODO: finish this
 */
export class ApexCompletionItemProvider implements vscode.CompletionItemProvider {

    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
        return new Promise<vscode.CompletionItem[]>((resolve, reject) => {
            let completionItems: vscode.CompletionItem[] = [];
            var lastCharPos = new vscode.Position(position.line, position.character - 1);
            var lastWordRange = document.getWordRangeAtPosition(lastCharPos)
            var lastChar = document.getText(new vscode.Range(position.line, position.character - 1, position.line, position.character));

            if (lastChar == ".") {
                var previousSymbol = document.getText(lastWordRange);
                var apexSymbol = ApexSymbolCacheInstance.getSymbol(previousSymbol) as IApexObject;

                apexSymbol.childrens.forEach(s => {
                    let completionItem = new vscode.CompletionItem(s.name);
                    completionItem.kind = this.getKindFromType(s.type);
                    completionItems.push(completionItem);
                });
            } else {
                ApexSymbolCacheInstance.getSymbols().forEach(s => {
                    let completionItem = new vscode.CompletionItem(s.name);
                    completionItem.kind = this.getKindFromType(s.type);
                    completionItems.push(completionItem);
                });
            }
            resolve(completionItems);
        });
    }

    private getKindFromType(type: string) {
        if (type == "class") {
            return vscode.CompletionItemKind.Class;
        }

        if (type == "method") {
            return vscode.CompletionItemKind.Method;
        }

        return vscode.CompletionItemKind.Keyword;
    }
}
