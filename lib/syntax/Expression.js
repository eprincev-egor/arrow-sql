"use strict";

const {Syntax} = require("lang-coach");
const BinaryOperator = require("./BinaryOperator");
const UnaryOperator = require("./UnaryOperator");
const Ternary = require("./Ternary");
const ObjectName = require("./ObjectName");
const DotOperator = require("./DotOperator");
const JsNumber = require("./JsNumber");
const Boolean = require("./Boolean");
const Quotes = require("./Quotes");
const JsNull = require("./JsNull");
const CallArguments = require("./CallArguments");

const GLOBAL_VALUES = {
    Math
};

class Expression extends Syntax {
    static structure() {
        return {
            elements: {
                type: [Syntax],
                nullAsEmpty: true
            }
        };
    }

    static parse(coach, data, options = {stopByComma: false}) {
        data.elements = [];

        Expression.startExpression( coach, data, options );
    }

    static startExpression(coach, data, options) {
        // -+!~...
        Expression.parseUnaryOperators( coach, data );
        
        // string or number or variable or same element
        Expression.parseElement( coach, data );

        // binary operators, func call, and props
        Expression.parseAfterElement( coach, data, options );
    }

    static parseAfterElement(coach, data, options) {
        coach.skipSpace();
        
        if ( coach.isDotOperator() ) {
            // obj .
            let dot = coach.parseDotOperator();
            data.elements.push( dot );

            coach.skipSpace();

            // obj . name
            let name = coach.parseObjectName();
            data.elements.push( name );

            // parse binary operators
            Expression.parseAfterElement(coach, data, options);
        }

        else if ( coach.isSquareBrackets() ) {
            let prop = coach.parseSquareBrackets();
            data.elements.push( prop );

            coach.skipSpace();

            Expression.parseAfterElement(coach, data, options);
        }

        else if ( coach.isCallArguments() ) {
            let callArgs = coach.parseCallArguments();
            data.elements.push( callArgs );

            coach.skipSpace();

            Expression.parseAfterElement(coach, data, options);
        }


        // a + b
        if ( coach.isBinaryOperator() ) {
            // 
            let i = coach.i;
            let operator = coach.parseBinaryOperator();

            if ( options.stopByComma ) {
                if ( operator.isComma() ) {
                    coach.i = i;
                    return;
                }
            }

            data.elements.push( operator );

            // parse next unary operators and element
            Expression.startExpression( coach, data, options );
        }
    }

    static parseElement(coach, data) {
        let element;

        coach.skipSpace();

        if ( coach.isJsNull() ) {
            element = coach.parseJsNull();
        }

        else if ( coach.isJsUndefined() ) {
            element = coach.parseJsUndefined();
        }
        
        else if ( coach.isJsNaN() ) {
            element = coach.parseJsNaN();
        }

        else if ( coach.isBoolean() ) {
            element = coach.parseBoolean();
        }

        else if ( coach.isJsNumber() ) {
            element = coach.parseJsNumber();
        }

        else if ( coach.isQuotes() ) {
            element = coach.parseQuotes();
        }

        else if ( coach.isTemplateString() ) {
            element = coach.parseTemplateString();
        }

        else if ( coach.isJsArray() ) {
            element = coach.parseJsArray();
        }

        else if ( coach.isJsRegExp() ) {
            element = coach.parseJsRegExp();
        }

        else if ( coach.isJsObject() ) {
            element = coach.parseJsObject();
        }

        else if ( coach.isObjectName() ) {
            element = coach.parseObjectName();
        }

        else if ( coach.is("(") ) {
            coach.expect("(");
            element = coach.parseExpression();
            coach.expect(")");
        }

        else {
            coach.throwError("expected any expression element");
        }

        coach.skipSpace();
        
        data.elements.push( element );


        // ternary operator
        // condition ? then : else
        if ( coach.is("?") ) {

            let conditionElements = [];
            for (let i = data.elements.length - 1; i >= 0; i--) {

                let prevElem = data.elements[ i ];
                // comma operator has less precedence then ternary
                let isComma = (
                    prevElem instanceof BinaryOperator &&
                    prevElem.isComma()
                );

                if ( isComma ) {
                    break;
                }

                // unshift(), because it reverse cycle
                conditionElements.unshift( prevElem );
                // pop(), for moving element to ternary condition
                data.elements.pop();
            }

            let condition = new Expression({
                elements: conditionElements
            });

            // calling ternary body parsing
            // for filling 'then' and 'else'
            let tmp = {
                then: null,
                else: null
            };
            Ternary.parseAfterCondition(coach, tmp);


            let ternary = new Ternary({
                condition,
                then: tmp.then,
                else: tmp.else
            });

            data.elements.push( ternary );
        }

        coach.skipSpace();
    }

