
import * as vscode from 'vscode';
import {ICommand}  from './command';
import {Connection, IQueryResult} from '../connection';
import {SalesforceQueryBuilder} from '../builder/salesforceQueryBuilder';
import * as fs from 'fs';


export class SOQLCommand implements ICommand {
  // Salesforce connection handler
  private conn: Connection = new Connection();
  // Salesforce component query builder
  private builder: SalesforceQueryBuilder = new SalesforceQueryBuilder();

  constructor() {}

  public Execute() {
    vscode.window.showInputBox({ prompt: 'Query: ' })
      .then((query: string) => {
        let previewUri = vscode.Uri.parse(this.builder.buildSOQLQuery(query));
        vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two, 'SOQL Results').then(success => {
        }, reason => {
          vscode.window.showErrorMessage(reason);
        });

        // this.conn.executeQuery(query)
        //   .then((results: IQueryResult) => {
        //     let json = JSON.stringify(results, null, 2);
        //     let previewUri = vscode.Uri.parse(`sf://vsforce/soql-preview`);

        //     vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two, 'SOQL Results').then(success => {

        //     }, reason => {
        //       vscode.window.showErrorMessage(reason);
        //     });

        //     // outputConsole.appendLine('Query Results');
        //     // outputConsole.appendLine(json);
        //     // outputConsole.show();
        //   });
      }, (reason: Error) => {
        vscode.window.showErrorMessage(reason.message);
      });
  }
}
