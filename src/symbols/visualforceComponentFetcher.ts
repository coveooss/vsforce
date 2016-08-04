import vscode = require('vscode');

export interface IVisualforceComponentFetcher extends vscode.Disposable {
  fetchAll(): Thenable<IVisualforceComponent[]>
  canOverwrite: boolean
}
