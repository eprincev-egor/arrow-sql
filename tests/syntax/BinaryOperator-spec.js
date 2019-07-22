"use strict";

const BinaryOperator = require("../../lib/syntax/BinaryOperator");
const testSyntax = require("../testSyntax");

describe("BinaryOperator", () => {

    testSyntax(BinaryOperator, {
        str: "**",
        result: {
            binaryOperator: "**"
        }
    });

    testSyntax(BinaryOperator, {
        str: "*",
        result: {
            binaryOperator: "*"
        }
    });

    testSyntax(BinaryOperator, {
        str: "/",
        result: {
            binaryOperator: "/"
        }
    });

    testSyntax(BinaryOperator, {
        str: "-",
        result: {
            binaryOperator: "-"
        }
    });

    testSyntax(BinaryOperator, {
        str: "+",
        result: {
            binaryOperator: "+"
        }
    });

    testSyntax(BinaryOperator, {
        str: "<",
        result: {
            binaryOperator: "<"
        }
    });

    testSyntax(BinaryOperator, {
        str: "<=",
        result: {
            binaryOperator: "<="
        }
    });

    testSyntax(BinaryOperator, {
        str: ">",
        result: {
            binaryOperator: ">"
        }
    });

    testSyntax(BinaryOperator, {
        str: ">=",
        result: {
            binaryOperator: ">="
        }
    });

    testSyntax(BinaryOperator, {
        str: "in",
        result: {
            binaryOperator: "in"
        }
    });

    // x in (1, 2, 3)
    testSyntax(BinaryOperator, {
        str: ",",
        result: {
            binaryOperator: ","
        }
    });

    testSyntax(BinaryOperator, {
        str: "==",
        result: {
            binaryOperator: "=="
        }
    });

    testSyntax(BinaryOperator, {
        str: "!=",
        result: {
            binaryOperator: "!="
        }
    });

    testSyntax(BinaryOperator, {
        str: "===",
        result: {
            binaryOperator: "==="
        }
    });

    testSyntax(BinaryOperator, {
        str: "!==",
        result: {
            binaryOperator: "!=="
        }
    });

    testSyntax(BinaryOperator, {
        str: "&&",
        result: {
            binaryOperator: "&&"
        }
    });

    testSyntax(BinaryOperator, {
        str: "||",
        result: {
            binaryOperator: "||"
        }
    });

    testSyntax(BinaryOperator, {
        str: "%",
        result: {
            binaryOperator: "%"
        }
    });

});