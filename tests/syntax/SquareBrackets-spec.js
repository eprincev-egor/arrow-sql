"use strict";

const SquareBrackets = require("../../lib/syntax/SquareBrackets");
const testSyntax = require("../testSyntax");

describe("SquareBrackets", () => {

    testSyntax(SquareBrackets, {
        str: "['name']",
        result: {
            prop: {elements: [
                {content: "name", quotes: "'"}
            ]}
        }
    });

    testSyntax(SquareBrackets, {
        str: "[ someVar ]",
        result: {
            prop: {elements: [
                {name: "someVar"}
            ]}
        }
    });

    testSyntax(SquareBrackets, {
        str: "[ someVar + 'nice' ]",
        result: {
            prop: {elements: [
                {name: "someVar"},
                {binaryOperator: "+"},
                {content: "nice", quotes: "'"}
            ]}
        }
    });

    testSyntax(SquareBrackets, {
        str: "[]",
        error: /SyntaxError/
    });

});
