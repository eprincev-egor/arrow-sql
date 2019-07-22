"use strict";

const {Syntax} = require("lang-coach");

const OPERATORS = [
    "...",
    "!",
    "~",
    "+",
    "-"
];

class UnaryOperator extends Syntax {
    static structure() {
        return {
            unaryOperator: {
                type: "string",
                enum: OPERATORS
            }
        };
    }

    static is(coach, str) {
        return (
            OPERATORS.includes( str[0] ) || 
            str[0] == "."
        );
    }

    static parse(coach, data) {
        let symbol = coach.str[ coach.i ];

        if ( symbol == "." ) {
            coach.expect("...");
            symbol = "...";
        }
        else {
            coach.i++;

            if ( !OPERATORS.includes(symbol) ) {
                coach.throwError("expected unary operator");
            }
        }
        

        data.unaryOperator = symbol;
    }

    toString() {
        return this.data.unaryOperator;
    }
}

module.exports = UnaryOperator;