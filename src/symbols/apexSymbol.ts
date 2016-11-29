import vscode = require('vscode');

export enum ApexScope {
    public,
    private,
    protected,
    global
}

export interface IApexSymbol {
    name: string,
    type: string,
    scope: ApexScope,
    static: boolean,
    childrens: IApexSymbol[],
    range?: vscode.Range,
}

export interface IApexMethod extends IApexSymbol {
    attributes: IApexSymbol[],
    returnType: string
}

export interface IApexObject extends IApexSymbol {
    namespace: string,
    childrens: IApexSymbol[];
}

export interface IApexVariable extends IApexSymbol {
    variableType: string
}
