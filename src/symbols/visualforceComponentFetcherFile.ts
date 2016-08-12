import vscode = require('vscode');
import * as utils from '../utils';
import fs = require('fs');
import html = require('htmlparser2');
import {VisualforceComponentCache} from './visualforceComponentCache';
import {IVisualforceComponentFetcher} from './visualforceComponentFetcher';
// import {VisualforceComponentCacheInstance} from './visualforceComponentCache';

/**
 * Visualforce Component Fetcher File class.
 *
 * TODO: finish this
 */
export class VisualforceComponentFetcherFile implements IVisualforceComponentFetcher, vscode.Disposable {
  // TODO: give a description
  public canOverwrite: boolean = true;
  // TODO: give a description
  private disposable: vscode.Disposable[] = [];

  /**
   * Creates a Visualforce Component Fetcher File
   */
  constructor(private cache: VisualforceComponentCache) {
    let fileWatcher = vscode.workspace.createFileSystemWatcher('**/*.component');
    this.disposable.push(fileWatcher.onDidChange((uri: vscode.Uri) => this.handleFileChange(uri)));
    this.disposable.push(fileWatcher.onDidCreate((uri: vscode.Uri) => this.handleFileChange(uri)));

    this.disposable.push(fileWatcher.onDidDelete((uri: vscode.Uri) => this.handleFileDelete(uri)));
    this.disposable.push(fileWatcher);
  }

  /**
   * TODO: give a description
   *
   * @param {vscode.Uri} uri file uri
   */
  private handleFileChange(uri: vscode.Uri) {
    this.createComponentFromUri(uri).then((c => this.cache.updateComponent(c)));
  }

  /**
   * TODO: give a description
   *
   * @param {vscode.Uri} uri file uri
   */
  private handleFileDelete(uri: vscode.Uri) {
    this.cache.removeComponent(this.getComponentNameByUri(uri));
  }

  /**
   * TODO: give a description
   *
   * @param {vscode.Uri} uri file uri
   *
   * @return {Thenable<IVisualforceComponent>} TODO: give a description
   */
  private createComponentFromUri(uri: vscode.Uri): Thenable<IVisualforceComponent> {
    return new Promise<IVisualforceComponent>((resolve, reject) => {

      let attributes: IVisualforceComponentAttribute[] = [];
      let parser: html.Parser = new html.Parser({
        onopentag: (name, attribs) => {
          if (name == 'apex:attribute') {
            attributes.push({
              name: attribs['name'],
              type: attribs['type'],
              description: attribs['description']
            });
          }
        },
        onend: () => {
          resolve({
            name: this.getComponentNameByUri(uri),
            attributes: attributes,
            uri: uri.toString()
          });
        }
      });

      fs.readFile(uri.fsPath, 'utf8', (err, data) => {
        parser.write(data);
        parser.end();
      });
    });
  }

  /**
   * TODO: give a description
   *
   * @param {vscode.Uri} uri file name
   */
  private getComponentNameByUri(uri: vscode.Uri) {
    return `c:${utils.getFileNameFromUri(uri).split('.')[0]}`;
  }

  /**
   * TODO: give a description
   */
  public dispose() {
    this.disposable.forEach(d => d.dispose());
  }

  /**
   * TODO: give a description
   *
   * @return {Thenable<IVisualforceComponent[]>} TODO: give a description
   */
  public fetchAll(): Thenable<IVisualforceComponent[]> {
    return new Promise<IVisualforceComponent[]>((resolve, reject) => {
      vscode.workspace.findFiles('**/*.component', '').then(uris => {
        let components: Thenable<IVisualforceComponent>[] = [];
        uris.forEach(uri => {
          components.push(this.createComponentFromUri(uri));
        });

        Promise.all<IVisualforceComponent>(components).then((components) => {
          resolve(components);
        });
      });
    });
  }
}
