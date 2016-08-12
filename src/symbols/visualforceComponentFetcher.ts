import vscode = require('vscode');

/**
 * Apex Object interface.
 * TODO: needs a description
 */
export interface IVisualforceComponentFetcher extends vscode.Disposable {
  fetchAll(): Thenable<IVisualforceComponent[]>;
  canOverwrite: boolean;
}
