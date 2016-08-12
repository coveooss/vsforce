// import vscode = require('vscode');

import {ICommand} from './command';
import {Connection} from './../connection';

var utils = require('../utils');

/**
 * Retrieve command class.
 *
 * Fetches Salesforce components defined in our package.xml
 */
export class RetrieveCommand implements ICommand {
  // Connection handle through Salesforce
  private conn: Connection = new Connection();

  /**
   * Creates a Retrieve command
   */
  constructor() {

  }

  /**
   * Implements execute from {@link Command}
   *
   * Executes the command for this class
   */
  public Execute() {
    utils.findPackageXml().then(val => {
      this.conn.retrievePackage(val);
    });
  }
}
