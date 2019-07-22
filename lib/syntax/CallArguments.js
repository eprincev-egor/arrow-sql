"use strict";

const {Syntax} = require("lang-coach");

class CallArguments extends Syntax {
    static structure() {
        const Expression = CallArguments.prototype.Coach.Expression;

        return {
            arguments: [Expression]
        };
    }

    static parse(coach, data) {
        data.arguments = [];
        
        coach.expect("(");
        coach.skipSpace();

        if ( !coach.is(")") ) {
            data.arguments = coach.parseComma("Expression", {
                stopByComma: true
            });
        }

        coach.skipSpace();
        coach.expect(")");
    }
    
    static is(coach) {
        return coach.is("(");
    }
    
    toString() {
        let out = "(";
        
        out += this.data.arguments.map(item => item.toString()).join(", ");

        out += ")";
        return out;
    }
}

module.exports = CallArguments;
