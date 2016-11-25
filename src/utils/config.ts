import * as vscode from 'vscode';
import * as events from 'events';

export class Config extends events.EventEmitter {
  private static instance: Config;

  public loginUrl: string;
  public username: string;
  public password: string;
  public securityToken: string;
  public customNamespace: string;
  public pushOnSave: boolean;
  public rollbackOnError: boolean;

  public isValid: boolean;

  constructor() {
    super();

    if (Config.instance) {
      return Config.instance;
    }
    Config.instance = this;

    this.setConfig();

    vscode.workspace.onDidChangeConfiguration(() => {
      this.setConfig();
      this.emit('change');
    });
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    } 
    return Config.instance; 
  }

  private setConfig() {
    if (Config.validateConfig()) {
      var organization = vscode.workspace.getConfiguration('vsforce.organization');
      var options = vscode.workspace.getConfiguration('vsforce.options');

      Config.getInstance().loginUrl = organization.get<string>('loginUrl');
      Config.getInstance().username = organization.get<string>('username');
      Config.getInstance().password = organization.get<string>('password');
      Config.getInstance().securityToken = organization.get<string>('securityToken');
      Config.getInstance().customNamespace = organization.get<string>('namespace');
      Config.getInstance().pushOnSave = options.get<boolean>('pushOnSave');
      Config.getInstance().rollbackOnError = options.get<boolean>('rollbackOnError');

      Config.getInstance().isValid = true;
    } else {
      Config.getInstance().isValid = false;
    }
  }

  private static validateConfig():any {
    var config = vscode.workspace.getConfiguration('vsforce.organization');

    return (config.get<string>('username') &&
      config.get<string>('password'));
  }
}
