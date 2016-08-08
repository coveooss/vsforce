import vscode = require('vscode');
import {VisualforceComponentCacheInstance} from '../symbols/visualforceComponentCache';

/**
 * Visualforce Completion Item Provider class.
 *
 * TODO: finish this
 */
export class VisualforceCompletionItemProvider implements vscode.CompletionItemProvider {
  /**
   * Creates a Visualforce Completion Item Provider
   */
  public constructor() {
    vscode.languages.setLanguageConfiguration('visualforce', {
      wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\'\"\,\.\<\>\/\?\s]+)/g
    });
  }

  /**
   * Implements provideCompletionItems from {@link CompletionItemProvider}
   *
   * @param {vscode.TextDocument} document TODO: give a description
   * @param {vscode.Position} position TODO: give a description
   * @param {vscode.CancellationToken} token TODO: give a description
   *
   * @return {Thenable<vscode.CompletionItem[]>} TODO: give a description
   */
  public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
    return new Promise<vscode.CompletionItem[]>((resolve, reject) => {
      let completionItems: vscode.CompletionItem[] = [];
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
