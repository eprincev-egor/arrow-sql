"use strict";

const Boolean = require("../../lib/syntax/Boolean");
const testSyntax = require("../testSyntax");

describe("Boolean", () => {

    testSyntax(Boolean, {
        str: "true",
        result: {
            boolean: true
        }
    });

    testSyntax(Boolean, {
        str: "false",
        result: {
            boolean: false
        }
    });

    testSyntax(Boolean, {
        str: "fAlse",
        result: {
            boolean: false
        }
    });

    testSyntax(Boolean, {
        str: "  TRUE ",
        result: {
            boolean: true
        }
    });

    testSyntax(Boolean, {
        str: "true1",
        error: /SyntaxError/
    });

});