    static parseUnaryOperators(coach, data) {
        coach.skipSpace();
        
        if ( coach.isUnaryOperator() ) {
            // first unary
            const operator = coach.parseUnaryOperator();
            data.elements.push( operator );

            // second unary, ...
            Expression.parseUnaryOperators( coach, data );
        }
    }
    
    static is(coach) {
        return (
            // for stopping parseComma
            !coach.isEnd() &&

            coach.isJsNull() ||
            coach.isBoolean() ||
            coach.isJsNumber() ||
            coach.isQuotes() ||
            coach.isTemplateString() ||
            coach.isJsArray() ||
            coach.isUnaryOperator() ||
            coach.isObjectName() ||
            coach.isJsRegExp() ||
            coach.isJsObject() ||
            coach.is("(")
        );
    }

    readColumnAt(index) {
        let column = [];

        for (let i = index, n = this.data.elements.length; i < n; i++) {
            let element = this.data.elements[i];

            if ( element instanceof DotOperator ) {
                continue;
            }

            if ( !(element instanceof ObjectName) ) {
                break;
            }

            column.push(
                element.get("name")
            );
        }

        return column;
    }

    toSQL({ values, tableName }) {
        let elements = this.data.elements;
        let sql = [];

        for (let i = 0, n = elements.length; i < n; i++) {
            let elem = elements[ i ];

            if ( elem instanceof Expression ) {
                sql.push({
                    bracket: "("
                });

                let subSQL = elem.toSQL({ values, tableName });
                sql.push( ...subSQL );

                sql.push({
                    bracket: ")"
                });
            }

            else if ( elem instanceof JsNumber ) {
                let number = +elem.get("number");

                if ( !isFinite(number) ) {
                    throw new Error("invalid number: " + elem.get("number"));
                }

                sql.push({
                    literal: number
                });
            }

            else if ( elem instanceof Boolean ) {
                sql.push({
                    literal: elem.get("boolean") // true or false
                });
            }

            else if ( elem instanceof JsNull ) {
                sql.push({
                    literal: null
                });
            }

            else if ( elem instanceof Quotes ) {
                sql.push({
                    literal: elem.get("content")
                });
            }

            else if ( elem instanceof UnaryOperator ) {
                const SQL_UNARY_OPERATORS = ["+", "-", "!"];
                let operator = elem.get("unaryOperator");

                if ( !SQL_UNARY_OPERATORS.includes(operator) ) {
                    throw new Error("invalid unary operator: " + operator);
                }

                if ( operator == "!" ) {
                    operator = "not";
                }

                sql.push({
                    operator
                });
            }

            else if ( elem instanceof BinaryOperator ) {
                const SQL_BINARY_OPERATORS = [
                    "+", 
                    "-", 
                    "*", 
                    "/",
                    "==",
                    "===",
                    "!=",
                    "!==",
                    ">",
                    "<",
                    ">=",
                    "<=",
                    "%",
                    "||",
                    "&&",
                    "in",
                    ","
                ];
                let jsOperator = elem.get("binaryOperator");
                let sqlOperator = jsOperator;

                if ( !SQL_BINARY_OPERATORS.includes(jsOperator) ) {
                    throw new Error("invalid binary operator: " + jsOperator);
                }

                if ( jsOperator == "!=" || jsOperator == "!==" ) {
                    sqlOperator = "<>";
                }
                if ( jsOperator == "==" || jsOperator == "===" ) {
                    sqlOperator = "=";
                }
                if ( jsOperator == "||" ) {
                    sqlOperator = "or";
                }
                if ( jsOperator == "&&" ) {
                    sqlOperator = "and";
                }


                let nextElem = elements[ i + 1 ];

                let isNullCompare = (
                    (
                        sqlOperator == "=" ||
                        sqlOperator == "<>"
                    ) &&
                    nextElem instanceof JsNull
                );

                if ( jsOperator == "in" ) {
                    i++;

                    if ( !(nextElem instanceof Expression) ) {
                        throw new Error("after operator in, should be expression");
                    }

                    sql.push({
                        operator: "in"
                    });
                    sql.push({
                        bracket: "("
                    });

                    let subSQL = nextElem.toSQL({ values, tableName });
                    sql.push( ...subSQL );

                    sql.push({
                        bracket: ")"
                    });
                }
                // is null or is not null
                else if ( isNullCompare ) {
                    i++;

                    if ( sqlOperator == "=" ) {
                        sql.push({
                            operator: "is null"
                        });
                    }
                    else {
                        sql.push({
                            operator: "is not null"
                        });
                    }
                }
                else {
                    sql.push({
                        operator: sqlOperator
                    });
                }
            }

            else if ( elem instanceof ObjectName ) {
                let name = elem.get("name");
                
                let column = [];
                for (; i < n; i++) {
                    let nextElem = elements[i];
        
                    if ( nextElem instanceof DotOperator ) {
                        continue;
                    }
        
                    if ( !(nextElem instanceof ObjectName) ) {
                        // 'i' will incremented before next iteration of base cycle
                        i--; 
                        break;
                    }
        
                    column.push(
                        nextElem.get("name")
                    );
                }

                

                // is column
                if ( name == tableName ) {
                    sql.push({
                        column
                    });
                }

                // is variable
                else if ( name in values || name in GLOBAL_VALUES ) {
                    // execute expression
                    // some.object.property

                    let value;
                    if ( name in values ) {
                        value = values[ name ];
                    }
                    else {
                        value = GLOBAL_VALUES[ name ];
                    }

                    for (let i = 1, n = column.length; i < n; i++) {
                        name = column[ i ];
                        value = value[ name ];
                    }

                    sql.push({
                        literal: value
                    });
                }
                else {
                    throw new Error("unknown variable: " + name);
                }
            }

            else if ( elem instanceof CallArguments ) {
                let func = sql.pop().literal;
                let sqlFunc;
                
                switch ( func ) {
                    case Math.round:
                        sqlFunc = "round";
                        break;
                    case Math.ceil:
                        sqlFunc = "ceil";
                        break;
                    case Math.floor:
                        sqlFunc = "floor";
                        break;
                    case Math.max:
                        sqlFunc = "greatest";
                        break;
                    case Math.min:
                        sqlFunc = "least";
                        break;
                }

                if ( !sqlFunc ) {
                    let j = i - 1;
                    let prevElem = elements[ j ];
                    let funcName = [];

                    while ( prevElem instanceof ObjectName ) {
                        funcName.unshift( prevElem.toString() );
                        j--;
                        j--; // skip dot
                        prevElem = elements[ j ];
                    }

                    if ( funcName.length ) {
                        funcName = funcName.join(".");
                        throw new Error("unknown function: " + funcName);
                    }
                    else {
                        throw new Error("unknown function");
                    }
                }

                sql.push({
                    call: sqlFunc + "("
                });
                
                // parse arguments inside call:
                // Math.round( some... )
                elem.get("arguments").forEach((subExpression, i) => {

                    if ( i > 0 ) {
                        sql.push({
                            operator: ","
                        });
                    }

                    let subSql = subExpression.toSQL({ 
                        values, 
                        tableName
                    });

                    sql.push(...subSql);
                });

                sql.push({
                    call: ")"
                });
            }

            else {
                throw new Error("invalid expression element: " + elem);
            }
        }

        return sql;
    }

    toString() {
        let out = "";

        this.data.elements.forEach((elem, i) => {
            if ( i > 0 ) {
                out += " ";
            }

            if ( elem instanceof Expression ) {
                out += "( ";
                out += elem.toString();
                out += " )";
            } else {
                out += elem.toString();
            }
        });

        return out;
    }
}

module.exports = Expression;
