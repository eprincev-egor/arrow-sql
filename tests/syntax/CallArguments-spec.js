"use strict";

const CallArguments = require("../../lib/syntax/CallArguments");
const testSyntax = require("../testSyntax");

describe("CallArguments", () => {

    testSyntax(CallArguments, {
        str: "()",
        result: {arguments: []}
    });

    testSyntax(CallArguments, {
        str: "(1)",
        result: {arguments: [
            {elements: [ {number: "1"} ]}
        ]}
    });

    testSyntax(CallArguments, {
        str: "(1, 2)",
        result: {arguments: [
            {elements: [ {number: "1"} ]},
            {elements: [ {number: "2"} ]}
        ]}
    });

    testSyntax(CallArguments, {
        str: "( '' )",
        result: {arguments: [
            {elements: [ {content: "", quotes: "'"} ]}
        ]}
    });

    testSyntax(CallArguments, {
        str: "( 1 + 1 )",
        result: {arguments: [
            {elements: [
                {number: "1"},
                {binaryOperator: "+"},
                {number: "1"}
            ]}
        ]}
    });

    testSyntax(CallArguments, {
        str: "( 1, )",
        error: /SyntaxError/
    });

    testSyntax(CallArguments, {
        str: "( , 2 )",
        error: /SyntaxError/
    });

});
