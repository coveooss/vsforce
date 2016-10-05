import {ICommand} from './command';
import {Connection} from './../connection';

import * as vscode from 'vscode';
import * as fs from 'fs';

import * as utils from '../utils';

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
      this.output.show();
    }

    utils.choosePackageXml()
      .then((path: string) => { // Parsing the package.xml file to find what to retrieve
        this.output.appendLine('Parsing package.xml file.');
        this.retrieveTarget = path;
        return utils.parsePackageXML(path);
      })
      .then((packageDom: any) => { // Sending the retrieve request to salesforce with the content of the package.xml
        if (packageDom.Package) {
          delete packageDom.Package.$;
          let retrieveOptions = {
            unpackaged: packageDom.Package
          };

          this.output.appendLine('Sending Retrieve Request to Salesforce...');
          return this.conn.retrievePackage(retrieveOptions);
        }
      })
      .then((response: any) => { // Handle the response from salesforce.
        this.handleSalesforceRetrieveResponse(response);
      })
      .catch((reason: string) => {
        vscode.window.showErrorMessage(reason);
      });
  }

  private handleSalesforceRetrieveResponse(response: any) {
    this.output.appendLine('Retrieve request completed');
    this.output.appendLine(`Status: ${response.status}`);
    this.output.appendLine('============================\n');

    if (response && response.messages) { // If Salesforce returned messages.
      if (response.messages instanceof Array) { // Salesforce will return either an object or an array
        response.messages.forEach(message => {
          this.output.appendLine(`${message.fileName} => ${message.problem}`);
        });
      } else {
        this.output.appendLine(`${response.messages.fileName} => `);
        this.output.appendLine(response.messages.problem);
      }
    }

    if (response && response.success) {
      this.output.appendLine('Extracting response from Salesforce');
      // Salesforce returns a zip in a base64 encoded string so we need to parse it
      utils.extractZipFromBase64String(response.zipFile, this.retrieveTarget.replace('package.xml', ''))
        .then((data) => {
          this.output.append('Package retrieved \n');
        }, (reason) => {
          vscode.window.showErrorMessage(reason);
        });
    }
  }
}
