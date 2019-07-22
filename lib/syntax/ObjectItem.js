"use strict";

const {Syntax} = require("lang-coach");
const Expression = require("./Expression");
const ObjectName = require("./ObjectName");

class ObjectItem extends Syntax {
    static structure() {
        const Expression = ObjectItem.prototype.Coach.Expression;

        return {
            key: Syntax,
            value: Expression
        };
    }

    static is(coach) {
        return (
            coach.isQuotes() ||
            coach.isObjectName() ||
            coach.isJsNumber() ||
            coach.is("[")
        );
    }

    static parse(coach, data, options = {allowSquare: true}) {
        if ( coach.isObjectName() ) {
            data.key = coach.parseObjectName();
        }
        else if ( coach.isQuotes() ) {
            data.key = coach.parseQuotes();
        }
        else if ( coach.isJsNumber() ) {
            data.key = coach.parseJsNumber();
        }
        else if ( coach.is("[") ) {

            if ( !options.allowSquare ) {
                coach.throwError("square syntax not allowed here");
            }

            coach.expect("[");
            coach.skipSpace();

            data.key = coach.parseExpression();
            
            coach.skipSpace();
            coach.expect("]");
        }
        else {
            coach.throwError("expected key expression");
        }

        coach.skipSpace();

        // let x = "nice"
        // let obj = {x}
        let isKeyAndValue = (
            data.key instanceof ObjectName &&
            !coach.is(":")
        );
        if ( isKeyAndValue ) {
            data.value = new Expression({
                elements: [
                    data.key.clone()
                ]
            });
        }
        else {
            coach.expect(":");
            coach.skipSpace();
    
            data.value = coach.parseExpression({
                stopByComma: true
            });
        }
    }

    toString() {
        let out = "";
        let {key, value} = this.data;

        if ( key instanceof Expression ) {
            out += "[";
            out += key.toString();
            out += "]";
        }
        else {
            out += key.toString();
        }

        out += ": ";
        out += value.toString();

        return out;
    }
}

module.exports = ObjectItem;