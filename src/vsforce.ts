import vscode = require('vscode');
import {VisualforceCompletionItemProvider} from './visualforceCompletionItemProvider'

const apexDocumentFilter: vscode.DocumentFilter = { language: 'visualforce' };

export function activate(context: vscode.ExtensionContext) {

  // Activate Visualforce CompletionItemProvider
  vscode.languages.registerCompletionItemProvider(apexDocumentFilter, new VisualforceCompletionItemProvider(), "<", " ");
}
