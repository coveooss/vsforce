import vscode = require('vscode');

let configuration = vscode.workspace.getConfiguration('vsforce.organization');

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
 * TODO: give a description
 *
 * @return {Thenable<string>} TODO: give a description
 */
export function findPackageXml(): Thenable<string> {
  return new Promise<string>((resolve, reject) => {
    var packages: vscode.QuickPickItem[] = [];

    vscode.workspace.findFiles('**/package.xml', '').then((values: vscode.Uri[]) => {

      if (values.length == 0) { // No package.xml found.

        vscode.window.showWarningMessage('Cannot find any package.xml');
        reject('Cannot find any package.xml');

      } else if (values.length == 1) { // Only one package.xml found, using this one

        vscode.window.showInformationMessage(`Found package.xml at ${values[0].fsPath}`);
        resolve(values[0].fsPath);

      } else { // Multiple package.xml found

        for (var i = 0; i < values.length; i++) {
          packages.push({
            label: values[i].fsPath.replace(vscode.workspace.rootPath, ''),
            description: '',
            detail: values[i].fsPath
          });
        }

        // Asks the user to choose between all package.xml files found
        vscode.window.showQuickPick(packages).then(val => {
          resolve(val.detail);
        });
      }

    },
      (reason: any) => {
        vscode.window.showErrorMessage(reason);
        reject(reason);
      });
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

export function getSecurityTokenFromConfig(): string {
  return configuration.get<string>('securityToken');
}

