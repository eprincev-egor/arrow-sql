"use strict";

const {Syntax} = require("lang-coach");

class DotOperator extends Syntax {
    static structure() {
        return {
            dot: {
                type: "boolean",
                default: true
            }
        };
    }

    static is(coach) {
        return coach.is(".");
    }

    static parse(coach) {
        coach.expect(".");
    }

    toString() {
        return ".";
    }
}

module.exports = DotOperator;