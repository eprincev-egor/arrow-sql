"use strict";

const JSQueryCoach = require("../lib/JSQueryCoach");
const assert = require("assert");

function testSyntax(SomeSyntax, test) {
    if ( !test.str ) {
        throw new Error("test.str required");
    }

    if ( !test.result && !test.error ) {
        throw new Error("test.result or test.error required");
    }

    it(test.str, () => {

        let str = test.str;
        let parseFuncName = "parse" + SomeSyntax.name;
        let isFuncName = "is" + SomeSyntax.name;

        if ( test.error ) {
            let regExp = test.error;
            
            assert.throws(
                () => {
                    let coach = new JSQueryCoach(str);
                    coach[ parseFuncName ]();
                },
                err =>
                    regExp.test( err )
            );
        }

        else {
            let coach = new JSQueryCoach(str);
            let result;

            // test static method is
            result = coach[ isFuncName ](test.options);
            assert.ok( result );


            // test static method parse
            result = coach[ parseFuncName ](test.options);
            assert.deepEqual(test.result, result.toJSON());


            // test toString method
            let clone = result.clone();
            let cloneString = clone.toString();
            let cloneCoach = new JSQueryCoach( cloneString );
            
            let cloneResult = cloneCoach[ parseFuncName ](test.options);
            assert.deepEqual(test.result, cloneResult.toJSON());
        }
    });
}

module.exports = testSyntax;