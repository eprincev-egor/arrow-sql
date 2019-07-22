"use strict";

const {Coach} = require("lang-coach");

class JSQueryCoach extends Coach {
    replaceComments() {
        let coach = this;
        let startIndex = coach.i;
        let newStr = coach.str.split("");

        for (; coach.i < coach.n; coach.i++) {
            let i = coach.i;

            if ( coach.isComment() ) {
                coach.parseComment();

                let length = coach.i - i;
                // safe \n\r
                let spaceStr = coach.str.slice(i, i + length).replace(/[^\n\r]/g, " ");

                newStr.splice.apply(newStr, [i, length].concat( spaceStr.split("") ));
            }
        }

        coach.i = startIndex;
        coach.str = newStr.join("");
    }
}

JSQueryCoach.syntax( require("./syntax/JsNull") );
JSQueryCoach.syntax( require("./syntax/JsUndefined") );
JSQueryCoach.syntax( require("./syntax/JsNaN") );
JSQueryCoach.syntax( require("./syntax/Boolean") );
JSQueryCoach.syntax( require("./syntax/Comment") );
JSQueryCoach.syntax( require("./syntax/JsNumber") );
JSQueryCoach.syntax( require("./syntax/Quotes") );
JSQueryCoach.syntax( require("./syntax/UnaryOperator") );
JSQueryCoach.syntax( require("./syntax/BinaryOperator") );
JSQueryCoach.syntax( require("./syntax/Expression") );
JSQueryCoach.syntax( require("./syntax/JsArray") );
JSQueryCoach.syntax( require("./syntax/ObjectName") );
JSQueryCoach.syntax( require("./syntax/DotOperator") );
JSQueryCoach.syntax( require("./syntax/CallArguments") );
JSQueryCoach.syntax( require("./syntax/SquareBrackets") );
JSQueryCoach.syntax( require("./syntax/JsRegExp") );
JSQueryCoach.syntax( require("./syntax/StringContent") );
JSQueryCoach.syntax( require("./syntax/TemplateString") );
JSQueryCoach.syntax( require("./syntax/Ternary") );
JSQueryCoach.syntax( require("./syntax/ObjectItem") );
JSQueryCoach.syntax( require("./syntax/JsObject") );
JSQueryCoach.syntax( require("./syntax/JsArgument") );
JSQueryCoach.syntax( require("./syntax/JsArguments") );
JSQueryCoach.syntax( require("./syntax/JsFunction") );
JSQueryCoach.syntax( require("./syntax/ArrowFunction") );

module.exports = JSQueryCoach;