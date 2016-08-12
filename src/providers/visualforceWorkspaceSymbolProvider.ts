import vscode = require('vscode');
import {VisualforceComponentCacheInstance} from '../symbols/visualforceComponentCache';

/**
 * Visualforce Workspace Symbol Provider class.
 *
 * TODO: finish this
 */
export class VisualforceWorkspaceSymbolProvider implements vscode.WorkspaceSymbolProvider {
  /**
   * Implements provideWorkspaceSymbols from {@link provideWorkspaceSymbols}
   *
   * @param {string} query TODO: give a description
   * @param {vscode.CancellationToken} token TODO: give a description
   *
   * @return {Thenable<vscode.SymbolInformation[]>} TODO: give a description
   */
  provideWorkspaceSymbols(query: string, token: vscode.CancellationToken): Thenable<vscode.SymbolInformation[]> {
    return new Promise<vscode.SymbolInformation[]>((resolve, reject) => {

      var symbols: vscode.SymbolInformation[] = [];

      VisualforceComponentCacheInstance.getComponentNames().forEach(n => {
        if (n.includes(query)) {
          let c: IVisualforceComponent = VisualforceComponentCacheInstance.getComponent(n);

          symbols.push(new vscode.SymbolInformation(
            n,
            vscode.SymbolKind.Class,
            new vscode.Range(0, 0, 0, 0),
            vscode.Uri.parse(c.uri)
          ));
        }
      });

      resolve(symbols);
    });
  }
}
