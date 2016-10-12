import * as vscode from 'vscode';
import {Connection} from './../connection';

export class Config {
  public static loginUrl: string;
  public static username: string;
  public static password: string;
  public static securityToken: string;

  public static isValid: boolean;

  public static init() {
    Config.setConfig();

    vscode.workspace.onDidChangeConfiguration(() => {
      Config.updateConfig();
    });
  }

  public static setConfig() {
    if (Config.validateConfig()) {
      var config = vscode.workspace.getConfiguration("vsforce.organization");

      Config.loginUrl = config.get<string>('loginUrl');
      Config.username = config.get<string>('username');
      Config.password = config.get<string>('password');
      Config.securityToken = config.get<string>('securityToken');

      Config.isValid = true;
    } else {
      Config.isValid = false;
    }
  }

  public static updateConfig() {
    Config.setConfig();

    if (Config.isValid) {
      Connection.initConn();
    }
  }

  private static validateConfig() {
    var config = vscode.workspace.getConfiguration("vsforce.organization");

    return config.get<string>('loginUrl').length != 0 &&
      config.get<string>('username').length != 0 &&
      config.get<string>('password').length != 0 &&
      config.get<string>('securityToken').length != 0;
  }
}
