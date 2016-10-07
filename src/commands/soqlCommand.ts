
import vscode = require('vscode');
import {ICommand}  from './command';
import {Connection, IQueryResult} from '../connection';

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
            let outputConsole = vscode.window.createOutputChannel('SOQL query');

            outputConsole.appendLine('Query Results');
            outputConsole.appendLine(json);
            outputConsole.show();
          });
      }, (reason: Error) => {
        vscode.window.showErrorMessage(reason.message);
      });
  }
}
