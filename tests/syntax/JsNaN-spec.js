"use strict";

const JsNaN = require("../../lib/syntax/JsNaN");
const testSyntax = require("../testSyntax");

describe("JsNaN", () => {

    testSyntax(JsNaN, {
        str: "NaN",
        result: {NaN: true}
    });

    testSyntax(JsNaN, {
        str: "Nan",
        error: /SyntaxError/
    });

});
