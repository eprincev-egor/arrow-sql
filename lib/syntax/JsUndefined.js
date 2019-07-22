"use strict";

const {Syntax} = require("lang-coach");

class JsUndefined extends Syntax {
    static structure() {
        return {
            undefined: {
                type: "boolean",
                default: true
            }
        };
    }

    static is(coach) {
        return coach.is("undefined");
    }

    static parse(coach) {
        coach.expect("undefined");
    }

    toString() {
        return "undefined";
    }
}

module.exports = JsUndefined;