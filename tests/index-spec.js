"use strict";

const index = require("../lib/index");
const assert = require("assert");
const testSyntax = require("./testSyntax");

describe("index tests", () => {
    
    it("index has JSQueryCoach", () => {
        assert.ok( index.JSQueryCoach );
    });

    it("testSyntax without str", () => {
        assert.throws(
            () => {
                testSyntax(index.JSQueryCoach.JsNull, {
                    
                });
            },
            err =>
                err.message == "test.str required"
        );
    });

    it("testSyntax without result", () => {
        assert.throws(
            () => {
                testSyntax(index.JSQueryCoach.JsNull, {
                    str: "null"
                });
            },
            err =>
                err.message == "test.result or test.error required"
        );
    });
    
});