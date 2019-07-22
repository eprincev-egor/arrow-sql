"use strict";

const {Syntax} = require("lang-coach");
const Expression = require("./Expression");

class JsArgument extends Syntax {
    static structure() {
        return {
            name: "string",
            default: Expression,
            rest: {
                type: "boolean",
                default: false
            }
        };
    }

    static parse(coach, data) {
        if ( coach.is(".") ) {
            coach.expect("...");
            coach.skipSpace();
            data.rest = true;
        }

        let objName = coach.parseObjectName();
        data.name = objName.get("name");

        coach.skipSpace();

        if ( coach.is("=") ) {
            if ( data.rest ) {
                coach.throwError("Rest parameter may not have a default initializer");
            }

            coach.expect("=");
            coach.skipSpace();

            data.default = coach.parseExpression({
                stopByComma: true
            });
        }
    }
    
    static is(coach) {
        return (
            coach.isObjectName() ||
            coach.is("...")
        );
    }
    
    toString() {
        if ( this.data.rest ) {
            return "..." + this.data.name;
        }

        let out = this.data.name;
        if ( this.data.default ) {
            out += " = " + this.data.default.toString();
        }

        return out;
    }
}

module.exports = JsArgument;
