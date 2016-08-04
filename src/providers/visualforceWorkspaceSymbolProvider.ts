import vscode = require('vscode');
import {VisualforceComponentCacheInstance} from '../symbols/visualforceComponentCache';

export class VisualforceWorkspaceSymbolProvider implements vscode.WorkspaceSymbolProvider {
  provideWorkspaceSymbols(query: string, token: vscode.CancellationToken): Thenable<vscode.SymbolInformation[]> {
    return new Promise<vscode.SymbolInformation[]>((resolve, reject) => {

      var symbols: vscode.SymbolInformation[] = [];

      VisualforceComponentCacheInstance.getComponentNames().forEach(n => {
        if (n.includes(query)) {
          var c: IVisualforceComponent = VisualforceComponentCacheInstance.getComponent(n);

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
