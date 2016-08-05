import vscode = require('vscode');

import {Command} from './command';
import {buildSalesforceUri, getFileNameFromUri} from '../utils';

/**
 * Show diff class.
 *
 * Makes a diff with your Salesforce organization file and your local file.
 */
export class ShowDiffCommand implements Command {
  /**
   * Creates a Diff command
   */
  constructor() {}

  /**
   * Implements command from {@link Command}
   *
   * @param {vscode.Uri} uri Context file from the right click `Compare with Salesforce`
   */
  public Execute(uri: vscode.Uri) {
    let split = getFileNameFromUri(uri).split('.');
    let filename = `${split[0]}.${split[1]}`;

    vscode.commands
      .executeCommand('vscode.diff',
        uri, vscode.Uri.parse(buildSalesforceUri(split[0], split[1])), `${filename} (LOCAL) <-> ${filename} (REMOTE)`);
  }
}
