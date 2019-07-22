"use strict";

const {Syntax} = require("lang-coach");

class StringContent extends Syntax {
    static structure() {
        return {
            string: "text"
        };
    }

    static parse(coach, data) {
        data.string = "";

        for (; coach.i < coach.n; coach.i++) {
            let symbol = coach.str[coach.i];

            if ( symbol == "\\" ) {
                // get next symbol
                coach.i++;
                symbol = coach.str[ coach.i ];


                if ( symbol == "u" ) {
                    coach.i++;

                    let unicode = coach.expect(/[\dabcdef]{4}/, "expected unicode sequence");
                    unicode = coach.parseUnicode( unicode );

                    data.string += unicode;
                    coach.i--;
                }
                else {
                    // \n \t ...
                    symbol = eval(`"\\${ symbol }"`);
                    data.string += symbol;
                }

                continue;
            }

            if ( symbol == "`" || symbol == "$" ) {
                break;
            }

            data.string += symbol;
        }
    }

    toString() {
        return this.data.string.replace("`", "\\`");
    }
}

module.exports = StringContent;