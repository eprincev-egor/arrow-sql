"use strict";

const ObjectName = require("../../lib/syntax/ObjectName");
const testSyntax = require("../testSyntax");

describe("ObjectName", () => {

    testSyntax(ObjectName, {
        str: "Nice",
        result: {
            name: "Nice"
        }
    });

    testSyntax(ObjectName, {
        str: "order",
        result: {
            name: "order"
        }
    });

    testSyntax(ObjectName, {
        str: "$",
        result: {
            name: "$"
        }
    });

    testSyntax(ObjectName, {
        str: "_",
        result: {
            name: "_"
        }
    });

    testSyntax(ObjectName, {
        str: "1x",
        error: /SyntaxError/
    });

});
