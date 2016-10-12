import {ICommand} from './command';
import {Connection} from './../connection';

import * as vscode from 'vscode';
import * as fs from 'fs';

import * as utils from '../utils/utils';

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

    utils.choosePackageXml() // Choose between all the package.xml in the current workspace
      .then((path) => {
        this.output.appendLine('Parsing package.xml file.');
        this.retrieveTarget = path;
        this.parsePackageXML(path) // Parse the package xml definition into a javascript object
          .then((packageDom: any) => {
            if (packageDom.Package) {
              delete packageDom.Package.$;
              let retrieveOptions = { // Adds the unpackage options
                unpackaged: packageDom.Package
              };
              this.output.appendLine('Sending Retrieve Request to Salesforce...');
              this.conn.retrievePackage(retrieveOptions)
                .then((response) => {

                  this.handleSalesforceRetrieveResponse(response);

                },
                (reason) => {
                  vscode.window.showErrorMessage(reason.message);
                  this.output.appendLine("\nError while recovering the package => Error message below:");
                  this.output.appendLine(reason.stack);
                })
            } else {
              vscode.window.showErrorMessage("Invalid package.xml structure");
            }
          },
          (reason) => {
            vscode.window.showErrorMessage(reason);
          });
      },
      (reason) => {
        vscode.window.showErrorMessage(reason);
      });
  }

  private handleSalesforceRetrieveResponse(response: any) {
    this.output.appendLine('Retrieve request completed');
    this.output.appendLine(`Status: ${response.status}`);
    this.output.appendLine('============================\n');

    if (response && response.messages) {
      if (response.messages instanceof Array) {
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
      utils.extractZip(response.zipFile, this.retrieveTarget.replace('package.xml', ''))
        .then((data) => {
          this.output.append('Package retrieved \n');
        }, (reason) => {
          vscode.window.showErrorMessage(reason);
        })
    }
  }

  private parsePackageXML(path: string): Thenable<any> {
    return new Promise((resolve, reject) => {

      utils.readFileAsync(path)
        .then((data: Buffer) => {

          return new Promise((resolve, reject) => {
            utils.xml2jsAsync(data)
              .then((dom: any) => {
                resolve(dom);
              },
              (reason: any) => {
                reject(reason);
              });
          })
            .then((dom: any) => { resolve(dom); },
            (reason) => { reject(reason); });

        }, (reason: any) => {
          reject(reason);
        });

    });
  }
}
