
import vscode = require('vscode');
import {ICommand}  from './command';
import {Connection, IQueryResult} from '../connection';
// import * as fs from 'fs';

export class SOQLCommand implements ICommand {
  // Salesforce connection handler
  private conn: Connection = new Connection();

  constructor() {}

  public Execute() {
    vscode.window.showInputBox({ prompt: 'Query: ' })
      .then((query: string) => {
        this.conn.executeQuery(query)
          .then((results: IQueryResult) => {
            let json = JSON.stringify(results, null, 2);

            // vscode.commands.executeCommand('vscode.previewHtml', encodeURI(json));
            let outputConsole = vscode.window.createOutputChannel('SOQL query');
            outputConsole.appendLine('Query Results');
            outputConsole.appendLine(json);
            outputConsole.show();

            // TODO: use preview.html or open commands
          });
      }, (reason: Error) => {
        vscode.window.showErrorMessage(reason.message);
      });
  }
}
