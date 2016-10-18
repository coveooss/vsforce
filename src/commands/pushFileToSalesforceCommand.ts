
import vscode = require('vscode');
import fs = require('fs');

import {ICommand}  from './command';
import {Config} from '../utils/Config';
import {StatusBarUtil} from '../utils/statusBarUtil'
import {getSalesforceMetadata, getFileNameFromPath, getSalesforceTypeFromFileName, getNamespaceOrNull} from '../utils/Utils';
import {Connection, IQueryResult} from '../connection';

export class PushFileToSalesforceCommand implements ICommand {
  private conn: Connection = new Connection();
  private listener: vscode.Disposable;

  constructor() {
    var setup = () => {
      if (Config.instance.pushOnSave) {
        this.listener = vscode.workspace.onDidSaveTextDocument(this.pushToSalesforce, this);
      }
    }

    setup();
  }

  public Execute() {
    //this.pushToSalesforce(null);
  }

  public dispose() {
    this.listener.dispose();
  }

  private pushToSalesforce(e: vscode.TextDocument) {
    getSalesforceMetadata(e.fileName + "-meta.xml").then((metadata) => {
      fs.readFile(e.fileName, "UTF8", (err, markup) => {
        var fileName = getFileNameFromPath(e.fileName);
        var type = getSalesforceTypeFromFileName(fileName);

        this.getMetadataPackageId(type, fileName.split('.')[0]).then((id) => {
          switch (type) {
            case "ApexComponent":
              // this.pushApexComponent(id, filename, markup, metadata);
              break;
            case "ApexClass":
              this.buildApexClass(id, fileName, markup, metadata);
              break;
          }
        });
      });
    });
  }

  private buildApexClass(id: string, fileName: string, body: string, metadata: any) {
    var name = fileName.split('.')[0];
    Connection.getConn().then((conn) => {
      var apexClassMetadata = metadata.ApexClass;
      delete apexClassMetadata['$'];

      conn.createObject("ApexClassMember", {
        Body: body,
        FullName: name,
        MetadataContainerId: id
      }).then((res) => console.log(res), (err) => console.log(err));
    });
  }

  private getMetadataPackageId(objectType: string, fileName: string): Thenable<string> {
    return new Promise((resolve, reject) => {
      Connection.getConn().then((conn) => {
        conn.find("MetadataContainer", { Name: objectType + fileName }).then((records) => {
          if (records.length == 0) {
            conn.createObject("MetadataContainer", {
              Name: objectType + fileName
            }).then((res) => {
              resolve(res.id);
            })
          } else {
            resolve(records[0].Id);
          }
        });
      });
    });
  }

  private pushApexComponent(fileName: string, markup: string, metadata: any) {

  }
}
