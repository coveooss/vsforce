import vscode = require('vscode');

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

      if (objectType == 'apexlogs') {
        if (uriParts.length == 3) {
          return this.resolveApexLog(uriParts[2].split('.')[0]);
        }
      }

      if (objectType == 'soqlquery') {
        return this.resolveSOQL(uri.query);
      }

      var field = 'Body';

      if (objectType == 'ApexComponent' || objectType == 'ApexPage') {
        field = 'Markup';
      };

      return this.resolveObject(uriParts[2], uriParts[3], objectType, field);
    }

    return null;
  }

  /**
   * Calls Salesforce to retrieve metadata about a Salesforce SOQL query
   *
   * @param {string} query Salesforce SOQL query
   */
  private resolveSOQL(query: string): Thenable<string> {
    console.log(query);
    return new Promise<string>((resolve, reject) => {
      this.conn.executeQuery(query)
        .then((results: IQueryResult) => {
          if (results) {
            let render = queryTemplate;
            render = render.replace('{{QUERY}}', query);
            render = render.replace('{{JSON_RESULT}}', JSON.stringify(results, null, 2));

            if (results.records.length >= 1) {
              let tableResult: string = '<table>';
              tableResult += '<tr>';
              Object.keys(results.records[0]).forEach(element => {
                if (element != 'attributes') {
                  tableResult += `<th>${element}</th>`;
                }
              });

              tableResult += '</tr>';

              results.records.forEach(record => {
                tableResult += '<tr>';
                Object.keys(record).forEach(field => {
                  if (field != 'attributes') {
                    tableResult += `<td>${record[field]}</td>`;
                  }
                });
                tableResult += '</tr>';
              });

              tableResult += '</table>';

              render = render.replace('{{TALBE_RESULT}}', tableResult);
              console.log(render);
            };

            resolve(render);
          }
        }, (err) => {
          reject(`${err.name} ${err.message}`);
        });
    });
  }

  /**
   * Calls Salesforce to retrieve metadata about a Salesforce object
   *
   * @param {string} namespace Salesforce namespace prefix
   * @param {string} name Component name
   */
  private resolveObject(namespace: string, name: string, type: string, field: string): Thenable<string> {
    return new Promise<string>((resolve, reject) => {
      this.conn.executeQuery(this.buildQuery(namespace, name, type, field)).then((results: IQueryResult) => {
        if (results && results.totalSize == 1) {
          resolve(results.records[0][field]);
        } else {
          reject('Object not found');
        }
      }, (err) => {
        console.log(err);
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
  private buildQuery(namespace: string, name: string, type: string, field: string): string {
    return `SELECT ${field} FROM ${type} WHERE NamespacePrefix=${namespace === 'c' ? null : `'${namespace}'`} and Name='${name.split('.')[0]}'`;
  }
}
