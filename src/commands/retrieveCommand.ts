import vscode = require('vscode');

import {Command} from './command'
import {Connection, QueryResult} from './../connection'

var utils = require('../utils');

export class RetrieveCommand implements Command {
    private conn: Connection = new Connection();

    constructor() {
        var _this = this;
    }

    public Command() {
        utils.findPackageXml().then(val => {
            this.conn.retrievePackage(val);
        });
    }

}