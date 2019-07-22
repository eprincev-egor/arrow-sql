"use strict";
"use strict";

const Quotes = require("../../lib/syntax/Quotes");
const testSyntax = require("../testSyntax");

describe("Quotes", () => {

    testSyntax(Quotes, {
        str: "\"hello world\"",
        result: {
            quotes: "\"",
            content: "hello world"
        }
    });

    testSyntax(Quotes, {
        str: "'hello world'",
        result: {
            quotes: "'",
            content: "hello world"
        }
    });

    testSyntax(Quotes, {
        str: "''",
        result: {
            quotes: "'",
            content: ""
        }
    });

    testSyntax(Quotes, {
        str: "\"\"",
        result: {
            quotes: "\"",
            content: ""
        }
    });

    testSyntax(Quotes, {
        str: "\"\\n\"",
        result: {
            quotes: "\"",
            content: "\n"
        }
    });

    testSyntax(Quotes, {
        str: "\"\\r\"",
        result: {
            quotes: "\"",
            content: "\r"
        }
    });

    testSyntax(Quotes, {
        str: "\"\\t\"",
        result: {
            quotes: "\"",
            content: "\t"
        }
    });

    testSyntax(Quotes, {
        str: "'\\u0000'",
        result: {
            quotes: "'",
            content: "\u0000"
        }
    });
    
});
