import vscode = require('vscode')
import {visualforce} from './refs/visualforce'
import {Connection, QueryResult} from './connection'

export class VisualforceCompletionItemProvider implements vscode.CompletionItemProvider {
  private autoCompletionItems: vscode.CompletionItem[] = [];
  private conn: Connection;

  public constructor() {
    vscode.languages.setLanguageConfiguration("visualforce", {
      wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\'\"\,\.\<\>\/\?\s]+)/g
    });

    this.conn = new Connection();
  }

  private getVisualforceComponentFromSalesforce(items: vscode.CompletionItem[]): Thenable<vscode.CompletionItem[]> {
    return new Promise<vscode.CompletionItem[]>((resolve, reject) => {
      this.conn.executeQuery("SELECT Description, Name, NamespacePrefix FROM ApexComponent", (results: QueryResult) => {
        if (results && results.totalSize != 0) {
          for (var record in results.records) {
            var completionItem = new vscode.CompletionItem((results.records[record].NamespacePrefix ? results.records[record].NamespacePrefix : "c") + ":" + results.records[record].Name);
            completionItem.documentation = results.records[record].Description;
            completionItem.detail = results.records[record].Name;
            completionItem.kind = vscode.CompletionItemKind.Class;
            completionItem.insertText = completionItem.label + "></" + completionItem.label + ">";

            items.push(completionItem);
          }
        }
        resolve(items);
      });
    });
  }

  public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
    var line = document.lineAt(position.line);
    var symbolMatches = /<(\w+:\w+).*>/.exec(line.text);

    if (symbolMatches && symbolMatches.length >= 2) {
      var attribsCompletionItems: vscode.CompletionItem[] = []
      for (var attr in visualforce[symbolMatches[1]].attribs) {
        var completionItem = new vscode.CompletionItem(attr);
        completionItem.kind = vscode.CompletionItemKind.Property;
        completionItem.insertText = completionItem.label + "=\"\"";

        attribsCompletionItems.push(completionItem);
      }

      return new Promise<vscode.CompletionItem[]>((resolve, reject) => {
        resolve(attribsCompletionItems);
      });
    }

    return new Promise<vscode.CompletionItem[]>((resolve, reject) => {
      this.autoCompletionItems = [];

      for (var tag in visualforce) {
        var completionItem = new vscode.CompletionItem(tag);
        completionItem.kind = vscode.CompletionItemKind.Class;
        completionItem
        completionItem.insertText = completionItem.label + "></" + completionItem.label + ">";

        this.autoCompletionItems.push(completionItem);
      }

      this.getVisualforceComponentFromSalesforce(this.autoCompletionItems).then((values: vscode.CompletionItem[]) => {
        resolve(values);
      });
    });
  }
}


