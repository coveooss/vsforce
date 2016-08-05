import vscode = require('vscode');

import {Command} from './command';
import {buildSalesforceUri, getFileNameFromUri} from '../utils';

export class ShowDiffCommand implements Command {
  constructor() {}

  public Command(context: vscode.Uri) {
    // split[0] == filename
    // split[1] == file extension
    let split = getFileNameFromUri(context).split('.');
    vscode.commands.executeCommand('vscode.diff',
      context, vscode.Uri.parse(buildSalesforceUri(split[0], split[1])));
  }
}
