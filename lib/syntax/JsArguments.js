"use strict";

const {Syntax} = require("lang-coach");
const JsArgument = require("./JsArgument");

class JsArguments extends Syntax {
    static structure() {
        return {
            isObject: {
                type: "boolean",
                default: false
            },
            arguments: [JsArgument]
        };
    }

    static parse(coach, data) {
        coach.expect("(");
        coach.skipSpace();

        if ( coach.is("{") ) {
            coach.expect("{");
            data.isObject = true;
        }

        coach.skipSpace();
        if ( coach.isJsArgument() ) {
            data.arguments = coach.parseComma("JsArgument");
        }
        else {
            data.arguments = [];
        }
        coach.skipSpace();

        
        if ( data.isObject ) {
            coach.expect("}");
        }

        let existsName = {};
        let restArgIndex = -1;
        data.arguments.forEach((arg, i) => {
            let name = arg.get("name");
            if ( name in existsName ) {
                coach.throwError("Duplicate parameter name not allowed in this context: " + name);
            }

            existsName[ name ] = true;

            if ( arg.get("rest") ) {
                restArgIndex = i;
            }
        });

        if ( restArgIndex != -1 ) {
            if ( restArgIndex != data.arguments.length - 1 ) {
                coach.throwError("Rest parameter must be last formal parameter");
            }
        }

        coach.skipSpace();
        coach.expect(")");
    }
    
    static is(coach) {
        return coach.is("(");
    }
    
    toString() {
        let out = "(";

        if ( this.data.isObject ) {
            out += "{";
        }

        out += this.data.arguments.map(arg => arg.toString()).join(", ");

        if ( this.data.isObject ) {
            out += "}";
        }

        out += ")";
        return out;
    }
}

module.exports = JsArguments;
