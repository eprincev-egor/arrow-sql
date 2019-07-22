"use strict";

const {Syntax} = require("lang-coach");

class ObjectName extends Syntax {
    static structure() {
        return {
            name: "string"
        };
    }

    static parse(coach, data) {
        data.name = coach.read(/[a-z$_]\w*/i);
        
        if ( !data.name ) {
            coach.throwError("expected object name");
        }
    }
    
    static is(coach) {
        return coach.is(/[a-z$_]/i);
    }
    
    toString() {
        return this.data.name;
    }
}

module.exports = ObjectName;
