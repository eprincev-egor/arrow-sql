"use strict";

const {Syntax} = require("lang-coach");

const OPERATORS = [
    "**",
    "*",
    "/",
    "%",
    "+",
    "-",
    // ">>",
    // "<<",
    // ">>>",
    "<",
    "<=",
    ">",
    ">=",
    "in",
    "==",
    "!=",
    "===",
    "!==",
    "&&",
    "||",
    ","
];
const OPERATORS_SYMBOLS = (
    OPERATORS
        .join("")
        .split("")
        .reduce((total, symbol) => {

            if ( !total.includes(symbol) ) {
                total += symbol;
            }

            return total;
        }, "")
);

const OPERATORS_MAP = {};
OPERATORS.forEach(operator => {
    for (let i = 0, n = operator.length; i < n; i++) {
        let sequence = operator.slice(0, i + 1);
        OPERATORS_MAP[ sequence ] = true;
    }
});


class BinaryOperator extends Syntax {
    static structure() {
        return {
            binaryOperator: {
                type: "string",
                enum: OPERATORS
            }
        };
    }

    static is(coach, str) {
        return (
            OPERATORS_SYMBOLS.includes( str[0] ) &&
            !coach.is(/=([^=]|$)/)
        );
    }

    static parse(coach, data) {
        let operator = "";

        for (; coach.i < coach.n; coach.i++) {
            let symbol = coach.str[ coach.i ];
            
            let sequence = operator + symbol;
            let existsSimilarSequence = sequence in OPERATORS_MAP;

            if ( existsSimilarSequence ) {
                operator += symbol;
            } else {
                break;
            }
        }

        data.binaryOperator = operator;
    }

    isComma() {
        return this.data.binaryOperator == ",";
    }

    toString() {
        return this.data.binaryOperator;
    }
}

module.exports = BinaryOperator;