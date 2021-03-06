"use strict";

const JSQueryCoach = require("../../lib/JSQueryCoach");
const assert = require("assert");

function testExpression2sql({expression, sql, error, variables, tableName}) {
    
    if ( error ) {
        // RegExp
        let messagePattern = error;

        assert.throws(
            () => {
                let coach = new JSQueryCoach(expression);
                expression = coach.parseExpression();
            
                expression.toSQL({
                    tableName,
                    values: variables || {}
                });
            },
            resultError =>
                messagePattern.test( resultError )
        );
    }
    else {
        let coach = new JSQueryCoach(expression);
        expression = coach.parseExpression();
    
        let resultSql = expression.toSQL({
            tableName,
            values: variables || {}
        });
    
        assert.deepStrictEqual(resultSql, sql);
    }
}

describe("Expression", () => {

    it("boolean literal", () => {

        testExpression2sql({
            expression: "true",
            sql: [{ literal: true }]
        });

        testExpression2sql({
            expression: "false",
            sql: [{ literal: false }]
        });

    });

    it("number literal", () => {
        testExpression2sql({
            expression: "1",
            sql: [{ literal: 1 }]
        });
    
        testExpression2sql({
            expression: "2",
            sql: [{ literal: 2 }]
        });
    
        testExpression2sql({
            expression: "100.50",
            sql: [{ literal: 100.5 }]
        });
    });

    it("string literal", () => {
        testExpression2sql({
            expression: "''",
            sql: [{ literal: "" }]
        });
    
        testExpression2sql({
            expression: "'hello'",
            sql: [{ literal: "hello" }]
        });
    
        testExpression2sql({
            expression: "\"world\"",
            sql: [{ literal: "world" }]
        });
    });

    it("null literal and null features", () => {
        testExpression2sql({
            expression: "null",
            sql: [{ literal: null }]
        });

        testExpression2sql({
            tableName: "Order",
            expression: "Order.clientId == null",
            sql: [
                { column: ["Order", "clientId"] },
                { operator: "is null" }
            ]
        });

        testExpression2sql({
            tableName: "Order",
            expression: "Order.clientId === null",
            sql: [
                { column: ["Order", "clientId"] },
                { operator: "is null" }
            ]
        });

        testExpression2sql({
            tableName: "Order",
            expression: "Order.clientId != null",
            sql: [
                { column: ["Order", "clientId"] },
                { operator: "is not null" }
            ]
        });

        testExpression2sql({
            tableName: "Order",
            expression: "Order.clientId !== null",
            sql: [
                { column: ["Order", "clientId"] },
                { operator: "is not null" }
            ]
        });
    });

    it("unary operators", () => {
        testExpression2sql({
            expression: "+1",
            sql: [
                { operator: "+" },
                { literal: 1 }
            ]
        });

        testExpression2sql({
            expression: "-2",
            sql: [
                { operator: "-" },
                { literal: 2 }
            ]
        });

        testExpression2sql({
            expression: "!true",
            sql: [
                { operator: "not" },
                { literal: true }
            ]
        });

    });

    it("binary operators", () => {
        testExpression2sql({
            expression: "1 + 2",
            sql: [
                { literal: 1 },
                { operator: "+" },
                { literal: 2 }
            ]
        });

        testExpression2sql({
            expression: "10 - 1",
            sql: [
                { literal: 10 },
                { operator: "-" },
                { literal: 1 }
            ]
        });

        testExpression2sql({
            expression: "10 * 2",
            sql: [
                { literal: 10 },
                { operator: "*" },
                { literal: 2 }
            ]
        });

        testExpression2sql({
            expression: "10 / 2",
            sql: [
                { literal: 10 },
                { operator: "/" },
                { literal: 2 }
            ]
        });

        testExpression2sql({
            expression: "1 == 1",
            sql: [
                { literal: 1 },
                { operator: "=" },
                { literal: 1 }
            ]
        });

        testExpression2sql({
            expression: "2 === 2",
            sql: [
                { literal: 2 },
                { operator: "=" },
                { literal: 2 }
            ]
        });

        testExpression2sql({
            expression: "1 != 2",
            sql: [
                { literal: 1 },
                { operator: "<>" },
                { literal: 2 }
            ]
        });

        testExpression2sql({
            expression: "1 !== 2",
            sql: [
                { literal: 1 },
                { operator: "<>" },
                { literal: 2 }
            ]
        });

        testExpression2sql({
            expression: "1 > 2",
            sql: [
                { literal: 1 },
                { operator: ">" },
                { literal: 2 }
            ]
        });

        testExpression2sql({
            expression: "1 < 2",
            sql: [
                { literal: 1 },
                { operator: "<" },
                { literal: 2 }
            ]
        });

        testExpression2sql({
            expression: "1 >= 2",
            sql: [
                { literal: 1 },
                { operator: ">=" },
                { literal: 2 }
            ]
        });

        testExpression2sql({
            expression: "1 <= 2",
            sql: [
                { literal: 1 },
                { operator: "<=" },
                { literal: 2 }
            ]
        });

        testExpression2sql({
            expression: "1 % 2",
            sql: [
                { literal: 1 },
                { operator: "%" },
                { literal: 2 }
            ]
        });

        testExpression2sql({
            expression: "true || false",
            sql: [
                { literal: true },
                { operator: "or" },
                { literal: false }
            ]
        });

        testExpression2sql({
            expression: "true && false",
            sql: [
                { literal: true },
                { operator: "and" },
                { literal: false }
            ]
        });

    });

    it("columns and variables", () => {

        testExpression2sql({
            expression: "a < 3",
            sql: [
                { literal: 1 },
                { operator: "<" },
                { literal: 3 }
            ],
            variables: {
                a: 1
            }
        });

        testExpression2sql({
            expression: "name == 'test'",
            sql: [
                { literal: "some" },
                { operator: "=" },
                { literal: "test" }
            ],
            variables: {
                name: "some"
            }
        });

        testExpression2sql({
            tableName: "Order",
            expression: "Order.id > 100",
            sql: [
                { column: ["Order", "id"] },
                { operator: ">" },
                { literal: 100 }
            ]
        });

        testExpression2sql({
            tableName: "Order",
            expression: "Order.Client.id > someVar",
            variables: {
                someVar: 101
            },
            sql: [
                { column: ["Order", "Client", "id"] },
                { operator: ">" },
                { literal: 101 }
            ]
        });

    });

    it("execute js code at near variables", () => {

        testExpression2sql({
            tableName: "Order",
            expression: "Order.Client.id == clientModel.id",
            variables: {
                clientModel: {
                    id: 102
                }
            },
            sql: [
                { column: ["Order", "Client", "id"] },
                { operator: "=" },
                { literal: 102 }
            ]
        });

        testExpression2sql({
            tableName: "Order",
            expression: "first.value + second.value",
            variables: {
                first: {
                    value: 1
                },
                second: {
                    value: 2
                }
            },
            sql: [
                { literal: 1 },
                { operator: "+" },
                { literal: 2 }
            ]
        });

        testExpression2sql({
            tableName: "Order",
            expression: "myVar.undef.prop",
            variables: {
                myVar: {}
            },
            error: /Cannot read property 'prop' of undefined/
        });

    });

    it("sub expression", () => {
        testExpression2sql({
            expression: "(1 + 2) * (2 - 3)",
            sql: [
                { bracket: "(" },
                { literal: 1 },
                { operator: "+" },
                { literal: 2 },
                { bracket: ")" },
                { operator: "*" },
                { bracket: "(" },
                { literal: 2 },
                { operator: "-" },
                { literal: 3 },
                { bracket: ")" }
            ]
        });

        testExpression2sql({
            expression: "(a + 2) * 1",
            variables: {
                a: 3
            },
            sql: [
                { bracket: "(" },
                { literal: 3 },
                { operator: "+" },
                { literal: 2 },
                { bracket: ")" },
                { operator: "*" },
                { literal: 1 }
            ]
        });

        testExpression2sql({
            expression: "(Order.profit * b) * 1",
            tableName: "Order",
            variables: {
                b: 3
            },
            sql: [
                { bracket: "(" },
                { column: ["Order", "profit"] },
                { operator: "*" },
                { literal: 3 },
                { bracket: ")" },
                { operator: "*" },
                { literal: 1 }
            ]
        });
    });
    
    it("expression `in` values", () => {

        testExpression2sql({
            tableName: "Order",
            expression: "Order.typeId in (1, 2, 3)",
            sql: [
                { column: ["Order", "typeId"] },
                { operator: "in" },
                { bracket: "(" },
                { literal: 1 },
                { operator: "," },
                { literal: 2 },
                { operator: "," },
                { literal: 3 },
                { bracket: ")" }
            ]
        });

        testExpression2sql({
            tableName: "Order",
            expression: "Order.typeId in (1, 9 * 2) || Order.typeId == x",
            variables: {
                x: 3
            },
            sql: [
                { column: ["Order", "typeId"] },
                { operator: "in" },
                { bracket: "(" },
                { literal: 1 },
                { operator: "," },
                { literal: 9 },
                { operator: "*" },
                { literal: 2 },
                { bracket: ")" },
                { operator: "or" },
                { column: ["Order", "typeId"] },
                { operator: "=" },
                { literal: 3 }
            ]
        });

    });

    it("call Math functions", () => {

        // Math.round
        testExpression2sql({
            tableName: "Order",
            expression: "Math.round( 1.5 )",
            variables: {
            },
            sql: [
                { call: "round(" },
                { literal: 1.5 },
                { call: ")" }
            ]
        });

        // Math.ceil
        testExpression2sql({
            tableName: "Order",
            expression: "Math.ceil( 1.5 )",
            variables: {
            },
            sql: [
                { call: "ceil(" },
                { literal: 1.5 },
                { call: ")" }
            ]
        });

        // Math.floor
        testExpression2sql({
            tableName: "Order",
            expression: "Math.floor( 1.5 )",
            variables: {
            },
            sql: [
                { call: "floor(" },
                { literal: 1.5 },
                { call: ")" }
            ]
        });

        // Math.max
        testExpression2sql({
            tableName: "Order",
            expression: "Math.max( Order.profit, 100 )",
            variables: {
            },
            sql: [
                { call: "greatest(" },
                { column: ["Order", "profit"] },
                { operator: "," },
                { literal: 100 },
                { call: ")" }
            ]
        });

        // Math.min
        testExpression2sql({
            tableName: "Order",
            expression: "Math.min( Order.profit, 1000 )",
            variables: {
            },
            sql: [
                { call: "least(" },
                { column: ["Order", "profit"] },
                { operator: "," },
                { literal: 1000 },
                { call: ")" }
            ]
        });

    });

    
});