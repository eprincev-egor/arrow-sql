"use strict";

const DotOperator = require("../../lib/syntax/DotOperator");
const testSyntax = require("../testSyntax");

describe("DotOperator", () => {

    testSyntax(DotOperator, {
        str: ".",
        result: {dot: true}
    });

    testSyntax(DotOperator, {
        str: "-",
        error: /SyntaxError/
    });

});
