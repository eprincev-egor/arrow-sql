"use strict";

const JsNumber = require("../../lib/syntax/JsNumber");
const testSyntax = require("../testSyntax");

describe("JsNumber", () => {

    testSyntax(JsNumber, {
        str: "1",
        result: {number: "1"}
    });
    
    testSyntax(JsNumber, {
        str: "1234567890",
        result: {number: "1234567890"}
    });

    testSyntax(JsNumber, {
        str: "3.2",
        result: {number: "3.2"}
    });

    testSyntax(JsNumber, {
        str: "5e2",
        result: {number: "5e2"}
    });

    testSyntax(JsNumber, {
        str: ".001",
        result: {number: ".001"}
    });

    testSyntax(JsNumber, {
        str: "1.925e-3",
        result: {number: "1.925e-3"}
    });

    testSyntax(JsNumber, {
        str: "1.925e+3",
        result: {number: "1.925e+3"}
    });

});
