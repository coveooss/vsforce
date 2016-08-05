import vscode = require('vscode');
import * as utils from '../utils';
import fs = require('fs');
import html = require('htmlparser2');
import {VisualforceComponentCache} from './visualforceComponentCache';
import {VisualforceComponentFetcher} from './visualforceComponentFetcher';
import {VisualforceComponentCacheInstance} from './visualforceComponentCache';

/**
 * Visualforce Component Fetcher File class.
 *
 * TODO: finish this
 */
export class VisualforceComponentFetcherFile implements VisualforceComponentFetcher, vscode.Disposable {
  //TODO: give a description
  public canOverwrite: boolean = true;
  //TODO: give a description
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
   * @return {Thenable<VisualforceComponent>} TODO: give a description
   */
  private createComponentFromUri(uri: vscode.Uri): Thenable<VisualforceComponent> {
    return new Promise<VisualforceComponent>((resolve, reject) => {

      let attributes: VisualforceComponentAttribute[] = [];
      let parser: html.Parser = new html.Parser({
        onopentag: (name, attribs) => {
          if (name == 'apex:attribute') {
            attributes.push({
              name: attribs['name'],
              type: attribs['type'],
              description: attribs['description']
            })
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
   * @return {Thenable<VisualforceComponent[]>} TODO: give a description
   */
  public fetchAll(): Thenable<VisualforceComponent[]> {
    return new Promise<VisualforceComponent[]>((resolve, reject) => {
      vscode.workspace.findFiles('**/*.component', '').then(uris => {
        let components: Thenable<VisualforceComponent>[] = [];
        uris.forEach(uri => {
          components.push(this.createComponentFromUri(uri));
        });

        Promise.all<VisualforceComponent>(components).then((components) => {
          resolve(components);
        });
      });
    });
  }
}
