import vscode = require('vscode')
import {Connection, QueryResult} from './../connection'


export class SalesforceContentProvider implements vscode.TextDocumentContentProvider {
  private conn: Connection = new Connection();

  provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): Thenable<string> {
    var uriParts = uri.path.split("/");

    if (uriParts.length >= 1) {
      var objectType = uriParts[1];

      if (objectType == "apexcomponent") {
        if (uriParts.length == 4) {
          return this.resolveApexComponent(uriParts[2], uriParts[3]);
        }
      }

      if (objectType == "apexlogs") {
        if (uriParts.length == 3) {
          return this.resolveApexLog(uriParts[2].split('.')[0]);
        }
      }
    }

    return null;
  }

  private resolveApexComponent(namespace: string, name: string): Thenable<string> {
    return new Promise<string>((resolve, reject) => {
      this.conn.executeQuery(this.buildApexComponentQuery(namespace, name)).then((results: QueryResult) => {
        if (results && results.totalSize == 1) {
          resolve(results.records[0].Markup);
        }
      });
    });
  }

  private resolveApexLog(id: string): Thenable<string> {
    return this.conn.getLogBody(id);
  }

  private buildApexComponentQuery(namespace: string, name: string) {
    return "SELECT Markup FROM ApexComponent WHERE " +
      "NamespacePrefix=" + (namespace == "c" ? "null" : "'" + namespace + "'") +
      " and Name='" + name.split('.')[0] + "'";
  }
}


