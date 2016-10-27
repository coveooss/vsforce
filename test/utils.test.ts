import * as assert from 'assert';
import * as vscode from 'vscode';
import * as utils from '../src/utils/utils';

suite("test utils", () => {

    test("testing asArray with an array", () => {
        let arr: number[] = [1];
        assert(utils.asArray(arr) instanceof Array);
    });

    test("testing asArray with not an array", () => {
        let str: string = "test";
        assert(utils.asArray(str) instanceof Array);
    });

    test("testing asArray with undefined", () => {
        let undef: any = undefined;
        assert.doesNotThrow(() => {utils.asArray(undef)});
    });
});