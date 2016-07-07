import vscode = require('vscode');

export interface VisualforceComponentFetcher extends vscode.Disposable {
  fetchAll(): Thenable<VisualforceComponent[]>
  canOverwrite: boolean
}
