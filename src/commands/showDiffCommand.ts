import vscode = require('vscode');

import {Command} from './command';
import {buildSalesforceUri, getFileNameFromUri} from '../utils';

/**
 * This class instantiate a diff command
 */
export class ShowDiffCommand implements Command {
  /**
   * Creates a new diff command
   */
  constructor() {}

  /**
   * Implements command from {@link Command}
   *
   * @param {vscode.Uri} uri Context from the right click `Compare with Salesforce`
   */
  public Command(uri: vscode.Uri) {
    // split[0] == filename
    // split[1] == file extension
    let split = getFileNameFromUri(uri).split('.');
    vscode.commands.executeCommand('vscode.diff',
      uri, vscode.Uri.parse(buildSalesforceUri(split[0], split[1])));
  }
}
