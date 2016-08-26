let jsforce = require('jsforce');

import * as vscode from 'vscode';
import * as xml2js from 'xml2js';
import * as fs from 'fs';
import * as utils from './utils';

let stream = require('readable-stream');
let unzip = require('unzip');

/**
 * Query Result interface.
 * TODO: needs a description
 */
export interface IQueryResult {
  totalSize: number;
  records: any[];
}

/**
 * Connection class.
 *
 * TODO: finish this
 */
export class Connection {
  // Singleton
  private static instance: Connection;
  // TODO: give a description
  private jsforceConn: any;
  // TODO: give a description
  private RETRIEVE_OPTIONS = ['apiVersion', 'packageNames', 'singlePackage', 'specificFiles', 'unpackaged'];
  // TOOD: give a description
  private userId: string;
  // TODO: give a description
  private orgId: string;

  /**
   * Creates a Connection
   */
  constructor() { }

  /**
   * TODO: give a description
   *
   * @param {string} id TODO: give a description
   *
   * @return {Thenable<string>} TODO: give a description
   */
  public getLogBody(id: string): Thenable<string> {
    return new Promise<string>((resolve, reject) => {
      Connection.getConn().then((conn: Connection) => {
        conn.jsforceConn.tooling.request(
          `${conn.jsforceConn.tooling._baseUrl()}/sobjects/ApexLog/${id}/Body`,
          (err, result) => {
            if (err) {
              vscode.window.showErrorMessage(err.message);
              reject(err.message);
            } else {
              resolve(result);
            }
          }
        );
      });
    });
  }

  /**
   * TODO: give a description
   */
  public createUserTraceFlag() {
    this.createUpdateDebugLevel().then((debugLevelId: string) => {
      Connection.getConn().then((conn: Connection) => {
        conn.jsforceConn.tooling.sobject('TraceFlag').find({
          TracedEntityId: conn.userId
        }).execute((err, records) => {
          return records;
        }).then((records: any) => {
          if (records.length == 0) {
            conn.jsforceConn.tooling.sobject('TraceFlag').create({
              ApexCode: 'DEBUG',
              ApexProfiling: 'DEBUG',
              Callout: 'DEBUG',
              Database: 'DEBUG',
              DebugLevelId: debugLevelId,
              ExpirationDate: new Date().setHours(new Date().getHours() + 6),
              LogType: 'DEVELOPER_LOG',
              System: 'DEBUG',
              TracedEntityId: conn.userId,
              Validation: 'DEBUG',
              Visualforce: 'DEBUG',
              Workflow: 'DEBUG'
            }, function (err, res) {
              if (err) {
                vscode.window.showErrorMessage('An error occured while adding the User Trace Flag.');
              }
            });
          }
        });
      });
    });
  }

  /**
   * TODO: give a description
   *
   * @return {Thenable<string>} TODO: give a description
   */
  private createUpdateDebugLevel(): Thenable<string> {
    return new Promise<string>((resolve, reject) => {
      Connection.getConn().then((conn: Connection) => {
        conn.jsforceConn.tooling.sobject('DebugLevel').find({
          DeveloperName: 'vsforce_LogDebug'
        }).execute((err, records) => {
          return records;
        }).then((records: any) => {
          if (records.length == 1) {
            resolve(records[0].Id);
          } else {
            conn.jsforceConn.tooling.sobject('DebugLevel').create({
              ApexCode: 'DEBUG',
              ApexProfiling: 'DEBUG',
              Callout: 'DEBUG',
              Database: 'DEBUG',
              DeveloperName: 'vsforce_LogDebug',
              MasterLabel: '[vsforce] Log Debug Level',
              System: 'DEBUG',
              Validation: 'DEBUG',
              Visualforce: 'DEBUG',
              Workflow: 'DEBUG'
            }, function (err, res) {
              if (err) {
                reject(err.message);
              } else {
                resolve(res.id);
              }
            });
          }
        });
      });
    });
  }

