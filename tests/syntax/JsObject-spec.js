"use strict";

const JsObject = require("../../lib/syntax/JsObject");
const testSyntax = require("../testSyntax");

describe("JsObject", () => {

    testSyntax(JsObject, {
        str: "{}",
        result: {object: []}
    });

    testSyntax(JsObject, {
        str: "{a: 1}",
        result: {object: [
            {
                key: {name: "a"},
                value: {elements: [
                    {number: "1"}
                ]}
            }
        ]}
    });

    testSyntax(JsObject, {
        str: "{\" \": 1}",
        result: {object: [
            {
                key: {content: " ", quotes: "\""},
                value: {elements: [
                    {number: "1"}
                ]}
            }
        ]}
    });

    testSyntax(JsObject, {
        str: "{1: 1}",
        result: {object: [
            {
                key: {number: "1"},
                value: {elements: [
                    {number: "1"}
                ]}
            }
        ]}
    });

    testSyntax(JsObject, {
        str: "{a: 1, b: 2}",
        result: {object: [
            {
                key: {name: "a"},
                value: {elements: [
                    {number: "1"}
                ]}
            },
            {
                key: {name: "b"},
                value: {elements: [
                    {number: "2"}
                ]}
            }
        ]}
    });

    testSyntax(JsObject, {
        str: "{a, b}",
        result: {object: [
            {
                key: {name: "a"},
                value: {elements: [
                    {name: "a"}
                ]}
            },
            {
                key: {name: "b"},
                value: {elements: [
                    {name: "b"}
                ]}
            }
        ]}
    });

    testSyntax(JsObject, {
        str: "{a,b}",
        result: {object: [
            {
                key: {name: "a"},
                value: {elements: [
                    {name: "a"}
                ]}
            },
            {
                key: {name: "b"},
                value: {elements: [
                    {name: "b"}
                ]}
            }
        ]}
    });

    testSyntax(JsObject, {
        str: "{[a]:(a,b),b}",
        result: {object: [
            {
                key: {elements: [
                    {name: "a"}
                ]},
                value: {elements: [
                    {elements: [
                        {name: "a"},
                        {binaryOperator: ","},
                        {name: "b"}
                    ]}
                ]}
            },
            {
                key: {name: "b"},
                value: {elements: [
                    {name: "b"}
                ]}
            }
        ]}
    });
});
