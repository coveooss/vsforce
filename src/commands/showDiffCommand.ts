import vscode = require('vscode');

import {ICommand} from './command';
import {getFileNameFromUri} from '../utils';
import {SalesforceQueryBuilder} from '../builder/salesforceQueryBuilder';

/**
 * Show diff class.
 *
 * Makes a diff with your Salesforce organization file and your local file.
 */
export class ShowDiffCommand implements ICommand {
  private builder: SalesforceQueryBuilder;
  /**
   * Creates a Diff command
   */
  constructor() {
    this.builder = new SalesforceQueryBuilder();
  }

  /**
   * Implements execute from {@link Command}
   *
   * @param {vscode.Uri} uri Context file from the right click `Compare with Salesforce`
   */
  public Execute(uri: vscode.Uri) {
    let split = getFileNameFromUri(uri).split('.');
    let filename = `${split[0]}.${split[1]}`;

    vscode.commands
      .executeCommand('vscode.diff',
        uri,
        vscode.Uri.parse(this.builder.buildComponentQuery(filename)), `${filename} (LOCAL) <-> ${filename} (REMOTE)`);
  }
}
