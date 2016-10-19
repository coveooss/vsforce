
import * as vscode from 'vscode';
import {ICommand}  from './command';
import {buildSalesforceUriFromQuery} from '../utils/utils';

export class SOQLCommand implements ICommand {
  constructor() { }

  public dispose() { }

  public Execute() {
    vscode.window.showInputBox()
      .then((query: string) => {
        let previewUri = buildSalesforceUriFromQuery(query);

        vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two, 'SOQL Results').then(null, reason => {
          vscode.window.showErrorMessage(reason);
        });
      });
  }
}
