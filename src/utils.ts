import vscode = require('vscode');

import * as fs from 'fs';
import * as xml2js from 'xml2js';

let configuration = vscode.workspace.getConfiguration('vsforce.organization');
var stream = require('readable-stream');
var unzip = require('unzip');
var fstream = require('fstream');

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
 * @return {Promise<string>} The selected package.xml full path
 */
export function choosePackageXml(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    vscode.workspace.findFiles('**/package.xml', '').then((files: vscode.Uri[]) => {
      if (files.length == 1) { // Only one package.xml found, using this one

        resolve(files[0].fsPath);

      } else if (files.length > 1) { // Multiple package.xml found, asking user to choose

        let packages: vscode.QuickPickItem[] = [];

        files.forEach(file => { // Create the quickpick options
          packages.push({
            label: file.fsPath.replace(vscode.workspace.rootPath, ''),
            description: '',
            detail: file.fsPath
          });
        });

        vscode.window.showQuickPick(packages).then((selected) => {  // Show a selection of the existing package.xml
          if (selected) { resolve(selected.detail); }
        }, (reason) => {
          reject(reason);
        });
      } else { // No package.xml found.
        reject(new Error('Cannot find a package.xml'));
      }

    }, (reason) => {
      reject(reason);
    });
  });
}

/**
 * Wrapper in the form of a promise for the callback function to read a file
 *
 * @param {path: string} The path to the file to read
 * 
 * @return {Promise<Buffer>} Resolves with a Buffer of the file read
 */
export function readFileAsync(path: string): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err: NodeJS.ErrnoException, data: Buffer) => {
      if (err) {
        vscode.window.showErrorMessage(err.message);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

/**
 * Parses a xml buffer to a js object wrapped in a promise
 *
 * @param {data: Buffer} The xml buffer
 * 
 * @return {Promise<any>} Resolves with the js object
 */
export function xml2jsAsync(data: Buffer): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    xml2js.parseString(data.toString(), { explicitArray: false }, (err, dom) => {
      if (err) {
        vscode.window.showErrorMessage(err.message);
        reject(err);
      } else {
        resolve(dom);
      }
    });
  });
}

/**
 * Unzips the files in the base64 string returned by Salesforce on a retrieve request.
 *
 * @param {content: string} The base64 string
 * @param {target: string} The path target where to unzip
 * 
 * @return {Promise<any>} Resolves when the files are extracted or reject on error
 */
export function extractZipFromBase64String(content: string, target: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    let zipstream = new stream.PassThrough();
    zipstream.end(new Buffer(content, 'base64'));
    zipstream.pipe(unzip.Parse())
      .on('entry', (entry: any) => {
        entry.path = entry.path.replace('unpackaged/', '');
        entry.pipe(fstream.Writer({
          type: entry.type,
          path: target + entry.path
        }))
          .on('end', () => { resolve(true); }) // Finished
          .on('error', (err: any) => { reject(err); });
      });
  });
}

/**
 * Parse the packageXML file structure to return a javascript object
 *
 * @param {path: string} The path of the packageXML file
 * 
 * @return {Promise<any>} The parsed object
 */
export function parsePackageXML(path: string): Promise<any> {
  return readFileAsync(path)
    .then((data: Buffer) => {
      return xml2jsAsync(data);
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

