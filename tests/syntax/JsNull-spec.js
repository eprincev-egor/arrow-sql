"use strict";

const JsNull = require("../../lib/syntax/JsNull");
const testSyntax = require("../testSyntax");

describe("JsNull", () => {

    testSyntax(JsNull, {
        str: "null",
        result: {null: true}
    });

    testSyntax(JsNull, {
        str: "Null",
        error: /SyntaxError/
    });

});
