import vscode = require('vscode');
import {IApexSymbol} from './apexSymbol';

export interface IApexSymbolFetcher extends vscode.Disposable {
    fetchAll(): Thenable<IApexSymbol[]>;
    canOverwrite: boolean;
}
