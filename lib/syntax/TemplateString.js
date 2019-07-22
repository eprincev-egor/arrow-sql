"use strict";
 
const {Syntax} = require("lang-coach");

class TemplateString extends Syntax {
    static structure() {
        return {
            // StringContent or Expression
            template: [Syntax]
        };
    }

    static parse(coach, data) {
        data.template = [];
        coach.expect("`");

        TemplateString.parseContent(coach, data);

        coach.expect("`");
    }

    static parseContent(coach, data) {
        if ( coach.is("`") ) {
            return;
        }

        if ( coach.is("$") ) {
            coach.expect("${");
            coach.skipSpace();
            
            let expression = coach.parseExpression();
            data.template.push( expression );

            coach.skipSpace();
            coach.expect("}");
        }
        else {
            let content = coach.parseStringContent();
            data.template.push( content );
        }

        TemplateString.parseContent(coach, data);
    }

    static is(coach) {
        return coach.is("`");
    }

    toString() {
        let out = "`";

        const Expression = TemplateString.prototype.Coach.Expression;

        for (let i = 0, n = this.data.template.length; i < n; i++) {
            let elem = this.data.template[ i ];

            if ( elem instanceof Expression ) {
                out += "${";
                out += elem.toString();
                out += "}";
            }
            // StringContent
            else {
                out += elem.toString();
            }
        }

        out += "`";
        return out;
    }
}

module.exports = TemplateString;