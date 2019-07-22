"use strict";

const ObjectItem = require("../../lib/syntax/ObjectItem");
const testSyntax = require("../testSyntax");

describe("ObjectItem", () => {

    testSyntax(ObjectItem, {
        str: "x: 1",
        result: {
            key: {name: "x"},
            value: {elements: [
                {number: "1"}
            ]}
        }
    });

    testSyntax(ObjectItem, {
        str: "1: 1",
        result: {
            key: {number: "1"},
            value: {elements: [
                {number: "1"}
            ]}
        }
    });

    testSyntax(ObjectItem, {
        str: "'cebab-case': 1",
        result: {
            key: {content: "cebab-case", quotes: "'"},
            value: {elements: [
                {number: "1"}
            ]}
        }
    });

    testSyntax(ObjectItem, {
        str: "\"cebab-case\": 1",
        result: {
            key: {content: "cebab-case", quotes: "\""},
            value: {elements: [
                {number: "1"}
            ]}
        }
    });

    testSyntax(ObjectItem, {
        str: "[x + 1]: 100",
        result: {
            key: {elements: [
                {name: "x"},
                {binaryOperator: "+"},
                {number: "1"}
            ]},
            value: {elements: [
                {number: "100"}
            ]}
        }
    });

    testSyntax(ObjectItem, {
        str: "columns",
        result: {
            key: {name: "columns"},
            value: {elements: [
                {name: "columns"}
            ]}
        }
    });

    testSyntax(ObjectItem, {
        str: "'test'",
        error: /SyntaxError/
    });

    testSyntax(ObjectItem, {
        str: "\"test\"",
        error: /SyntaxError/
    });

    testSyntax(ObjectItem, {
        str: "[bad]",
        error: /SyntaxError/
    });

    testSyntax(ObjectItem, {
        str: "``",
        error: /expected key expression/
    });

});
