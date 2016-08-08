import vscode = require('vscode');

import {Connection, QueryResult} from './../connection';
import {Command} from './command';

/**
 * Show logs class.
 *
 * Fetches Salesforce logs from your organization.
 */
export class ShowLogsCommand implements Command {
  // Connection handle through Salesforce
  private conn: Connection = new Connection();

  /**
   * Creates a Show logs command
   */
  constructor() {
    this.conn.createUserTraceFlag();
  }

  /**
   * Implements execute from {@link Command}
   */
  public Execute() {
    vscode.window.showQuickPick(new Promise<vscode.QuickPickItem[]>((resolve, reject) => {
      this.conn.executeQuery('SELECT ID, Operation, Status FROM Apexlog').then((results) => {
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
        'vscode.open',
        vscode.Uri.parse(`sf://salesforce.com/apexlogs/${item.detail}.apexlog`));
    });
  }
}
