let assert = require('assert');
let vscode = require('vscode');
let utils = require('../src/utils/utils');

suite("test utils", () => {

    test("testing asArray(Array) instanceof Array", () => {
        let arr: number[] = [1];
        assert(utils.asArray(arr) instanceof Array);
    });

    test("testing asArray(string) instanceof Array", () => {
        let str: string = "test";
        assert(utils.asArray(str) instanceof Array);
    });

    test("testing asArray(undefined) does not throw", () => {
        let undef: any = undefined;
        assert.doesNotThrow(() => {utils.asArray(undef)});
    });
});