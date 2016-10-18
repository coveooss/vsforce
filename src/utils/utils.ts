import * as vscode from 'vscode';

import * as fs from 'fs';
import * as xml2js from 'xml2js';
import {Config} from './Config';

var stream = require('readable-stream');
var unzip = require('unzip');
var fstream = require('fstream');
var archiver = require('archiver');

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


export function buildSalesforceUriFromLocalUri(uri: vscode.Uri) {
  return vscode.Uri.parse("sf://salesforce.com/" +
    getSalesforceTypeFromFileName(getFileNameFromUri(uri)) + "/" +
    Config.instance.customNamespace + "/" +
    getFileNameFromUri(uri).split('.')[0]);

export function getNamespaceOrNull(): string {
  return Config.instance.customNamespace == "c" ? null : Config.instance.customNamespace;
}

export function getFileNameFromPath(path: string): string {
  return path.replace(/^.*[\\\/]/, '');
}

export function getSalesforceTypeFromFileName(filename: string): string {
  var ext = filename.split('.')[1];

  switch (ext) {
    case 'component':
      return 'ApexComponent'
    case 'page':
      return 'ApexPage'
    case 'trigger':
      return 'ApexTrigger'
    case 'cls':
      return 'ApexClass'
  }
}


export function getSalesforceMetadata(filename: string): Thenable<any> {
  return new Promise<any>((resolve, reject) => {
    fs.readFile(filename, "UTF8", (err, data) => {
      if (err) {
        reject(err.message);
      }

      xml2js.parseString(data, (errParse, result) => {
        if (errParse) {
          reject(errParse.message);
        }

        resolve(result);
      })
    });
  });
}


/**
 * Finds the different files called "package.xml", if there is more than one asks the user to select one.
 *
 * @return {Promise<string>} The selected package.xml full path
 */
export function choosePackageXml(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    vscode.workspace.findFiles('**/package.xml', '**/node_modules/**')
      .then((files: vscode.Uri[]) => {
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
            if (selected) {
              resolve(selected.detail); // Resolve with the selected value
            }
          }, (reason) => {
            reject(reason);
          });
        } else { // No package.xml found.
          reject(new Error('Cannot find a package.xml'));
        }
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

export function zipFolder(path: string): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    let archive = archiver('zip');

    // Error during writing to the archive will throw this event
    archive.on('error', function (err) {
      reject(err.message);
    });

    // Push the selected directory to the archive
    archive.directory(path, 'pkg');
    archive.finalize();

    // The archive is also a Buffer so we can substitute
    resolve(archive);
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
 * Salesforce will not send an array of just one element in the responses. Convert to simpler to use array
 *
 * @param {obj: any} The param to convert to array
 *
 * @return {Array<any>} Array, either the original array or an array with one element
 */
export function asArray(obj: any): Array<any> {
  if (obj instanceof Array) {
    return obj;
  } else {
    return new Array(obj);
  }
}
