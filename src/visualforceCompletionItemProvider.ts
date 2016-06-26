import vscode = require('vscode')
import {visualforce} from './refs/visualforce'

export class VisualforceCompletionItemProvider implements vscode.CompletionItemProvider {
  private autoCompleteData = visualforce;

  public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
    return new Promise<vscode.CompletionItem[]>((resolve, reject) => {
      var autoCompletionItems: vscode.CompletionItem[] = [];

      for (var tag in this.autoCompleteData) {
        autoCompletionItems.push(new vscode.CompletionItem(tag));
      }

      resolve(autoCompletionItems);
    });
  }
}


