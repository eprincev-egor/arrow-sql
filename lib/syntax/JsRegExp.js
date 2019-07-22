"use strict";
 
const {Syntax} = require("lang-coach");

class JsRegExp extends Syntax {
    static structure() {
        return {
            regExp: "string",
            flags: "string"
        };
    }

    static parse(coach, data) {
        data.regExp = "";
        coach.expect("/");

        for (; coach.i < coach.n; coach.i++) {
            let symbol = coach.str[ coach.i ];
            let nextSymbol = coach.str[ coach.i + 1 ];

            if ( symbol == "\\" && nextSymbol == "/" ) {
                data.regExp += "/";
                coach.i++;
                continue;
            }

            if ( symbol == "/" ) {
                break;
            }

            data.regExp += symbol;
        }

        coach.expect( "/" );

        if ( coach.isWord() ) {
            let flags = coach.expect(/[igm]+/);
            flags = flags.split("").sort();

            let reserved = {};
            flags.forEach(flag => {
                if ( flag in reserved ) {
                    coach.throwError("duplicated flag: " + flag);
                }

                reserved[ flag ] = true;
            });

            data.flags = flags.join("");
        }
    }

    static is(coach) {
        return coach.is("/");
    }

    toString() {
        let regExp = this.data.regExp;
        regExp = regExp.replace("/", "\\/");

        let flags = "";
        if ( this.data.flags ) {
            flags = this.data.flags;
        }

        return `/${ regExp }/${flags}`;
    }
}

module.exports = JsRegExp;