"use strict";

const {Syntax} = require("lang-coach");

class Comment extends Syntax {
    static structure() {
        return {
            isLine: {
                type: "boolean",
                default: false
            },
            isMulti: {
                type: "boolean",
                default: false
            },
            content: "string"
        };
    }

    static parse(coach, data) {
        let content = "";
        
        if ( coach.is("//") ) {
            coach.expect("//");
            
            data.isLine = true;
            
            for (; coach.i < coach.n; coach.i++) {
                let symbol = coach.str[ coach.i ];
                
                if ( /[\n\r]/.test(symbol) ) {
                    break;
                }
                
                content += symbol;
            }
        } else {
            coach.expect("/*");
            
            data.isMulti = true;
            
            for (; coach.i < coach.n; coach.i++) {
                let symbol = coach.str[ coach.i ];
                
                if ( symbol == "*" && coach.str[ coach.i + 1 ] == "/" ) {
                    coach.i += 2;
                    break;
                }
                
                content += symbol;
            }
        }
        
        data.content = content;
    }
    
    static is(coach, str) {
        return (
            str[0] == "/" && str[1] == "/" ||
            str[0] == "/" && str[1] == "*"
        );
    }
    
    toString() {
        if ( this.data.isMulti ) {
            return "/*" + this.data.content + "*/";
        }
        else {
            return "//" + this.data.content;
        }
    }
}

module.exports = Comment;
