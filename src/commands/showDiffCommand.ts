import * as vscode from 'vscode';

import {ICommand} from './command';
import {buildSalesforceUri, getFileNameFromUri} from '../utils/utils';
import {SalesforceQueryBuilder} from '../builder/salesforceQueryBuilder';


/**
 * Show diff class.
 *
 * Makes a diff with your Salesforce organization file and your local file.
 */
export class ShowDiffCommand implements ICommand {
  // Salesforce component query builder
  private builder: SalesforceQueryBuilder = new SalesforceQueryBuilder();

  /**
   * Creates a Diff command
   */
  constructor() { }

  /**
   * Implements execute from {@link Command}
   *
   * @param {vscode.Uri} uri Context file from the right click `Compare with Salesforce`
   */
  public Execute(uri: vscode.Uri) {
    let filename: string = getFileNameFromUri(uri);

    vscode.commands
      .executeCommand('vscode.diff',
        uri,
        vscode.Uri.parse(this.builder.buildComponentQuery(filename)), `${filename} (LOCAL) <~> ${filename} (REMOTE)`);
  }
}
