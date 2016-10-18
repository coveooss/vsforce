import * as vscode from 'vscode';

import {ICommand} from './command';
import {getFileNameFromUri, getSalesforceTypeFromFileName, buildSalesforceUriFromLocalUri} from '../utils/utils';


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
    /*
        // Create a status bar item with Salesforce information about the last user that edited the page
        let status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);

        status.text = `$(git-commit) Last modified by ${results.records[0].LastModifiedBy.Name} on ${results.records[0].LastModifiedDate.substr(0, 10)}`;
        status.tooltip = `Modifications done on the file in your Salesforce organization`;
        status.show();

        // Remove the status bar item when we are not in a diff (salesforce) mode
        let event = vscode.workspace.onDidCloseTextDocument(() => {
          status.dispose();
          event.dispose();
        });
    */

    vscode.commands
      .executeCommand('vscode.diff',
      buildSalesforceUriFromLocalUri(uri), uri, `${filename} (REMOTE) <~> ${filename} (LOCAL)`);
  }
}
