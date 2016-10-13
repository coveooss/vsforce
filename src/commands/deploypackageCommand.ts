import {ICommand} from './command';
import {Connection} from './../connection';

import * as utils from '../utils/utils';
import * as vscode from 'vscode';
import * as fs from 'fs';

let jsforce = require('jsforce');

/**
 * Retrieve command class.
 *
 * Fetches Salesforce components defined in our package.xml
 */
export class DeploypackageCommand implements ICommand {
  // Connection handle through Salesforce
  private conn: Connection = new Connection();
  private output: vscode.OutputChannel;

  /**
   * Creates a Retrieve command
   */
  constructor() { }

  /**
   * Implements execute from {@link Command}
   *
   * Executes the command for this class
   */
  public Execute() {

    if (!this.output) {
      this.output = vscode.window.createOutputChannel('Retrieve request');
      this.output.show();
    }

    utils.choosePackageXml() // Choose a package.xml file in the current workspace to deploy
      .then((path: string) => { 
        this.output.appendLine('Zipping the folder.');
        return utils.zipFolder(path.replace('package.xml', ''));
      })
      .then((zipBuffer:Buffer) => {
        this.output.appendLine('Sending to Salesforce');
        return this.conn.deployPackage(zipBuffer, {});
      })
      .then((result: any) => {
        this.output.appendLine('Deploy package completed');
        this.output.appendLine(`Status: ${result.status}`);
        this.output.appendLine('============================\n');
        if (!result.success) {
          if(result.details.componentFailures instanceof Array) {
            result.details.componentFailures.forEach(failures => {
              this.output.appendLine(`${failures.problemType} : ${failures.fileName} => ${failures.problem}`);
            });
          } else if(result.details.componentFailures instanceof Object) {
            let failures = result.details.componentFailures;
            this.output.appendLine(`${failures.problemType} : ${failures.fileName} => ${failures.problem}`);
          }
        } else {
          let compSuccesses = 1;
          if (result.details.componentSuccesses instanceof Array) {
            compSuccesses = result.details.componentSuccesses.length;
          }
          vscode.window.showInformationMessage(`Deployment success of ${compSuccesses} components`);
        }
      })
      .catch((reason: string) => {
        vscode.window.showErrorMessage(reason);
      });
  }
}
