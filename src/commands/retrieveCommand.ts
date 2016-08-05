import vscode = require('vscode');

import {Command} from './command';
import {Connection, QueryResult} from './../connection';

var utils = require('../utils');

/**
 * Retrieve command class.
 *
 * Fetches Salesforce components defined in our package.xml
 */
export class RetrieveCommand implements Command {
  // Connection handle through Salesforce
  private conn: Connection = new Connection();

  /**
   * Creates a Retrieve command
   */
  constructor() {
    var _this = this;
  }

  /**
   * Implements command from {@link Command}
   *
   * Executes the command for this class
   */
  public Execute() {
    utils.findPackageXml().then(val => {
      this.conn.retrievePackage(val);
    });
  }
}
