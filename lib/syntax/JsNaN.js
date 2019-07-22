"use strict";

const {Syntax} = require("lang-coach");

class JsNaN extends Syntax {
    static structure() {
        return {
            NaN: {
                type: "boolean",
                default: true
            }
        };
    }

    static is(coach) {
        return coach.is("NaN");
    }

    static parse(coach) {
        coach.expect("NaN");
    }

    toString() {
        return "NaN";
    }
}

module.exports = JsNaN;