"use strict";

const JSQueryCoach = require("./JSQueryCoach");

function js2sql(functionOrString, variables) {
    let jsCode;

    if ( typeof functionOrString == "string" ) {
        jsCode = functionOrString;
    }
    else if ( typeof functionOrString == "function" ) {
        jsCode = functionOrString.toString();
    }
    else {
        throw new Error("first argument should be function or string");
    }

    // init parser core
    let coach = new JSQueryCoach(jsCode);
    
    // replace any comments to spaces
    coach.replaceComments();
    // skip first spaces for correct detection function syntax
    coach.skipSpace();


    // parse function syntax
    let funcSyntax;
    if ( coach.isJsFunction() ) {
        // function(Table) {return expression}
        funcSyntax = coach.parseJsFunction();
    }
    else {
        // (Table) => expression
        funcSyntax = coach.parseArrowFunction();
    }

    // first argument is table name
    let tableName = funcSyntax.getTableName();
    // js expression for converting to sql
    let expression = funcSyntax.get("return");

    
    // convert syntax tree to array of object:
    // [{literal: 1}, {operator: "+"}, {literal: 2}]
    return expression.toSQL({
        tableName,
        values: variables
    });
}

module.exports = js2sql;