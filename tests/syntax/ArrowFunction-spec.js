"use strict";

const ArrowFunction = require("../../lib/syntax/ArrowFunction");
const testSyntax = require("../testSyntax");

describe("ArrowFunction", () => {

    testSyntax(ArrowFunction, {
        str: "()=>{return 10}",
        result: {
            arguments: {
                isObject: false,
                arguments: []
            },
            return: {
                elements: [
                    {number: "10"}
                ]
            }
        }
    });

    testSyntax(ArrowFunction, {
        str: "Order=>{return false}",
        result: {
            arguments: {name: "Order"},
            return: {
                elements: [
                    {boolean: false}
                ]
            }
        }
    });

    testSyntax(ArrowFunction, {
        str: "Order=>{return true;}",
        result: {
            arguments: {name: "Order"},
            return: {
                elements: [
                    {boolean: true}
                ]
            }
        }
    });

    testSyntax(ArrowFunction, {
        str: "Order=>1",
        result: {
            arguments: {name: "Order"},
            return: {
                elements: [
                    {number: "1"}
                ]
            }
        }
    });

    testSyntax(ArrowFunction, {
        str: "()=>1",
        result: {
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

    testSyntax(ArrowFunction, {
        str: "() => {  return 1 + 2  }",
        result: {
            arguments: {
                isObject: false,
                arguments: []
            },
            return: {
                elements: [
                    {number: "1"},
                    {binaryOperator: "+"},
                    {number: "2"}
                ]
            }
        }
    });

});
