import vscode = require('vscode');
import {VisualforceCompletionItemProvider} from './providers/visualforceComponentCIP'

const apexDocumentFilter: vscode.DocumentFilter = { language: 'visualforce' };

export function activate(context: vscode.ExtensionContext) {

  // Activate Visualforce Component CompletionItemProvider
  vscode.languages.registerCompletionItemProvider(apexDocumentFilter, new VisualforceCompletionItemProvider(), "<");
}
