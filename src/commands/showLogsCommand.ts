import vscode = require('vscode');

import {Connection, QueryResult} from './../connection'
import {Command} from './command'

export class ShowLogsCommand implements Command {
  private conn: Connection = new Connection();

  public Command() {
    vscode.window.showQuickPick(new Promise<vscode.QuickPickItem[]>((resolve, reject) => {
      this.conn.executeQuery("SELECT ID, Operation, Status FROM Apexlog").then((results) => {
        var logs: vscode.QuickPickItem[] = [];

        for (var record in results.records) {
          logs.push({
            label: results.records[record].Operation,
            description: results.records[record].Status,
            detail: results.records[record].Id
          });
        }

        resolve(logs);
      })
    })).then((item: vscode.QuickPickItem) => {
      vscode.commands.executeCommand(
        "vscode.open",
        vscode.Uri.parse("sf://salesforce.com/apexlogs/" + item.detail + ".apexlog"));
    });
  }
}
