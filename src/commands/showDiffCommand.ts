import * as vscode from 'vscode';

import {ICommand} from './command';
import {getFileNameFromUri, getSalesforceTypeFromFileName} from '../utils/utils';
import {SalesforceQueryBuilder} from '../builder/salesforceQueryBuilder';


/**
 * Show diff class.
 *
 * Makes a diff with your Salesforce organization file and your local file.
 */
export class ShowDiffCommand implements ICommand {
  /**
   * Creates a Diff command
   */
  constructor() { }

  public dispose() { }

  /**
   * Implements execute from {@link Command}
   *
   * @param {vscode.Uri} uri Context file from the right click `Compare with Salesforce`
   */
  public Execute(uri: vscode.Uri) {
    let filename: string = getFileNameFromUri(uri);
    // let uri = new vscode.Uri();
    // uri.
    vscode.commands
      .executeCommand('vscode.diff',
      uri,
      vscode.Uri.parse(), `${filename} (LOCAL) <~> ${filename} (REMOTE)`);
  }
}
