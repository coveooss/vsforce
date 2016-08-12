import vscode = require('vscode');

/**
 * Command interface.
 * It helps us define custom commands for the extension.
 */
export interface ICommand {
  /**
   * This is the method to be implemented by a Command
   *
   * @param {?vscode.Uri} uri file uri
   */
  Execute(uri?: vscode.Uri);
}
