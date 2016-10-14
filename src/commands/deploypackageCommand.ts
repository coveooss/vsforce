import {ICommand} from './command';
import {Connection} from './../connection';

import * as utils from '../utils/utils';
import * as vscode from 'vscode';
import * as fs from 'fs';
import {StatusBarUtil} from '../utils/statusBarUtil'

let jsforce = require('jsforce');

/**
 * Deploy command class.
 *
 * Deploy Salesforce components defined in our package.xml
 */
export class DeploypackageCommand implements ICommand {
  // Connection handle through Salesforce
  private conn: Connection = new Connection();
  private output: vscode.OutputChannel;

  /**
   * Implements execute from {@link Command}
   *
   * Executes the command for this class
   */
  public Execute() {

    if (!this.output) {
      this.output = vscode.window.createOutputChannel('Retrieve request');
    } else {
      this.output.clear();
    }

    let deployPromise = utils.choosePackageXml() // Choose a package.xml file in the current workspace to deploy
      .then((path: string) => { 
        this.output.appendLine('Packaging folder.');
        return utils.zipFolder(path.replace('package.xml', ''));
      })
      .then((zipBuffer:Buffer) => {
        this.output.appendLine('Sending to Salesforce...');
        return this.conn.deployPackage(zipBuffer, {});
      });

    deployPromise
      .then((result: any) => {
        this.output.appendLine('Deploy package completed');
        this.output.appendLine(`Status: ${result.status}`);
        this.output.appendLine('============================\n');

        if (result.success) { // Request succeeded

          // Salesforce doesn't send an array of just 1 element...
          let successes = utils.asArray(result.details.componentSuccesses);
          successes.forEach((success: any) => {
            // Print successes messages to the output.
            this.output.appendLine(`INFO Deployed : ${success.componentType} => ${success.fullName}`);
          });

          // Show the information message and the output if the user presses show output.
          vscode.window.showInformationMessage(`Deployment of package success`, {title: "Show output", action: "SHOW_OUTPUT"}).then((m: any) => {
            if (m.action === "SHOW_OUTPUT") {
              this.output.show();
            }
          });

        } else { // Request failed

          // Salesforce doesn't send an array of just 1 element...
          let failures = utils.asArray(result.details.componentFailures);
          result.details.componentFailures.forEach(failures => {
            // Print error messages to the output.
            this.output.appendLine(`ERROR ${failures.problemType} : ${failures.fileName} => ${failures.problem}`);
          });
          
          // Show the error message and the output if the user presses show output.
          vscode.window.showErrorMessage("Salesforce deploy request error", {title: "Show output", action: "SHOW_OUTPUT"}).then((m: any) => {
            if (m.action === "SHOW_OUTPUT") {
              this.output.show();
            }
          });
        }
      })
      .catch((reason: string) => {
        vscode.window.showErrorMessage(reason, {title: "Show output", action: "SHOW_OUTPUT"}).then((m) => {
          if (m.action === "SHOW_OUTPUT") {
            this.output.show();
          }
        });
      });

    StatusBarUtil.setLoading("Deploying package to Salesforce ...", deployPromise);
  }
}
