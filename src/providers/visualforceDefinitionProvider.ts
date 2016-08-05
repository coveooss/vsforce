import vscode = require('vscode');
import {VisualforceComponentCacheInstance} from '../symbols/visualforceComponentCache';

/**
 * Visualforce Definition Provider class.
 *
 * TODO: finish this
 */
export class VisualforceDefinitionProvider implements vscode.DefinitionProvider {
  /**
   * Implements DefinitionProvider from {@link DefinitionProvider}
   * 
   * @param {vscode.TextDocument} document TODO: give a description
   * @param {vscode.Position} position TODO: give a description
   * @param {vscode.CancellationToken} token TODO: give a description
   * 
   * @return {Thenable<vscode.Definition>} TODO: give a description
   */
  public provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.Definition> {
    return new Promise<vscode.Definition>((resolve, reject) => {
      let range = document.getWordRangeAtPosition(position);
      let symbol = document.getText(range);

      let vfComponent = VisualforceComponentCacheInstance.getComponent(symbol);
      if (vfComponent != null && vfComponent.uri != null) {
        resolve(new vscode.Location(vscode.Uri.parse(vfComponent.uri), new vscode.Position(0, 0)));
      }
    });
  }
}
