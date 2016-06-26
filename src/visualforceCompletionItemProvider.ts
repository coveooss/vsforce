import vscode = require('vscode')
import {visualforce} from './refs/visualforce'

export class VisualforceCompletionItemProvider implements vscode.CompletionItemProvider {
  private autoCompletionItems: vscode.CompletionItem[] = [];

  public constructor() {
    for (var tag in visualforce) {
      this.autoCompletionItems.push(new vscode.CompletionItem(tag));
    }

    vscode.languages.setLanguageConfiguration("visualforce", {
      wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\'\"\,\.\<\>\/\?\s]+)/g
    });
  }

  public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
    var _this = this;

    var line = document.lineAt(position.line);
    var symbolMatches = /<(\w+:\w+).*>/.exec(line.text);

    if (symbolMatches && symbolMatches.length == 2) {
      var attribsCompletionItems: vscode.CompletionItem[] = []
      for (var attr in visualforce[symbolMatches[1]].attribs) {
        attribsCompletionItems.push(new vscode.CompletionItem(attr));
      }

      return new Promise<vscode.CompletionItem[]>((resolve, reject) => {
        resolve(attribsCompletionItems);
      });
    }

    return new Promise<vscode.CompletionItem[]>((resolve, reject) => {
      resolve(_this.autoCompletionItems);
    });
  }
}


