import vscode = require('vscode');

import {Config} from './utils/config';
import {Connection} from './connection';
import {VisualforceComponentCacheInstance} from './symbols/visualforceComponentCache';
import {VisualforceCompletionItemProvider} from './providers/visualforceCompletionItemProvider';
import {SalesforceContentProvider} from './providers/salesforceContentProvider';
import {VisualforceDefinitionProvider} from './providers/visualforceDefinitionProvider';
import {VisualforceWorkspaceSymbolProvider} from './providers/visualforceWorkspaceSymbolProvider';

import {ApexSymbolCacheInstance} from './symbols/apexSymbolCache';
import {ApexCompletionItemProvider} from './providers/apexCompletionItemProvider';

import {ShowLogsCommand} from './commands/showLogsCommand';
import {ShowDiffCommand} from './commands/showDiffCommand';
import {RetrieveCommand} from './commands/retrieveCommand';
import {DeployPackageCommand} from './commands/deployPackageCommand';
import {SOQLCommand} from './commands/soqlCommand';
import {PushFileToSalesforceCommand} from './commands/pushFileToSalesforceCommand';

import {StatusBarUtil} from './utils/statusBarUtil';

const visualforceDocumentFilter: vscode.DocumentFilter = { language: 'visualforce' };
const apexDocumentFilter: vscode.DocumentFilter = { language: 'apex' };

export function activate(context: vscode.ExtensionContext) {
    let statusBarUtil = StatusBarUtil.init('[vsforce]');
    let showLogsCommand = new ShowLogsCommand();
    let showDiffCommand = new ShowDiffCommand();
    let pushFileToSalesforceCommand = new PushFileToSalesforceCommand();
    let retrieveCommand = new RetrieveCommand();
    let deployPackageCommand = new DeployPackageCommand();
    let soqlCommand = new SOQLCommand();

    Config.getInstance().on("change", () => {
        Connection.initConn();
    });

    context.subscriptions.concat([
        statusBarUtil,
        vscode.languages.registerCompletionItemProvider(visualforceDocumentFilter, new VisualforceCompletionItemProvider(), '<'),
        vscode.languages.registerCompletionItemProvider(apexDocumentFilter, new ApexCompletionItemProvider()),
        vscode.languages.registerDefinitionProvider(visualforceDocumentFilter, new VisualforceDefinitionProvider()),
        vscode.workspace.registerTextDocumentContentProvider('sf', new SalesforceContentProvider()),
        vscode.languages.registerWorkspaceSymbolProvider(new VisualforceWorkspaceSymbolProvider()),

        vscode.commands.registerCommand('vsforce.retrieveCommand', () => retrieveCommand.Execute()),
        vscode.commands.registerCommand('vsforce.deployPackageCommand', () => deployPackageCommand.Execute()),
        vscode.commands.registerCommand('vsforce.showLogs', () => showLogsCommand.Execute()),
        vscode.commands.registerCommand('vsforce.diff', (uri) => showDiffCommand.Execute(uri)),
        vscode.commands.registerCommand('vsforce.executeSOQLQuery', () => soqlCommand.Execute()),

        VisualforceComponentCacheInstance,
        ApexSymbolCacheInstance
    ]);
}
