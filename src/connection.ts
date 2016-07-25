let jsforce = require('jsforce');

import * as vscode from 'vscode';
import * as xml2js from 'xml2js';
import * as fs from 'fs';

export interface QueryResult {
  totalSize: number,
  records: any[]
}

export class Connection {
  private static instance: Connection;
  private config: vscode.WorkspaceConfiguration;
  private jsforceConn: any;

  constructor() { }

  public getLogBody(id: string): Thenable<string> {
    return new Promise<string>((resolve, reject) => {
      Connection.getConn().then((conn: Connection) => {
        conn.jsforceConn.tooling.request(
          conn.jsforceConn.tooling._baseUrl() + "/sobjects/ApexLog/" + id + "/Body",
          (err, result) => {
            if (err) {
              vscode.window.showErrorMessage(err.message);
              reject(err.message);
            } else {
              resolve(result)
            }
          })
      })
    })
  }

  // Execute a SOQL query and return the results to a callback function if no error.
  public executeQuery(query: string): Thenable<QueryResult> {
    return new Promise<QueryResult>((resolve, reject) => {
      Connection.getConn().then((conn: Connection) => {
        conn.jsforceConn.query(query, function (err, res) {
          if (err) {
            vscode.window.showErrorMessage(err);
            reject(err);
          } else {
            resolve(res);
          }
        });
      })
    })
  }

  // Execute APEX code
  /*
  public executeCode(code: string) {
    var _this = this;

    this.execute((conn: any) => {
      conn.tooling.executeAnonymous(code, function (err, res) {
        _this.outputConsole.show();
        if (err) { return _this.outputConsole.appendLine(err); }
        if (res.success) {
          _this.outputConsole.appendLine('You\'re a rockstar !');
        } else {
          _this.outputConsole.appendLine('Line: ' + res.line);
          _this.outputConsole.appendLine(res.compileProblem);
        }
      });
    });
  }
*/
  public static getConn(): Thenable<Connection> {
    return new Promise<Connection>((resolve, reject) => {
      if (Connection.instance != undefined) {
        resolve(Connection.instance);
      } else {
        this.initConn().then((conn: Connection) => {
          vscode.window.showInformationMessage("Logged in to Salesforce as " + conn.config.get<string>('username'));
          Connection.instance = conn;

          resolve(conn);

        }, (reason: string) => {
          vscode.window.showErrorMessage(reason);
        });
      }
    })
  }

  private static initConn(): Thenable<Connection> {
    return new Promise<Connection>((resolve, reject) => {
      var conn = new Connection();
      conn.config = vscode.workspace.getConfiguration('vsforce.organisation');

      if (Connection.validateConfig(conn.config)) {
        conn.jsforceConn = new jsforce.Connection({
          loginUrl: conn.config.get<string>('loginUrl')
        });

        conn.jsforceConn.login(
          conn.config.get<string>('username'),
          conn.config.get<string>('password') + conn.config.get<string>('securityToken'),
          function (err, res) {
            if (err) {
              reject(err.message);
            } else {
              resolve(conn);
            }
          }
        );
      } else {
        reject("Invalid vsforce config detected, please refer to https://github.com/coveo/vsforce to get a working example");
      }
    })
  }

  private static validateConfig(config: vscode.WorkspaceConfiguration) {
    return config.get<string>('loginUrl') &&
      config.get<string>('username') &&
      config.get<string>('password') &&
      config.get<string>('securityToken')
  }

  /*
    public retrive() {
      var _this = this;

      fs.readFile(vscode.workspace.rootPath + '\\apex\\code\\package.xml', (err: NodeJS.ErrnoException, data: Buffer) => {
        xml2js.parseString(data.toString(), (err: any, results: any) => {
          _this.execute((jsforce: any) => {
            console.log(jsforce.metadata.retrieve({ unpackaged: JSON.stringify(results.Package) }).stream().pipe());
            // .pipe(fs.createWriteStream('MyPackage.zip'))
          });
        });
      });
    }*/
}
