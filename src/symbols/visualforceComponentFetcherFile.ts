import vscode = require('vscode');
import * as utils from '../utils';
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
    this.cache.updateComponent(this.createComponentFromUri(uri));
  }

  private handleFileDelete(uri: vscode.Uri) {
    this.cache.removeComponent(this.getComponentNameByUri(uri));
  }

  private createComponentFromUri(uri: vscode.Uri): VisualforceComponent {
    return {
      name: this.getComponentNameByUri(uri),
      attributes: [],
      file: uri.path
    };
  }

  private getComponentNameByUri(uri: vscode.Uri) {
    return "c:" + utils.getFileNameFromUri(uri).split('.')[0];
  }

  public dispose() {
    this.disposable.forEach(d => d.dispose());
  }

  public fetchAll(): Thenable<VisualforceComponent[]> {
    return new Promise<VisualforceComponent[]>((resolve, reject) => {
      var componentList: VisualforceComponent[] = [];
      vscode.workspace.findFiles("**/*.component", "").then(uris => {
        uris.forEach(uri => {
          componentList.push(this.createComponentFromUri(uri));
        });

        resolve(componentList);
      });
    });
  }
}
