import vscode = require('vscode');

/**
 * Apex Object interface.
 * TODO: needs a description
 */
export interface VisualforceComponentFetcher extends vscode.Disposable {
  fetchAll(): Thenable<VisualforceComponent[]>
  canOverwrite: boolean
}
