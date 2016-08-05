import vscode = require('vscode');
import fs = require('fs');

import {ApexObject} from './apexObject';

var antlr4 = require('antlr4/index');
var ApexLexer = require('../antrl4/ApexLexer.js').ApexLexer;
var ApexParser = require('../antrl4/ApexParser.js').ApexParser;

declare var ClassDeclaration: any;

/**
 * Apex Object Tree Cache class.
 *
 * TODO: finish this
 */
export class ApexObjectTreeCache {
  private cache: { [name: string]: ApexObject } = {};
  //private fetchers: VisualforceComponentFetcher[] = [];
  private diag: vscode.Diagnostic[];
  private ds = vscode.languages.createDiagnosticCollection('apex');
  private file: string;
  private uri: vscode.Uri;
  
  /**
   * Creates an Apex Object Tree Cache 
   */
  constructor() {
    this.diag = [];

    vscode.workspace.onDidChangeTextDocument((e) => {
      this.uri = e.document.uri;
      this.ds.delete(this.uri);
      this.diag = [];
      console.log("===============================")
      this.handleParseFile(null, e.document.getText());
    })
  }

  /**
   * Parses the workspace files
   * 
   * @param {NodeJS.ErrnoException} err error
   * @param {string} data workspace files
   */
  private handleParseFile(err: NodeJS.ErrnoException, data: string) {
    var chars = new antlr4.InputStream(data);
    var lexer = new ApexLexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new ApexParser(tokens);
    parser.buildParseTrees = true;
    parser.removeErrorListeners();
    parser.addErrorListener(this);
    var tree = parser.compilationUnit();
    this.file = data;
    this.parseNode(tree);
    this.ds.set(this.uri, this.diag);
  }

  /**
   * TODO: give a description
   */
  public reportAttemptingFullContext() {

  }

  /**
   * TODO: give a description
   */
  public reportContextSensitivity() {

  }

  /**
   * TODO: give a description
   */
  public reportAmbiguity() {

  }

  /**
   * TODO: give a description
   * 
   * @param {}
   * @param {}
   * @param {}
   * @param {}
   * @param {}
   * @param {}
   */
  public syntaxError(a, b, c, d, e, f) {
    this.diag.push({
      message: e,
      range: new vscode.Range(c - 2, d, c, d),
      code: 1,
      severity: vscode.DiagnosticSeverity.Error,
      source: "vsforce"
    });
  }

  /**
   * TODO: give a description
   * 
   * @param {any} ctx context TODO: give a description
   */
  private parseNode(ctx: any) {
    if (ctx instanceof ApexParser.ClassDeclarationContext) {
      this.handleClassDeclarationContext(ctx);
      return;
    }
    if (ctx.children) {
      ctx.children.forEach(child => {
        this.parseNode(child);
      });
    }
  }

  /**
   * TODO: give a description
   * 
   * @param {any} ctx context
   */
  private handleClassDeclarationContext(ctx: any) {
    if (ctx.children && ctx.children.length == 3) {
      this.parseClassDeclarationContext(
        this.file.substr(
          ctx.children[1].symbol.start,
          ctx.children[1].symbol.stop - ctx.children[1].symbol.start + 1),
        ctx);
    }
  }

  /**
   * TODO: give a description
   * 
   * @param {string} className apex class
   * @param {any} ctx context
   */
  private parseClassDeclarationContext(className: string, ctx: any) {
    if (ctx instanceof ApexParser.ConstructorDeclarationContext) {
      this.parseConstructorDeclarationContext(className,
        this.file.substr(ctx.start.start,
          ctx.start.stop - ctx.start.start + 1),
        ctx);
    } else if (ctx instanceof ApexParser.MethodDeclarationContext) {
      this.parseConstructorDeclarationContext(className,
        this.file.substr(ctx.children[1].symbol.start,
          ctx.children[1].symbol.stop - ctx.children[1].symbol.start + 1),
        ctx);
    }
    else if (ctx.children) {
      ctx.children.forEach(child => {
        this.parseClassDeclarationContext(className, child);
      });
    }
  }

  /**
   * TODO: give a description
   * 
   * @param {string} className apex class
   * @param {string} constructorName class constructor
   * @param {any} ctx context
   */
  private parseConstructorDeclarationContext(className: string, constructorName: string, ctx: any) {
    if (ctx instanceof ApexParser.FormalParameterListContext) {
      ctx.children.forEach(child => {
        if (child instanceof ApexParser.FormalParameterContext) {
          this.parseFormalParameterListContext(className, constructorName, child);
        }
      });
    }
    else if (ctx.children) {
      ctx.children.forEach(child => {
        this.parseConstructorDeclarationContext(className, constructorName, child);
      });
    }
  }

  /**
   * TODO: give a description
   * 
   * @param {string} className apex class
   * @param {string} methodName apex class method
   * @param {any} ctx context
   */
  private parseFormalParameterListContext(className: string, methodName: string, ctx: any) {
    let type = this.file.substr(ctx.start.start,
      ctx.start.stop - ctx.start.start + 1);
    let name = this.file.substr(ctx.stop.start,
      ctx.stop.stop - ctx.stop.start + 1);
    console.log(`${className} has method ${methodName} with param ${name} of type ${type}`);
  }
}
