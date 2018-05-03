import {ICommand} from './command';
import {Connection} from './../connection';

import * as utils from '../utils/utils';
import * as vscode from 'vscode';
import {StatusBarUtil} from '../utils/statusBarUtil';

enum DeployStatus {
  Pending,
  InProgress,
  Succeeded,
  SucceededPartial,
  Failed,
  Canceling,
  Canceled
}

export interface IComponentSuccess {
  changed: string;
  componentType?: string;
  created: string;
  createdDate: string;
  deleted: string;
  fileName: string;
  fullName: string;
  id: string;
  success: string;
}

export interface IComponentFailure {
  changed: string;
  columnNumber?: string;
  componentType: string;
  created: string;
  deleted: string;
  fileName: string;
  fullName: string;
  lineNumber?: string;
  problem: string;
  problemType: string;
  success: string;
}

/**
 * Deploy command class.
 *
 * Deploy Salesforce components defined in our package.xml
 */
export class DeployPackageCommand implements ICommand {
  // Connection handle through Salesforce
  private conn: Connection = new Connection();
  private output: vscode.OutputChannel;
  private diags: vscode.DiagnosticCollection;
  private root: vscode.Uri;


  public dispose() {
    this.output.dispose();
    this.diags.dispose();
  }

  /**
   * Implements execute from {@link Command}
   *
   * Executes the command for this class
   */
  public Execute() {

    if (!this.output) { this.output = vscode.window.createOutputChannel('Deploy request'); }
    this.output.clear();

    if (!this.diags) { this.diags = vscode.languages.createDiagnosticCollection("Deploy errors") };

    let deployPromise = utils.choosePackageXml() // Choose a package.xml file in the current workspace to deploy
      .then((path: string) => {
        if (path) {
          this.logMessage('Packaging folder.');
          path = path.replace('package.xml', '');
          this.root = vscode.Uri.file(path);
          return utils.zipFolder(path);
        }
      })
      .then((zipBuffer: Buffer) => {
        StatusBarUtil.setLoading('Deploying package to Salesforce ...', deployPromise);
        this.logMessage('Sending to Salesforce...');
        return this.conn.deployPackage(zipBuffer, {});
      });

    deployPromise
      .then((result: any) => {
        this.diags.clear();
        this.handleDeployResponse(result);
      })
      .catch((ex: any) => {
        let message: String;
        message = `An error occured`;
        if (ex) {
          if (ex instanceof String) {
            message = ex;
            this.logMessage(ex as string);
          } else {
            this.logMessage(ex.toString());
          }
          vscode.window.showErrorMessage(message as string, { title: 'Show output', action: 'SHOW_OUTPUT' }).then((m) => {
            if (m.action && m.action === 'SHOW_OUTPUT') {
              this.output.show();
            }
          });
        }
      });
  }

  private handleDeployResponse(response: any) {
    this.logMessage('Package deployed');
    this.logMessage(`Status: ${response.status}`);
    this.logMessage('============================\n');

    switch (response.status) {
      case DeployStatus[DeployStatus.Failed]: // Failed
      case DeployStatus[DeployStatus.Succeeded]: // Succeeded
      case DeployStatus[DeployStatus.SucceededPartial]: // Succeeded partially
        this.displayDeployResponse(response);
        break;
      case DeployStatus[DeployStatus.InProgress]: // Other status
      case DeployStatus[DeployStatus.Canceling]:
      case DeployStatus[DeployStatus.Pending]:
        console.log("Should not happend")
        break;
    }

    vscode.window.showInformationMessage(`Package deploy status: ${response.status}`, { title: 'Show output', action: 'SHOW_OUTPUT' })
      .then((m: any) => {
        if (m && m.action === 'SHOW_OUTPUT') {
          this.output.show();
        }
      });
  }

  private displayDeployResponse(response: any) {
    if (response.details.componentSuccesses) {
      // Salesforce doesn't send an array of just 1 element...
      let successes = utils.asArray(response.details.componentSuccesses);
      successes.forEach((success: IComponentSuccess) => {
        // Print successes messages to the output.
        this.printSuccess(success);
      });
    }

    if (response.details.componentFailures) {
      // Salesforce doesn't send an array of just 1 element...
      let failures = utils.asArray(response.details.componentFailures);
      let failsDiags: { [key: string]: vscode.Diagnostic[] } = {};
      failures.forEach((fail: IComponentFailure) => {
        let diag = this.printFailure(fail); // Print failures messages to the output.
        let uri = vscode.Uri.file(`${this.root.fsPath}${vscode.Uri.parse(fail.fileName.replace('pkg/', '')).fsPath}`);
        if (!failsDiags[uri.fsPath]) {
          failsDiags[uri.fsPath] = [];
        }
        failsDiags[uri.fsPath].push(diag);
      });
      Object.keys(failsDiags).forEach((key) => {
        this.diags.set(vscode.Uri.file(key), failsDiags[key]);
      });
    }
  }

  private printSuccess(s: IComponentSuccess) {
    if (s.fullName !== "package.xml") {
      this.logMessage(`Deployed ${s.componentType} => ${s.fullName}`);
    }
  }

  private printFailure(f: IComponentFailure): vscode.Diagnostic {
    this.logMessage(`${f.problemType} with ${f.fullName}
    \t problem: ${f.problem}
    \t componentType: ${f.componentType}`);
    let diagSev = (f.problemType === "Warning" ? vscode.DiagnosticSeverity.Warning : vscode.DiagnosticSeverity.Error);
    let range = new vscode.Range(0, 0, 0, 0);
    if (f.lineNumber) {
      range = new vscode.Range(parseInt(f.lineNumber) - 1, parseInt(f.columnNumber) - 1, parseInt(f.lineNumber) - 1, parseInt(f.columnNumber) - 1);
      this.logMessage(`\t at (line, col) : (${f.lineNumber}, ${f.columnNumber}) `)
    }
    return new vscode.Diagnostic(range, `${f.fullName} : ${f.problem}`, diagSev);
  }

  private logMessage(message: string) {
    if (message) {
      let dateString = new Date();
      this.output.appendLine(`${dateString.toLocaleString()} : ${message}`);
    }
  }
}