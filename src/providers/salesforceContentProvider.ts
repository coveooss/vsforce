import vscode = require('vscode');
import fs = require('fs');

import queryTemplate = require('../templates/queryTemplate');

import {Connection, IQueryResult} from './../connection';

/**
 * Salesforce Content Provider class.
 *
 * TODO: give a description
 */
export class SalesforceContentProvider implements vscode.TextDocumentContentProvider {
  // Connection handle through Salesforce
  private conn: Connection = new Connection();

  /**
   * TODO: give a description
   *
   * @param {vscode.Uri} uri file
   * @param {vscode.CancellationToken} token
   *
   * @return {Thenable<string>} TODO: give a description
   */
  provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): Thenable<string> {
    var uriParts = uri.path.split('/');

    if (uriParts.length >= 1) {
      let objectType = uriParts[1];

      if (objectType == 'apexcomponent') {
        if (uriParts.length == 4) {
          return this.resolveApexComponent(uriParts[2], uriParts[3]);
        }
      }

      if (objectType == 'apexlogs') {
        if (uriParts.length == 3) {
          return this.resolveApexLog(uriParts[2].split('.')[0]);
        }
      }

      if (objectType == 'soqlquery') {
        return this.resolveSOQL(uri.query);

      }
    }

    return null;
  }

  private resolveSOQL(query: string): Thenable<string> {
    console.log(query);
    return new Promise<string>((resolve, reject) => {
      this.conn.executeQuery(query)
        .then((results: IQueryResult) => {
          if (results) {
            var render = queryTemplate;
            render = render.replace("{{QUERY}}", query);
            render = render.replace("{{JSON_RESULT}}", JSON.stringify(results, null, 2));

            if (results.records.length >= 1) {
              var tableResult = "<table>";
              tableResult += "<tr>";
              Object.keys(results.records[0]).forEach(element => {
                if (element != "attributes") {
                  tableResult += "<th>" + element + "</th>";
                }
              });

              tableResult += "</tr>";

              results.records.forEach(record => {
                tableResult += "<tr>";
                Object.keys(record).forEach(field => {
                  if (field != "attributes") {
                    tableResult += "<td>" + record[field] + "</td>";
                  }
                })
                tableResult += "</tr>";
              })

              tableResult += "</table>";

              render = render.replace("{{TALBE_RESULT}}", tableResult);
              console.log(render);
            };

            resolve(render);
          }
        }, (err) => {
          reject(err.name + " " + err.message);
        });
    });
  }

  /**
   * Calls Salesforce to retrieve metadata about a Salesforce component
   *
   * @param {string} namespace Salesforce namespace prefix
   * @param {string} name Component name
   */
  private resolveApexComponent(namespace: string, name: string): Thenable<string> {
    return new Promise<string>((resolve, reject) => {
      this.conn.executeQuery(this.buildApexComponentQuery(namespace, name)).then((results: IQueryResult) => {
        if (results && results.totalSize == 1) {
          // Create a status bar item with Salesforce information about the last user that edited the page
          let status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);

          status.text = `$(git-commit) Last modified by ${results.records[0].LastModifiedBy.Name} on ${results.records[0].LastModifiedDate.substr(0, 10)}`;
          status.tooltip = `Modifications done on the file in your Salesforce organization`;
          status.show();

          // Remove the status bar item when we are not in a diff (salesforce) mode
          let event = vscode.workspace.onDidCloseTextDocument(() => {
            status.dispose();
            event.dispose();
          });

          resolve(results.records[0].Markup);
        }
      });
    });
  }

  /**
   * Retrieves Salesforce apex logs
   *
   * @return {Thenable<string>} TODO: needs a description
   */
  private resolveApexLog(id: string): Thenable<string> {
    return this.conn.getLogBody(id);
  }

  /**
   * Builds a SOQL query to fetch metadata about a component from Salesforce
   *
   * @param {string} namespace Salesforce namespace prefix
   * @param {string} name Component name
   *
   * @return {string} SOQL query
   */
  private buildApexComponentQuery(namespace: string, name: string): string {
    return `SELECT Markup, LastModifiedDate, LastModifiedBy.name FROM ApexComponent WHERE NamespacePrefix=${namespace === 'c' ? null : `'${namespace}'`} and Name='${name.split('.')[0]}'`;
  }
}
