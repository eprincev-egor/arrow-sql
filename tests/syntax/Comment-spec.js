"use strict";

const Comment = require("../../lib/syntax/Comment");
const testSyntax = require("../testSyntax");

describe("Comment", () => {

    testSyntax(Comment, {
        str: "//123\n",
        result: {
            isLine: true,
            isMulti: false,
            content: "123"
        }
    });

    testSyntax(Comment, {
        str: "//123\r",
        result: {
            isLine: true,
            isMulti: false,
            content: "123"
        }
    });

    testSyntax(Comment, {
        str: "/*123\n456*/",
        result: {
            isLine: false,
            isMulti: true,
            content: "123\n456"
        }
    });

    testSyntax(Comment, {
        str: "/*123\r456*/",
        result: {
            isLine: false,
            isMulti: true,
            content: "123\r456"
        }
    });

    testSyntax(Comment, {
        str: "-1",
        error: /SyntaxError/
    });

});
