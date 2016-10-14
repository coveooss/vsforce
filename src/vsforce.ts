import {Config} from './utils/Config'
Config.init();

import vscode = require('vscode');
import {ApexObjectTreeCache} from './symbols/apexObjectTreeCache';
import {VisualforceComponentCacheInstance} from './symbols/visualforceComponentCache';
import {VisualforceCompletionItemProvider} from './providers/visualforceCompletionItemProvider';
import {SalesforceContentProvider} from './providers/salesforceContentProvider';
import {VisualforceDefinitionProvider} from './providers/visualforceDefinitionProvider';
import {VisualforceWorkspaceSymbolProvider} from './providers/visualforceWorkspaceSymbolProvider';

import {ShowLogsCommand} from './commands/showLogsCommand';
import {ShowDiffCommand} from './commands/showDiffCommand';
import {RetrieveCommand} from './commands/retrieveCommand';
import {DeploypackageCommand} from './commands/deploypackageCommand';
import {SOQLCommand} from './commands/soqlCommand';

import {StatusBarUtil} from './utils/statusBarUtil'

const visualforceDocumentFilter: vscode.DocumentFilter = { language: 'visualforce' };

export function activate(context: vscode.ExtensionContext) {
  let statusBarUtil = StatusBarUtil.init("[vsforce]");
  let showLogsCommand = new ShowLogsCommand();
  let showDiffCommand = new ShowDiffCommand();
  let retrieveCommand = new RetrieveCommand();
  let deploypackageCommand = new DeploypackageCommand();
  let soqlCommand = new SOQLCommand();

  context.subscriptions.concat([
    statusBarUtil,
    vscode.languages.registerCompletionItemProvider(visualforceDocumentFilter, new VisualforceCompletionItemProvider(), '<'),
    vscode.languages.registerDefinitionProvider(visualforceDocumentFilter, new VisualforceDefinitionProvider()),
    vscode.workspace.registerTextDocumentContentProvider('sf', new SalesforceContentProvider()),
    vscode.languages.registerWorkspaceSymbolProvider(new VisualforceWorkspaceSymbolProvider()),

    vscode.commands.registerCommand('vsforce.retrieveCommand', () => retrieveCommand.Execute()),
    vscode.commands.registerCommand('vsforce.deploypackageCommand', () => deploypackageCommand.Execute()),
    vscode.commands.registerCommand('vsforce.showLogs', () => showLogsCommand.Execute()),
    vscode.commands.registerCommand('vsforce.diff', (uri) => showDiffCommand.Execute(uri)),
    vscode.commands.registerCommand('vsforce.executeSOQLQuery', () => soqlCommand.Execute()),

    VisualforceComponentCacheInstance
  ]);
}
