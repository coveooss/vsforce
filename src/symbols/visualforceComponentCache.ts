import vscode = require('vscode');
import {IVisualforceComponentFetcher} from './visualforceComponentFetcher';
import {VisualforceComponentFetcherBase} from './visualforceComponentFetcherBase';
import {VisualforceComponentFetcherFile} from './visualforceComponentFetcherFile';
import {VisualforceComponentFetcherSalesforce} from './visualforceComponentFetcherSalesforce';

/**
 * Visualforce Component Cache class.
 *
 * TODO: finish this
 */
export class VisualforceComponentCache implements vscode.Disposable {
  private cache: { [name: string]: IVisualforceComponent } = {};
  private fetchers: IVisualforceComponentFetcher[] = [];

  /**
   * Creates a Visualforce Component Cache
   */
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
    });
  }

  /**
   * Get a component
   *
   * @{string} name component name
   *
   * @return {IVisualforceComponent} visualforce component
   */
  public getComponent(name: string): IVisualforceComponent {
    return this.cache[name];
  }

  /**
   * Get a list of component
   *
   * @return {IVisualforceComponent[]} a list of components
   */
  public getComponents(): IVisualforceComponent[] {
    return Object.keys(this.cache).map(name => this.cache[name]);
  }

  /**
   * Get a list of component name
   *
   * @return {string[]} a list of components name
   */
  public getComponentNames(): string[] {
    return Object.keys(this.cache);
  }

  /**
   * Updates a component
   *
   * @param {VisualforceComponent} component a component
   */
  public updateComponent(component: IVisualforceComponent) {
    this.cache[component.name] = component;
  }

  /**
   * Removes a component
   *
   * @param {string} name component name
   */
  public removeComponent(name: string) {
    this.cache[name] = null;
  }

  /**
   * TODO: give a description
   */
  public dispose() {
    this.fetchers.forEach(d => d.dispose());
  }
}

export var VisualforceComponentCacheInstance = new VisualforceComponentCache();
