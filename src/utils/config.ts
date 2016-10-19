import * as vscode from 'vscode';
import * as events from 'events';

export class Config extends events.EventEmitter {
  public static instance: Config = new Config();

  public loginUrl: string;
  public username: string;
  public password: string;
  public securityToken: string;
  public customNamespace: string;
  public pushOnSave: boolean;

  public isValid: boolean;

  constructor() {
    super();

    this.setConfig();

    vscode.workspace.onDidChangeConfiguration(() => {
      this.setConfig();
      this.emit('change');
    });
  }

  public setConfig() {
    if (Config.validateConfig()) {
      var organization = vscode.workspace.getConfiguration('vsforce.organization');
      var options = vscode.workspace.getConfiguration('vsforce.options');

      this.loginUrl = organization.get<string>('loginUrl');
      this.username = organization.get<string>('username');
      this.password = organization.get<string>('password');
      this.securityToken = organization.get<string>('securityToken');
      this.customNamespace = organization.get<string>('namespace');
      this.pushOnSave = options.get<boolean>('pushOnSave');

      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  private static validateConfig() {
    var config = vscode.workspace.getConfiguration('vsforce.organization');

    return config.get<string>('username') &&
      config.get<string>('password') &&
      config.get<string>('securityToken');
  }
}
