import vscode = require('vscode');

export function getFileNameFromUri(uri: vscode.Uri): string {
  return uri.path.replace(/^.*[\\\/]/, '')
}

export function buildSalesforceUri(component: string, extension: string): string {
  return `sf://salesforce.com/apexcomponent/${vscode.workspace.getConfiguration('vsforce.organisation')['namespace']}/${component}.${extension}`;
}
