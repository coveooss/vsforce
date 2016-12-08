import {ICommand} from './command';
import {Connection} from './../connection';

import * as vscode from 'vscode';

import * as utils from '../utils/utils';
import {StatusBarUtil} from '../utils/statusBarUtil';

/**
 * Retrieve command class.
 *
 * Fetches Salesforce components defined in our package.xml
 */
export class RetrieveCommand implements ICommand {
  // Connection handle through Salesforce
  private conn: Connection = new Connection();
  private output: vscode.OutputChannel;
  private retrieveTarget: string;

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
    }
    this.output.clear();

    let retrievePromise = utils.choosePackageXml()
      .then((path: string) => { // Parsing the package.xml file to find what to retrieve
        this.logMessage('Parsing package.xml file.');
        this.retrieveTarget = path;
        return utils.parsePackageXML(path);
      })
      .then((packageDom: any) => { // Sending the retrieve request to salesforce with the content of the package.xml
        if (packageDom.Package) {
          delete packageDom.Package.$;
          let retrieveOptions = {
            unpackaged: packageDom.Package
          };

          StatusBarUtil.setLoading('Retrieve package from Salesforce ...', retrievePromise);
          this.logMessage('Sending Retrieve Request to Salesforce...');
          return this.conn.retrievePackage(retrieveOptions);
        }
      });

    retrievePromise
      .then((response: any) => { // Handle the response from salesforce.
        this.handleSalesforceRetrieveResponse(response);
      })
      .catch((reason: string) => {
        if (reason) {
          this.logMessage(`ERROR ${reason}`);
          vscode.window.showInformationMessage(`Error retrieving package`, { title: 'Show output', action: 'SHOW_OUTPUT' }).then((m: any) => {
            if (m && m.action === 'SHOW_OUTPUT') {
              this.output.show();
            }
          });
        }
      });
  }

  public dispose() {
    this.output.dispose();
  }

  private handleSalesforceRetrieveResponse(response: any) {
    this.logMessage('Retrieve request completed');
    this.logMessage(`Status: ${response.status}`);
    this.logMessage('============================\n');

    if (response && response.messages) { // If Salesforce returned messages.
      if (response.messages instanceof Array) { // Salesforce will return either an object or an array
        response.messages.forEach(message => {
          this.logMessage(`${message.fileName} => ${message.problem}`);
        });
      } else {
        this.logMessage(`${response.messages.fileName} => `);
        this.logMessage(response.messages.problem);
      }
    }

    if (response && response.success) {
      this.logMessage('Extracting response from Salesforce');
      // Salesforce returns a zip in a base64 encoded string so we need to parse it
      utils.extractZipFromBase64String(response.zipFile, this.retrieveTarget.replace('package.xml', ''))
        .then((data) => {
          this.logMessage('Package retrieved \n');
          vscode.window.showInformationMessage(`Package retrieved`, { title: 'Show output', action: 'SHOW_OUTPUT' }).then((m: any) => {
            if (m && m.action === 'SHOW_OUTPUT') {
              this.output.show();
            }
          });
        }, (reason) => {
          this.logMessage(`ERROR ${reason}`);
          vscode.window.showInformationMessage(`Error retrieving package`, { title: 'Show output', action: 'SHOW_OUTPUT' }).then((m: any) => {
            if (m && m.action === 'SHOW_OUTPUT') {
              this.output.show();
            }
          });
        });
    } else { // Retrieve failed
      this.logMessage(`ERROR retrieving package.`);
    }
  }

  private logMessage(message: string) {
    if (message) {
      let dateString = new Date();
      this.output.appendLine(`${dateString.toLocaleString()} : ${message}`);
    }
  }
}
