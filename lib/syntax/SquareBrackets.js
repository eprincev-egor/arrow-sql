"use strict";

const {Syntax} = require("lang-coach");

class SquareBrackets extends Syntax {
    static structure() {
        const Expression = SquareBrackets.prototype.Coach.Expression;

        return {
            prop: Expression
        };
    }

    static parse(coach, data) {
        
        coach.expect("[");
        coach.skipSpace();

        data.prop = coach.parseExpression();

        coach.skipSpace();
        coach.expect("]");
    }
    
    static is(coach) {
        return coach.is("[");
    }
    
    toString() {
        let out = "[";
        
        out += this.data.prop.toString();

        out += "]";
        return out;
    }
}

module.exports = SquareBrackets;
