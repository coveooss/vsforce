import vscode = require('vscode')
import {VisualforceComponentCacheInstance} from '../symbols/visualforceComponentCache'

export class VisualforceDefinitionProvider implements vscode.DefinitionProvider {
  public provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.Definition> {
    return new Promise<vscode.Definition>((resolve, reject) => {
      var range = document.getWordRangeAtPosition(position);
      var symbol = document.getText(range);

      var vfComponent = VisualforceComponentCacheInstance.getComponent(symbol);
      if (vfComponent != null && vfComponent.uri != null) {
        resolve(new vscode.Location(vscode.Uri.parse(vfComponent.uri), new vscode.Position(0, 0)));
      }
    });
  }
}


