"use strict";
 
const {Syntax} = require("lang-coach");

class Quotes extends Syntax {
    static structure() {
        return {
            quotes: {
                type: "string",
                enum: ["\"", "'"]
            },
            content: "string"
        };
    }

    static parse(coach, data) {
        data.content = "";
        data.quotes = coach.expect(/["']/);

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

                    data.content += unicode;
                    coach.i--;
                }
                else {
                    // \n \t ...
                    symbol = eval(`"\\${ symbol }"`);
                    data.content += symbol;
                }

                continue;
            }

            if ( symbol == data.quotes ) {
                break;
            }

            data.content += symbol;
        }

        coach.expect( data.quotes );
    }

    static is(coach) {
        return coach.is(/["']/);
    }

    toString() {
        let quotes = this.data.quotes;
        let content = this.data.content;
        // escape double or single quotes
        content = content.replace(new RegExp(quotes, "g"), "\\" + quotes);

        return quotes + content + quotes;
    }
}

module.exports = Quotes;