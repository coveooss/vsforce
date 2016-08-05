import vscode = require('vscode');

export function getFileNameFromUri(uri: vscode.Uri): string {
  return uri.path.replace(/^.*[\\\/]/, '')
}

/**
 * This will build a saleforce uri string for SOQL
 * {@link buildApexComponentQuery}
 *
 * @param {string} component saleforce component name
 * @param {string} extension salesforce component extension
 *
 * @return {string} salesforce component uri
 */
export function buildSalesforceUri(component: string, extension: string): string {
  return `sf://salesforce.com/apexcomponent/${vscode.workspace.getConfiguration('vsforce.organisation')['namespace']}/${component}.${extension}`;
}
