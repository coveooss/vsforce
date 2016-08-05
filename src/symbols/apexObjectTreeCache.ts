import vscode = require('vscode')
import fs = require('fs')

import {ApexObject} from './apexObject'

var antlr4 = require('antlr4/index');
var ApexLexer = require('../antrl4/ApexLexer.js').ApexLexer
var ApexParser = require('../antrl4/ApexParser.js').ApexParser

declare var ClassDeclaration: any;

export class ApexObjectTreeCache {
  private cache: { [name: string]: ApexObject } = {};
  //private fetchers: VisualforceComponentFetcher[] = [];
  private diag: vscode.Diagnostic[];
 private ds = vscode.languages.createDiagnosticCollection('apex');
 private file: string;
 private uri: vscode.Uri;
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

  public reportAttemptingFullContext() {

  }

  public reportContextSensitivity() {

  }

  public reportAmbiguity() {

  }

  public syntaxError(a, b, c, d, e, f) {
    this.diag.push({
      message: e,
      range: new vscode.Range(c - 2, d, c, d),
      code: 1,
      severity: vscode.DiagnosticSeverity.Error,
      source: "vsforce"
    });
  }

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

  private handleClassDeclarationContext(ctx: any) {
    if (ctx.children && ctx.children.length == 3) {
      this.parseClassDeclarationContext(
        this.file.substr(
          ctx.children[1].symbol.start,
          ctx.children[1].symbol.stop - ctx.children[1].symbol.start + 1),
        ctx);
    }
  }

  private parseClassDeclarationContext(classname: string, ctx: any) {
    if (ctx instanceof ApexParser.ConstructorDeclarationContext) {
      this.parseConstructorDeclarationContext(classname,
        this.file.substr(ctx.start.start,
          ctx.start.stop - ctx.start.start + 1),
        ctx);
    } else if (ctx instanceof ApexParser.MethodDeclarationContext) {
      this.parseConstructorDeclarationContext(classname,
        this.file.substr(ctx.children[1].symbol.start,
          ctx.children[1].symbol.stop - ctx.children[1].symbol.start + 1),
        ctx);
    }
    else if (ctx.children) {
      ctx.children.forEach(child => {
        this.parseClassDeclarationContext(classname, child);
      });
    }
  }

  private parseConstructorDeclarationContext(classname: string, constructorName: string, ctx: any) {
    if (ctx instanceof ApexParser.FormalParameterListContext) {
      ctx.children.forEach(child => {
        if (child instanceof ApexParser.FormalParameterContext) {
          this.parseFormalParameterListContext(classname, constructorName, child);
        }
      });
    }
    else if (ctx.children) {
      ctx.children.forEach(child => {
        this.parseConstructorDeclarationContext(classname, constructorName, child);
      });
    }
  }

  private parseFormalParameterListContext(classname: string, methodName: string, ctx: any) {
    var type = this.file.substr(ctx.start.start,
      ctx.start.stop - ctx.start.start + 1);
    var name = this.file.substr(ctx.stop.start,
      ctx.stop.stop - ctx.stop.start + 1);
    console.log(classname + " has method " + methodName + " with param " + name + " of type " + type);
  }
}
