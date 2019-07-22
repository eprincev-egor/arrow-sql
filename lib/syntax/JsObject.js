"use strict";

const {Syntax} = require("lang-coach");
const ObjectItem = require("./ObjectItem");

class JsObject extends Syntax {
    static structure() {
        return {
            object: [ObjectItem]
        };
    }

    static is(coach) {
        return coach.is("{");
    }

    static parse(coach, data, options) {
        
        data.object = [];

        coach.expect("{");
        coach.skipSpace();

        if ( !coach.is("}") ) {
            data.object = coach.parseComma("ObjectItem", options);
        }

        coach.skipSpace();
        coach.expect("}");
    }

    toString() {
        let out = "{";
        
        out += this.data.object.map(item => item.toString()).join(", ");

        out += "}";
        return out;
    }
}

module.exports = JsObject;
