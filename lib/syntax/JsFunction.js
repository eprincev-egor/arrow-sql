"use strict";

const {Syntax} = require("lang-coach");
const JsArguments = require("./JsArguments");
const Expression = require("./Expression");

// simple function, who returns object

// example:
// function someQuery(Order) {
//      return {
//          // some object here
//      };
// }

class JsFunction extends Syntax {
    static structure() {
        return {
            name: "string",
            arguments: JsArguments,
            return: Expression
        };
    }

    static parse(coach, data) {
        coach.expect("function");
        coach.skipSpace();

        if ( coach.isObjectName() ) {
            let objName = coach.parseObjectName();
            data.name = objName.get("name");
        }

        coach.skipSpace();
        data.arguments = coach.parseJsArguments();
        coach.skipSpace();
        
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

    static is(coach) {
        return coach.is("function");
    }

    toString() {
        let out = "function";

        if ( this.data.name ) {
            out += " " + this.data.name;
        }
        out += this.data.arguments.toString();

        out += "{ return ";
        out += this.data.return.toString();
        out += "; }";

        return out;
    }
    
    getTableName() {
        let jsArgs = this.get("arguments");
        let firstArg = jsArgs.get("arguments")[0];
        return firstArg.get("name");
    }
}

module.exports = JsFunction;