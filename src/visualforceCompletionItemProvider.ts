import vscode = require('vscode')
import {visualforce} from './refs/visualforce'

export class VisualforceCompletionItemProvider implements vscode.CompletionItemProvider {
  private autoCompletionItems: vscode.CompletionItem[] = [];

  public constructor () {
    for (var tag in visualforce) {
      this.autoCompletionItems.push(new vscode.CompletionItem(tag));
    }
  }

  public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
    var _this = this;

    return new Promise<vscode.CompletionItem[]>((resolve, reject) => {
      resolve(_this.autoCompletionItems);
    });
  }
}


