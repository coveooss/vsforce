import vscode = require('vscode')

var antlr4 = require('antlr4')
var ApexLexer = require('../antrl4/ApexLexer.js').ApexLexer
var ApexParser = require('../antrl4/ApexParser.js').ApexParser
var ApexListener = require('../antrl4/ApexListener.js').ApexListener

export class ApexCompletionItemProvider {
  constructor() {
    var input = `public class MySampleApexClass {
                }`;


    var chars = new antlr4.InputStream(input);
    var lexer = new ApexLexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new ApexParser(tokens);
    parser.buildParseTrees = true;
    var tree = parser.compilationUnit();
    var apexListener = new ApexListener();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(apexListener, tree);

  }
}
