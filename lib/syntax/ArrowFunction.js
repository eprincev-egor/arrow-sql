"use strict";

const {Syntax} = require("lang-coach");
const JsArguments = require("./JsArguments");
const ObjectName = require("./ObjectName");
const Expression = require("./Expression");

// simple arrow function, who returns object

// example:
// 
// () => expression
// 
// Order => expression
// 
// Order => {
//     return expression
// }

class ArrowFunction extends Syntax {
    static structure() {
        return {
            arguments: Syntax.or(JsArguments, ObjectName),
            return: Expression
        };
    }

    static parse(coach, data) {
        // (x = 1, y = 2) => ...
        if ( coach.is("(") ) {
            data.arguments = coach.parseJsArguments();
        }
        // x => ...
        else {
            data.arguments = coach.parseObjectName();
        }
        
        coach.skipSpace();
        coach.expect("=>");
        coach.skipSpace();

        // => {return {}}
        if ( coach.is("{") ) {
            coach.expect("{");
            coach.skipSpace();

            coach.expect("return");
            coach.skipSpace();

            data.return = coach.parseExpression();
            coach.skipSpace();

            if ( coach.is(";") ) {
                coach.expect(";");
            }

            coach.skipSpace();
            coach.expect("}");
        }
        // => ( ... )
        else {
            data.return = coach.parseExpression();
        }
    }

    static is(coach) {
        return (
            coach.isObjectName() ||
            coach.is("(")
        );
    }

    toString() {
        let out = "";
        
        // x 
        // (x, y)
        out += this.data.arguments.toString();

        out += " => ";
        out += this.data.return.toString();

        return out;
    }

    getTableName() {
        let jsArgs = this.get("arguments");

        if ( jsArgs instanceof ObjectName ) {
            return jsArgs.get("name");
        }

        let firstArg = jsArgs.get("arguments")[0];
        return firstArg.get("name");
    }
}

module.exports = ArrowFunction;