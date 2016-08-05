import vscode = require('vscode')
import {VisualforceComponentCacheInstance} from '../symbols/visualforceComponentCache'

export class VisualforceCompletionItemProvider implements vscode.CompletionItemProvider {
  public constructor() {
    vscode.languages.setLanguageConfiguration('visualforce', {
      wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\'\"\,\.\<\>\/\?\s]+)/g
    });
  }

  public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
    return new Promise<vscode.CompletionItem[]>((resolve, reject) => {
      var completionItems: vscode.CompletionItem[] = [];
      console.log(document.getText(document.getWordRangeAtPosition(position)));
      VisualforceComponentCacheInstance.getComponentNames().forEach(cmp => {
        let completionItem = new vscode.CompletionItem(cmp);
        completionItem.kind = vscode.CompletionItemKind.Class;
        completionItem.insertText = `${completionItem.label}></${completionItem.label}>`;

        completionItems.push(completionItem);
      });
      resolve(completionItems);
    });
  }
}
