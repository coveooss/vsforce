import vscode = require('vscode');

import {Command} from './command';
import {buildSalesforceUri, getFileNameFromUri} from '../utils';

export class ShowDiffCommand implements Command {
  constructor() {}

  public Command(uri: vscode.Uri) {
    // split[0] == filename
    // split[1] == file extension
    let split = getFileNameFromUri(uri).split('.');
    vscode.commands.executeCommand('vscode.diff',
      uri, vscode.Uri.parse(buildSalesforceUri(split[0], split[1])));
  }
}
