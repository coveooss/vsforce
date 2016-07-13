import vscode = require('vscode');
import {VisualforceComponentCacheInstance} from './symbols/visualforceComponentCache'
import {VisualforceCompletionItemProvider} from './providers/visualforceCompletionItemProvider'
import {SalesforceContentProvider} from './providers/salesforceContentProvider'
import {VisualforceDefinitionProvider} from './providers/visualforceDefinitionProvider'
import {VisualforceWorkspaceSymbolProvider} from './providers/visualforceWorkspaceSymbolProvider'

const visualforceDocumentFilter: vscode.DocumentFilter = { language: 'visualforce' };

export function activate(context: vscode.ExtensionContext) {

  context.subscriptions.concat([
    vscode.languages.registerCompletionItemProvider(visualforceDocumentFilter, new VisualforceCompletionItemProvider(), "<"),
    vscode.languages.registerDefinitionProvider(visualforceDocumentFilter, new VisualforceDefinitionProvider()),
    vscode.workspace.registerTextDocumentContentProvider("sf", new SalesforceContentProvider()),
    vscode.languages.registerWorkspaceSymbolProvider(new VisualforceWorkspaceSymbolProvider()),
    VisualforceComponentCacheInstance
  ]);
}
