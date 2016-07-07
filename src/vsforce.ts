import vscode = require('vscode');
import {VisualforceComponentCacheInstance} from './symbols/visualforceComponentCache'
import {VisualforceCompletionItemProvider} from './providers/visualforceComponentCIP'

const apexDocumentFilter: vscode.DocumentFilter = { language: 'visualforce' };

export function activate(context: vscode.ExtensionContext) {

  context.subscriptions.concat([
    // Activate Visualforce Component CompletionItemProvider
    vscode.languages.registerCompletionItemProvider(apexDocumentFilter, new VisualforceCompletionItemProvider(), "<"),
    VisualforceComponentCacheInstance
  ]);
}
