import vscode = require('vscode');

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

          vscode.window.showQuickPick(packages)
            .then((selected) => {
              resolve(selected.detail);
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
