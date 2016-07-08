import vscode = require('vscode');
import {VisualforceComponentFetcher} from './visualforceComponentFetcher'
import {VisualforceComponentFetcherBase} from './visualforceComponentFetcherBase'
import {VisualforceComponentFetcherFile} from './visualforceComponentFetcherFile'
import {VisualforceComponentFetcherSalesforce} from './visualforceComponentFetcherSalesforce'

export class VisualforceComponentCache implements vscode.Disposable {
  private cache: { [name: string]: VisualforceComponent } = {};
  private fetchers: VisualforceComponentFetcher[] = [];

  constructor() {
    this.fetchers.push(new VisualforceComponentFetcherBase());
    this.fetchers.push(new VisualforceComponentFetcherFile(this));
    this.fetchers.push(new VisualforceComponentFetcherSalesforce());

    this.fetchers.forEach((f) => {
      f.fetchAll().then((components) => {
        components.forEach(component => {
          if (this.getComponent(component.name) == null ||
            (this.getComponent(component.name) != null && f.canOverwrite)) {
            this.cache[component.name] = component;
          }
        });
      });
    })
  }

  public getComponent(name: string): VisualforceComponent {
    return this.cache[name];
  }

  public getComponents(): VisualforceComponent[] {
    return Object.keys(this.cache).map(name => this.cache[name]);
  }

  public getComponentNames(): string[] {
    return Object.keys(this.cache);
  }

  public updateComponent(component: VisualforceComponent) {
    this.cache[component.name] = component;
  }

  public removeComponent(name: string) {
    this.cache[name] = null;
  }

  public dispose() {
    this.fetchers.forEach(d => d.dispose());
  }
}

export var VisualforceComponentCacheInstance = new VisualforceComponentCache();
