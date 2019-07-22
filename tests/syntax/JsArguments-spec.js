"use strict";

const JsArguments = require("../../lib/syntax/JsArguments");
const testSyntax = require("../testSyntax");

describe("JsArguments", () => {

    testSyntax(JsArguments, {
        str: "()",
        result: {
            isObject: false,
            arguments: []
        }
    });

    testSyntax(JsArguments, {
        str: "(a)",
        result: {
            isObject: false,
            arguments: [
                {
                    name: "a",
                    rest: false,
                    default: null
                }
            ]
        }
    });

    testSyntax(JsArguments, {
        str: "({a})",
        result: {
            isObject: true,
            arguments: [
                {
                    name: "a",
                    rest: false,
                    default: null
                }
            ]
        }
    });

    testSyntax(JsArguments, {
        str: "({a = 1, b = 2})",
        result: {
            isObject: true,
            arguments: [
                {
                    name: "a",
                    rest: false,
                    default: {elements: [
                        {number: "1"}
                    ]}
                },
                {
                    name: "b",
                    rest: false,
                    default: {elements: [
                        {number: "2"}
                    ]}
                }
            ]
        }
    });

    testSyntax(JsArguments, {
        str: "(a = 1, b = 2)",
        result: {
            isObject: false,
            arguments: [
                {
                    name: "a",
                    rest: false,
                    default: {elements: [
                        {number: "1"}
                    ]}
                },
                {
                    name: "b",
                    rest: false,
                    default: {elements: [
                        {number: "2"}
                    ]}
                }
            ]
        }
    });

    testSyntax(JsArguments, {
        str: "(...a)",
        result: {
            isObject: false,
            arguments: [
                {
                    name: "a",
                    rest: true,
                    default: null
                }
            ]
        }
    });

    testSyntax(JsArguments, {
        str: "(a,b,a)",
        error: /Duplicate parameter name not allowed in this context: a/
    });

    testSyntax(JsArguments, {
        str: "(...a,b)",
        error: /Rest parameter must be last formal parameter/
    });

});
