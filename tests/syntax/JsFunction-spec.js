"use strict";

const JsFunction = require("../../lib/syntax/JsFunction");
const testSyntax = require("../testSyntax");

describe("Function", () => {

    testSyntax(JsFunction, {
        str: "function(){return 1}",
        result: {
            name: null,
            arguments: {
                isObject: false,
                arguments: []
            },
            return: {
                elements: [
                    {number: "1"}
                ]
            }
        }
    });

    testSyntax(JsFunction, {
        str: "function test(){return false}",
        result: {
            name: "test",
            arguments: {
                isObject: false,
                arguments: []
            },
            return: {
                elements: [
                    {boolean: false}
                ]
            }
        }
    });

    testSyntax(JsFunction, {
        str: "function test(){return true;}",
        result: {
            name: "test",
            arguments: {
                isObject: false,
                arguments: []
            },
            return: {
                elements: [
                    {boolean: true}
                ]
            }
        }
    });

    testSyntax(JsFunction, {
        str: "function (){  return 1 == 2  }",
        result: {
            name: null,
            arguments: {
                isObject: false,
                arguments: []
            },
            return: {
                elements: [
                    {number: "1"},
                    {binaryOperator: "=="},
                    {number: "2"}
                ]
            }
        }
    });

});
