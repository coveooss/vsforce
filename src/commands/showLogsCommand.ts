import vscode = require('vscode');

import {Connection} from './../connection';
import {ICommand} from './command';
import {SOQLQueryBuilder} from '../builder/soqlQueryBuilder';

/**
 * Show logs class.
 *
 * Fetches Salesforce logs from your organization.
 */
export class ShowLogsCommand implements ICommand {
  // Connection handle through Salesforce
  private conn: Connection = new Connection();
  private soqlBuilder = new SOQLQueryBuilder();

  /**
   * Creates a Show logs command
   */
  constructor() {
    this.conn.createUserTraceFlag();
  }

  public dispose() { }

  /**
   * Implements execute from {@link Command}
   */
  public Execute() {
    vscode.window.showQuickPick(new Promise<vscode.QuickPickItem[]>((resolve, reject) => {
      let query = this.soqlBuilder.buildSOQLQuery({
        attributes: ['ID', 'Operation', 'Status'],
        tables: ['Apexlog']
      });
      this.conn.executeQuery(query).then((results) => {
        let logs: vscode.QuickPickItem[] = [];

        for (var record in results.records) {
          logs.push({
            label: results.records[record].Operation,
            description: results.records[record].Status,
            detail: results.records[record].Id
          });
        }

        resolve(logs);
      });
    })).then((item: vscode.QuickPickItem) => {
      vscode.commands.executeCommand(
        'vscode.open',
        vscode.Uri.parse(`sf://salesforce.com/apexlogs/${item.detail}.apexlog`));
    });
  }
}
