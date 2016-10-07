import * as vscode from 'vscode';

import * as fs from 'fs';
import * as xml2js from 'xml2js';

let configuration = vscode.workspace.getConfiguration('vsforce.organization');
var stream = require('readable-stream');
var unzip = require('unzip');

/**
 * TODO: give a description
 *
 * @param {vscode.Uri} uri file uri
 *
 * @return {string} Filename
 */
export function getFileNameFromUri(uri: vscode.Uri): string {
  return uri.path.replace(/^.*[\\\/]/, '');
}

/**
 * Finds the different files called "package.xml", if there is more than one asks the user to select one.
 *
 * @return {Thenable<string>} The selected package.xml full path
 */
export function choosePackageXml(): Thenable<string> {
  return new Promise<string>((resolve, reject) => {

    vscode.workspace.findFiles('**/package.xml', '')
      .then((files: vscode.Uri[]) => {

        if (files.length == 1) { // Only one package.xml found, using this one

          resolve(files[0].fsPath);

        }
        else if (files.length > 1) { // Multiple package.xml found, asking user to choose

          let packages: vscode.QuickPickItem[] = [];

          files.forEach(file => { // Create the quickpick options
            packages.push({
              label: file.fsPath.replace(vscode.workspace.rootPath, ''),
              description: '',
              detail: file.fsPath
            })
          });

          vscode.window.showQuickPick(packages) // Show a selection of the existing package.xml
            .then((selected) => {
              if(selected) {
                resolve(selected.detail); // Resolve with the selected value
              }
            },
            (reason) => {
              vscode.window.showErrorMessage(reason);
              reject(reason);
            })

        }
        else { // No package.xml found.

          reject("Cannot find any package.xml in the workspace.");

        }

      }, (reason: any) => {
        vscode.window.showErrorMessage(reason);
        reject(reason);
      });

  });
}

export function readFileAsync(path: string): Thenable<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err: NodeJS.ErrnoException, data: Buffer) => {
      if (err) {
        vscode.window.showErrorMessage(err.message);
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
}

export function xml2jsAsync(data: Buffer): Thenable<any> {
  return new Promise<any>((resolve, reject) => {
    xml2js.parseString(data.toString(), { explicitArray: false }, (err, dom) => {
      if (err) { reject(err); } else { resolve(dom); }
    });
  })
}

export function extractZip(content: string, target: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    let zipStream = new stream.PassThrough();
    zipStream.end(new Buffer(content, 'base64'));
    zipStream.pipe(unzip.Extract({ path: target }));
    resolve(true);
    // TODO: Handle the zip cleanly
    // zipStream.pipe(unzip.Parse())
      //   .on('entry', (entry) => {
      //     let filePaths = entry.path;
      //     let type = entry.type;
      //     entry.pipe(fs.createWriteStream(target));
      //   })
  });
}

/**
 * Get the namespace from the configuration settings
 *
 * @return {string} namespace
 */
export function getNamespaceFromConfig(): string {
  return configuration.get<string>('namespace');
}

/**
 * Get the organization from the configuration settings
 *
 * @return {string} organization
 */
export function getOrganizationFromConfig(): string {
  return configuration.get<string>('organization');
}

/**
 * Get the username from the configuration settings
 *
 * @return {string} username
 */
export function getUsernameFromConfig(): string {
  return configuration.get<string>('username');
}

/**
 * Get the password from the configuration settings
 *
 * @return {string} password
 */
export function getPasswordFromConfig(): string {
  return configuration.get<string>('password');
}

/**
 * Get the login url from the configuration settings
 *
 * @return {string} login url
 */
export function getLoginUrlFromConfig(): string {
  return configuration.get<string>('loginUrl');
}

/**
 * Get the security token from the configuration settings
 *
 * @return {string} security token
 */
export function getSecurityTokenFromConfig(): string {
  return configuration.get<string>('securityToken');
}
