"use strict";

const {Syntax} = require("lang-coach");

class JsArray extends Syntax {
    static structure() {
        const Expression = JsArray.prototype.Coach.Expression;
        
        return {
            array: [Expression]
        };
    }

    static parse(coach, data) {
        data.array = [];
        
        coach.expect("[");
        coach.skipSpace();

        if ( !coach.is("]") ) {
            data.array = coach.parseComma("Expression", {
                stopByComma: true
            });
        }

        coach.skipSpace();
        coach.expect("]");
    }
    
    static is(coach) {
        return coach.is("[");
    }
    
    toString() {
        let out = "[";
        
        out += this.data.array.map(item => item.toString()).join(", ");

        out += "]";
        return out;
    }
}

module.exports = JsArray;

