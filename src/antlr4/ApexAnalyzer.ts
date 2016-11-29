var antlr4 = require('antlr4/index');
var ApexLexer = require('./ApexLexer.js');
var ApexParser = require('./ApexParser.js');

export class ApexAnalyzer {
    public static analyse(listener: any, data: string) {
        var chars = new antlr4.InputStream(data);
        var lexer = new ApexLexer.ApexLexer(chars);
        var tokens = new antlr4.CommonTokenStream(lexer);
        var parser = new ApexParser.ApexParser(tokens);

        parser.buildParseTrees = true;

        parser.removeErrorListeners();
        parser.addErrorListener(listener);


        listener.reportAttemptingFullContext = (a, b, c, d, e, f) => {
            console.log(a, b, c, d, e, f);
        }

        listener.reportContextSensitivity = (a, b, c, d, e, f) => {
            console.log(a, b, c, d, e, f);
        }

        listener.reportAmbiguity = (a, b, c, d, e, f) => {
            console.log(a, b, c, d, e, f);
        }

        listener.syntaxError = (a, b, c, d, e, f) => {
            console.log(a, b, c, d, e, f);
        }
        var tree = parser.compilationUnit();
        antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);
    }
}
