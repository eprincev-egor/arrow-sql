"use strict";

const JsUndefined = require("../../lib/syntax/JsUndefined");
const testSyntax = require("../testSyntax");

describe("JsUndefined", () => {

    testSyntax(JsUndefined, {
        str: "undefined",
        result: {undefined: true}
    });

    testSyntax(JsUndefined, {
        str: "Undefined",
        error: /SyntaxError/
    });

});
