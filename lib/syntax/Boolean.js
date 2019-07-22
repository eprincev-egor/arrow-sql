"use strict";

const {Syntax} = require("lang-coach");

// true or false

class Boolean extends Syntax {
    static structure() {
        return {
            boolean: {
                type: "boolean",
                required: true
            }
        };
    }

    static parse(coach, data) {

        if ( coach.isWord("true") ) {
            coach.expectWord("true");
            data.boolean = true;
        } else {
            coach.expectWord("false");
            data.boolean = false;
        }
    }
    
    static is(coach) {
        return coach.isWord("true") || coach.isWord("false");
    }
    
    toString() {
        if ( this.data.boolean ) {
            return "true";
        } else {
            return "false";
        }
    }
}

module.exports = Boolean;
