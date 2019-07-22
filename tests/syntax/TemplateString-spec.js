"use strict";

const TemplateString = require("../../lib/syntax/TemplateString");
const testSyntax = require("../testSyntax");

describe("TemplateString", () => {

    testSyntax(TemplateString, {
        str: "``",
        result: {
            template: []
        }
    });

    testSyntax(TemplateString, {
        str: "`nice`",
        result: {
            template: [
                {string: "nice"}
            ]
        }
    });

    testSyntax(TemplateString, {
        str: "`\\``",
        result: {
            template: [
                {string: "`"}
            ]
        }
    });
    
    testSyntax(TemplateString, {
        str: "`\\n`",
        result: {
            template: [
                {string: "\n"}
            ]
        }
    });

    testSyntax(TemplateString, {
        str: "`\\u0000`",
        result: {
            template: [
                {string: "\u0000"}
            ]
        }
    });

    testSyntax(TemplateString, {
        str: "`hello${1}`",
        result: {
            template: [
                {string: "hello"},
                {elements: [
                    {number: "1"}
                ]}
            ]
        }
    });

    testSyntax(TemplateString, {
        str: "`${1}`",
        result: {
            template: [
                {elements: [
                    {number: "1"}
                ]}
            ]
        }
    });

    testSyntax(TemplateString, {
        str: "`${1}${2}`",
        result: {
            template: [
                {elements: [
                    {number: "1"}
                ]},
                {elements: [
                    {number: "2"}
                ]}
            ]
        }
    });

    testSyntax(TemplateString, {
        str: "`x${1}y${2}z`",
        result: {
            template: [
                {string: "x"},
                {elements: [
                    {number: "1"}
                ]},
                {string: "y"},
                {elements: [
                    {number: "2"}
                ]},
                {string: "z"}
            ]
        }
    });

    testSyntax(TemplateString, {
        str: "`\n${1}\r${2}\t`",
        result: {
            template: [
                {string: "\n"},
                {elements: [
                    {number: "1"}
                ]},
                {string: "\r"},
                {elements: [
                    {number: "2"}
                ]},
                {string: "\t"}
            ]
        }
    });

});
