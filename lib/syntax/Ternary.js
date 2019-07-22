"use strict";

const {Syntax} = require("lang-coach");

// condition ? then : else

// !!!!
// DO NOT USE coach.parseTernary()
// DO NOT USE coach.isTernary()
// !!!!

class Ternary extends Syntax {
    static structure() {
        const Expression = Ternary.prototype.Coach.Expression;

        return {
            condition: Expression,
            then: Expression,
            else: Expression
        };
    }

    // @see Expression.parseElement
    static parseAfterCondition(coach, data) {
        coach.skipSpace();
        coach.expect("?");
        coach.skipSpace();

        data.then = coach.parseExpression({ stopByComma: true });

        coach.skipSpace();
        coach.expect(":");
        coach.skipSpace();

        data.else = coach.parseExpression({ stopByComma: true });
    }
    
    toString() {
        const _condition = this.data.condition.toString();
        const _then = this.data.then.toString();
        const _else = this.data.else.toString();

        return `${ _condition } ? ${ _then } : ${ _else }`;
    }
}

module.exports = Ternary;
