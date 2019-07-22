"use strict";

const JsRegExp = require("../../lib/syntax/JsRegExp");
const testSyntax = require("../testSyntax");

describe("JsRegExp", () => {

    testSyntax(JsRegExp, {
        str: "/test/",
        result: {
            regExp: "test",
            flags: null
        }
    });

    testSyntax(JsRegExp, {
        str: "/t\\nest\\s/",
        result: {
            regExp: "t\\nest\\s",
            flags: null
        }
    });

    testSyntax(JsRegExp, {
        str: "/te\\/st/",
        result: {
            regExp: "te/st",
            flags: null
        }
    });

    testSyntax(JsRegExp, {
        str: "/ /",
        result: {
            regExp: " ",
            flags: null
        }
    });

    testSyntax(JsRegExp, {
        str: "/[some]/i",
        result: {
            regExp: "[some]",
            flags: "i"
        }
    });

    testSyntax(JsRegExp, {
        str: "/[some]/g",
        result: {
            regExp: "[some]",
            flags: "g"
        }
    });

    testSyntax(JsRegExp, {
        str: "/[some]/m",
        result: {
            regExp: "[some]",
            flags: "m"
        }
    });

    testSyntax(JsRegExp, {
        str: "/[some]/igm",
        result: {
            regExp: "[some]",
            flags: "gim"
        }
    });

    testSyntax(JsRegExp, {
        str: "/[some]/mgi",
        result: {
            regExp: "[some]",
            flags: "gim"
        }
    });

    testSyntax(JsRegExp, {
        str: "/[some]/ii",
        error: /duplicated flag: i/
    });

});
