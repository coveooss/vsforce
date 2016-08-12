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
    let split = getFileNameFromUri(uri).split('.');
    let filename = `${split[0]}.${split[1]}`;
    let salesforce = new SalesforceQueryBuilder()
      .addRoute('apexcomponent')
      .addRoute(vscode.workspace.getConfiguration('vsforce.organization').get<string>('namespace'))
      .addRoute(`${split[0]}.${split[1]}`)
      .build();

    vscode.commands
      .executeCommand('vscode.diff',
      uri, vscode.Uri.parse(salesforce), `${filename} (LOCAL) <-> ${filename} (REMOTE)`);
  }
}
