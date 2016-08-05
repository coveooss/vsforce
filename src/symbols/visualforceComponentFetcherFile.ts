import vscode = require('vscode');
import * as utils from '../utils';
import fs = require('fs');
import html = require('htmlparser2');
import {VisualforceComponentCache} from './visualforceComponentCache'
import {VisualforceComponentFetcher} from './visualforceComponentFetcher'
import {VisualforceComponentCacheInstance} from './visualforceComponentCache'

export class VisualforceComponentFetcherFile implements VisualforceComponentFetcher, vscode.Disposable {
  public canOverwrite: boolean = true;
  private disposable: vscode.Disposable[] = [];

  constructor(private cache: VisualforceComponentCache) {
    var fileWatcher = vscode.workspace.createFileSystemWatcher("**/*.component");
    this.disposable.push(fileWatcher.onDidChange((uri: vscode.Uri) => this.handleFileChange(uri)));
    this.disposable.push(fileWatcher.onDidCreate((uri: vscode.Uri) => this.handleFileChange(uri)));

    this.disposable.push(fileWatcher.onDidDelete((uri: vscode.Uri) => this.handleFileDelete(uri)));
    this.disposable.push(fileWatcher);
  }

  private handleFileChange(uri: vscode.Uri) {
    this.createComponentFromUri(uri).then((c => this.cache.updateComponent(c)));
  }

  private handleFileDelete(uri: vscode.Uri) {
    this.cache.removeComponent(this.getComponentNameByUri(uri));
  }

  private createComponentFromUri(uri: vscode.Uri): Thenable<VisualforceComponent> {
    return new Promise<VisualforceComponent>((resolve, reject) => {

      var attributes: VisualforceComponentAttribute[] = [];
      var parser: html.Parser = new html.Parser({
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

      var file = fs.readFile(uri.fsPath, 'utf8', (err, data) => {
        parser.write(data);
        parser.end();
      });

    });
  }

  private getComponentNameByUri(uri: vscode.Uri) {
    return `c:${utils.getFileNameFromUri(uri).split('.')[0]}`;
  }

  public dispose() {
    this.disposable.forEach(d => d.dispose());
  }

  public fetchAll(): Thenable<VisualforceComponent[]> {
    return new Promise<VisualforceComponent[]>((resolve, reject) => {
      vscode.workspace.findFiles('**/*.component', '').then(uris => {
        var components: Thenable<VisualforceComponent>[] = [];
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
