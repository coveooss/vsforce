import vscode = require('vscode');

export interface Command {
  Command(context?: vscode.Uri);
}
