"use strict";

const {Syntax} = require("lang-coach");

class JsNull extends Syntax {
    static structure() {
        return {
            null: {
                type: "boolean",
                default: true
            }
        };
    }

    static is(coach) {
        return coach.is("null");
    }

    static parse(coach) {
        coach.expect("null");
    }

    toString() {
        return "null";
    }
}

module.exports = JsNull;