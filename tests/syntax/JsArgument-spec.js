"use strict";

const JsArgument = require("../../lib/syntax/JsArgument");
const testSyntax = require("../testSyntax");

describe("JsArgument", () => {

    testSyntax(JsArgument, {
        str: "hello",
        result: {
            name: "hello",
            rest: false,
            default: null
        }
    });

    testSyntax(JsArgument, {
        str: "...args",
        result: {
            name: "args",
            rest: true,
            default: null
        }
    });

    testSyntax(JsArgument, {
        str: "x = 3",
        result: {
            name: "x",
            rest: false,
            default: {elements: [
                {number: "3"}
            ]}
        }
    });

    testSyntax(JsArgument, {
        str: "...x = 10",
        error: /Rest parameter may not have a default initializer/
    });

});