  /**
   * Execute a SOQL query and return the results to a callback function if no error.
   *
   * @param {string} query SOQL query
   *
   * @return {Thenable<IQueryResult>} SOQL query results
   */
  public executeQuery(query: string): Thenable<IQueryResult> {
    return new Promise<IQueryResult>((resolve, reject) => {
      Connection.getConn().then((conn: Connection) => {
        conn.jsforceConn.query(query, function (err, res) {
          if (err) {
            vscode.window.showErrorMessage(err);
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    });
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
  /**
   * TODO: give a description
   *
   * @return {Thenable<Connection>} Salesforce connection success
   */
  public static getConn(): Thenable<Connection> {
    return new Promise<Connection>((resolve, reject) => {
      if (Connection.instance != undefined) {
        resolve(Connection.instance);
      } else {
        this.initConn().then((conn: Connection) => {
          vscode.window.showInformationMessage(`Logged in to Salesforce as ${utils.getUsernameFromConfig()}`);
          Connection.instance = conn;

          resolve(conn);

        }, (reason: string) => {
          vscode.window.showErrorMessage(reason);
        });
      }
    });
  }

  /**
   * TODO: give a description
   *
   * @return {Thenable<Connection>} TODO: give a description
   */
  private static initConn(): Thenable<Connection> {
    return new Promise<Connection>((resolve, reject) => {
      var conn = new Connection();

      if (Connection.validateConfig()) {
        conn.jsforceConn = new jsforce.Connection({
          loginUrl: utils.getLoginUrlFromConfig()
        });

        conn.jsforceConn.login(
          utils.getUsernameFromConfig(),
          utils.getPasswordFromConfig() + utils.getSecurityTokenFromConfig(),
          function (err, res) {
            if (err) {
              reject(err.message);
            } else {
              conn.orgId = res.organizationId;
              conn.userId = res.id;

              resolve(conn);
            }
          }
        );
      } else {
        reject('Invalid vsforce config detected, please refer to https://github.com/coveo/vsforce to get a working example');
      }
    });
  }

  /**
   * TODO: give a description
   *
   * @param {vscode.WorkspaceConfiguration} config workspace configuration
   *
   * @return {TODO: give a description} TODO: give a description
   */
  private static validateConfig() {
    return utils.getLoginUrlFromConfig() &&
      utils.getUsernameFromConfig() &&
      utils.getPasswordFromConfig() &&
      utils.getSecurityTokenFromConfig();
  }

  /**
   * TODO: give a description
   *
   * @param {any} content zip file content
   * @param {string} target folder to extract into
   *
   * @return {Promize<any>} TODO: give a description
   */
  private extractZip(content: any, target: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let zipStream = new stream.PassThrough();
      zipStream.end(new Buffer(content, 'base64'));
      zipStream.pipe(unzip.Extract({ path: target }));
      // zipStream.pipe(unzip.Parse())
      //   .on('entry', (entry) => {
      //     let filePaths = entry.path;
      //     let type = entry.type;
      //     entry.pipe(fs.createWriteStream(target));
      //   })
      resolve('test');
    });
  }

  /**
   * Send a retrieve request to salesforce, with options included.
   *
   * @param {any} options The retrieve options : https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_retrieve_request.htm
   *
   * @return {Thenable<any>} Resolves when the requests complete.
   */
  public retrievePackage(options: any): Thenable<any> {
    return new Promise<any>((resolve, reject) => {
      Connection.getConn().then((conn: Connection) => {
        conn.jsforceConn.metadata.timeout = 60 * 1000;
        conn.jsforceConn.metadata.pollInterval = 5 * 1000;

        let req: any = {};
        this.RETRIEVE_OPTIONS.forEach((prop) => {
          if (typeof options[prop] !== 'undefined') { req[prop] = options[prop]; }
        });
        if (!req.apiVersion) {
          req.apiVersion = conn.jsforceConn.version;
        }

        conn.jsforceConn.metadata.retrieve(req).complete({ details: true })
          .then((resp) => {
            resolve(resp);
          }, (reason: any) => {
            reject(reason);
          });
      }, (reason: any) => {
        reject(reason);
      });
    });
  }
}
