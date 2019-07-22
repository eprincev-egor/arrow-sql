"use strict";

const JsArray = require("../../lib/syntax/JsArray");
const testSyntax = require("../testSyntax");

describe("JsArray", () => {

    testSyntax(JsArray, {
        str: "[]",
        result: {array: []}
    });

    testSyntax(JsArray, {
        str: "[1]",
        result: {array: [
            {elements: [ {number: "1"} ]}
        ]}
    });

    testSyntax(JsArray, {
        str: "[1, 2]",
        result: {array: [
            {elements: [ {number: "1"} ]},
            {elements: [ {number: "2"} ]}
        ]}
    });

    testSyntax(JsArray, {
        str: "[ '' ]",
        result: {array: [
            {elements: [ {content: "", quotes: "'"} ]}
        ]}
    });

    testSyntax(JsArray, {
        str: "[ 1 + 1 ]",
        result: {array: [
            {elements: [
                {number: "1"},
                {binaryOperator: "+"},
                {number: "1"}
            ]}
        ]}
    });

    testSyntax(JsArray, {
        str: "[ 1, ]",
        error: /SyntaxError/
    });

    testSyntax(JsArray, {
        str: "[ , 2 ]",
        error: /SyntaxError/
    });

});
