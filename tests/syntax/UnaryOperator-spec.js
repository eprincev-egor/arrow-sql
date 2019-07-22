"use strict";

const UnaryOperator = require("../../lib/syntax/UnaryOperator");
const testSyntax = require("../testSyntax");

describe("UnaryOperator", () => {

    testSyntax(UnaryOperator, {
        str: "-",
        result: {
            unaryOperator: "-"
        }
    });

    testSyntax(UnaryOperator, {
        str: "+",
        result: {
            unaryOperator: "+"
        }
    });

    testSyntax(UnaryOperator, {
        str: "~",
        result: {
            unaryOperator: "~"
        }
    });

    testSyntax(UnaryOperator, {
        str: "!",
        result: {
            unaryOperator: "!"
        }
    });

    testSyntax(UnaryOperator, {
        str: "...",
        result: {
            unaryOperator: "..."
        }
    });

    testSyntax(UnaryOperator, {
        str: "?",
        error: /SyntaxError/
    });


});