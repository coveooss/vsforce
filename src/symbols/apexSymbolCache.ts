import vscode = require('vscode');
import {IApexSymbol} from './apexSymbol';
import {IApexSymbolFetcher} from './apexSymbolFetcher';
import {ApexSymbolFetcherFile} from './apexSymbolFetcherFile';
import {ApexSymbolFetcherBase} from './apexSymbolFetcherBase';
import {StatusBarUtil} from './../utils/statusBarUtil';

export class ApexSymbolCache implements vscode.Disposable {
    private cache: { [name: string]: IApexSymbol } = {};
    private fetchers: IApexSymbolFetcher[] = [];

    constructor() {
        this.fetchers.push(new ApexSymbolFetcherBase());
        this.fetchers.push(new ApexSymbolFetcherFile(this));

        var promises: Thenable<IApexSymbol[]>[] = [];
        this.fetchers.forEach((f) => {
            promises.push(f.fetchAll());
        });

        var done = Promise.all(promises);
        done.then(symbolsPromises => {
            symbolsPromises.forEach((symbols) => {
                symbols.forEach(s => {
                    if (this.getSymbol(s.name) == null ||
                        (this.getSymbol(s.name) != null)) {
                        this.cache[s.name] = s;
                    }
                })
            });
        });

        StatusBarUtil.setLoading("Caching APEX symbols", done);
    }

    public getSymbols(): IApexSymbol[] {
        return Object.keys(this.cache).map(name => this.cache[name]);
    }

    public getSymbol(name: string): IApexSymbol {
        return this.cache[name];
    }

    public dispose() {
        this.fetchers.forEach(d => d.dispose());
    }
}

export var ApexSymbolCacheInstance = new ApexSymbolCache();
