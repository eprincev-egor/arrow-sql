"use strict";

const Expression = require("../../lib/syntax/Expression");
const testSyntax = require("../testSyntax");

describe("Expression", () => {

    testSyntax(Expression, {
        str: "null",
        result: {
            elements: [{
                null: true
            }]
        }
    });

    testSyntax(Expression, {
        str: "undefined",
        result: {
            elements: [{
                undefined: true
            }]
        }
    });

    testSyntax(Expression, {
        str: "NaN",
        result: {
            elements: [{
                NaN: true
            }]
        }
    });

    testSyntax(Expression, {
        str: "true",
        result: {
            elements: [{
                boolean: true
            }]
        }
    });

    testSyntax(Expression, {
        str: "1",
        result: {
            elements: [{
                number: "1"
            }]
        }
    });

    testSyntax(Expression, {
        str: "'string'",
        result: {
            elements: [{
                quotes: "'",
                content: "string"
            }]
        }
    });

    testSyntax(Expression, {
        str: "-1",
        result: {
            elements: [
                {unaryOperator: "-"},
                {number: "1"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "-+1",
        result: {
            elements: [
                {unaryOperator: "-"},
                {unaryOperator: "+"},
                {number: "1"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "--1",
        result: {
            elements: [
                {unaryOperator: "-"},
                {unaryOperator: "-"},
                {number: "1"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "1+2",
        result: {
            elements: [
                {number: "1"},
                {binaryOperator: "+"},
                {number: "2"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "(1-1)*(2+2)",
        result: {
            elements: [
                {
                    elements: [
                        {number: "1"},
                        {binaryOperator: "-"},
                        {number: "1"}
                    ]
                },
                {binaryOperator: "*"},
                {
                    elements: [
                        {number: "2"},
                        {binaryOperator: "+"},
                        {number: "2"}
                    ]
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "1+-2",
        result: {
            elements: [
                {number: "1"},
                {binaryOperator: "+"},
                {unaryOperator: "-"},
                {number: "2"}
            ]
        }
    });





    testSyntax(Expression, {
        str: "1 + 1",
        result: {
            elements: [
                {number: "1"},
                {binaryOperator: "+"},
                {number: "1"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "(1+1)",
        result: {
            elements: [
                {
                    elements: [
                        {number: "1"},
                        {binaryOperator: "+"},
                        {number: "1"}
                    ]
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "true-false*null+1/'test'",
        result: {
            elements: [
                {boolean: true},
                {binaryOperator: "-"},
                {boolean: false},
                {binaryOperator: "*"},
                {null: true},
                {binaryOperator: "+"},
                {number: "1"},
                {binaryOperator: "/"},
                {content: "test", quotes: "'"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "(-1+2.1)*''-(('test')+8)",
        result: {
            elements: [
                {
                    elements: [
                        {unaryOperator: "-"},
                        {number: "1"},
                        {binaryOperator: "+"},
                        {number: "2.1"}
                    ]
                },
                {binaryOperator: "*"},
                {content: "", quotes: "'"},
                {binaryOperator: "-"},
                {
                    elements: [
                        {elements: [
                            {content: "test", quotes: "'"}
                        ]},
                        {binaryOperator: "+"},
                        {number: "8"}
                    ]
                }
            ]
        }
    });


    testSyntax(Expression, {
        str: "[1, true]",
        result: {
            elements: [{
                array: [
                    {elements: [ {number: "1"} ]},
                    {elements: [ {boolean: true} ]}
                ]
            }]
        }
    });

    testSyntax(Expression, {
        str: "Order.Client.name",
        result: {
            elements: [
                {name: "Order"},
                {dot: true},
                {name: "Client"},
                {dot: true},
                {name: "name"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "Order.profit > 100",
        result: {
            elements: [
                {name: "Order"},
                {dot: true},
                {name: "profit"},
                {binaryOperator: ">"},
                {number: "100"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "(Order.profit) > 100",
        result: {
            elements: [
                {elements: [
                    {name: "Order"},
                    {dot: true},
                    {name: "profit"}
                ]},
                {binaryOperator: ">"},
                {number: "100"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "(Order).profit > 100",
        result: {
            elements: [
                {elements: [
                    {name: "Order"}
                ]},
                {dot: true},
                {name: "profit"},
                {binaryOperator: ">"},
                {number: "100"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "profit == some",
        result: {
            elements: [
                {name: "profit"},
                {binaryOperator: "=="},
                {name: "some"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "'string'.length > 100",
        result: {
            elements: [
                {content: "string", quotes: "'"},
                {dot: true},
                {name: "length"},
                {binaryOperator: ">"},
                {number: "100"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "Order.typeId in (1, 2, 3)",
        result: {
            elements: [
                {name: "Order"},
                {dot: true},
                {name: "typeId"},
                {binaryOperator: "in"},
                {elements: [
                    {number: "1"},
                    {binaryOperator: ","},
                    {number: "2"},
                    {binaryOperator: ","},
                    {number: "3"}
                ]}
            ]
        }
    });

    testSyntax(Expression, {
        str: "[[1], [2], 3]",
        result: {
            elements: [
                {array: [
                    {elements: [ {array: [
                        {elements: [ {number: "1"} ]}
                    ]} ]},
                    {elements: [ {array: [
                        {elements: [ {number: "2"} ]}
                    ]} ]},
                    {elements: [ {number: "3"} ]}
                ]}
            ]
        }
    });

    testSyntax(Expression, {
        str: "x == [1 + 1, Order.id, (2,3)]",
        result: {
            elements: [
                {name: "x"},
                {binaryOperator: "=="},
                {array: [
                    {elements: [
                        {number: "1"},
                        {binaryOperator: "+"},
                        {number: "1"}
                    ]},
                    {elements: [
                        {name: "Order"},
                        {dot: true},
                        {name: "id"}
                    ]},
                    {elements: [
                        {elements: [
                            {number: "2"},
                            {binaryOperator: ","},
                            {number: "3"}
                        ]}
                    ]}
                ]}
            ]
        }
    });


    testSyntax(Expression, {
        str: "Date.now()",
        result: {
            elements: [
                {name: "Date"},
                {dot: true},
                {name: "now"},
                {arguments: []}
            ]
        }
    });

    testSyntax(Expression, {
        str: "some(1)* 3",
        result: {
            elements: [
                {name: "some"},
                {arguments: [
                    {elements: [ {number: "1"} ]}
                ]},
                {binaryOperator: "*"},
                {number: "3"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "(Math.round)()",
        result: {
            elements: [
                {elements: [
                    {name: "Math"},
                    {dot: true},
                    {name: "round"}
                ]},
                {arguments: []}
            ]
        }
    });

    testSyntax(Expression, {
        str: "some(1)(2)",
        result: {
            elements: [
                {name: "some"},
                {arguments: [
                    {elements: [ {number: "1"} ]}
                ]},
                {arguments: [
                    {elements: [ {number: "2"} ]}
                ]}
            ]
        }
    });

    testSyntax(Expression, {
        str: "some(1).name",
        result: {
            elements: [
                {name: "some"},
                {arguments: [
                    {elements: [ {number: "1"} ]}
                ]},
                {dot: true},
                {name: "name"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "some(1).name()",
        result: {
            elements: [
                {name: "some"},
                {arguments: [
                    {elements: [ {number: "1"} ]}
                ]},
                {dot: true},
                {name: "name"},
                {arguments: []}
            ]
        }
    });
    
    testSyntax(Expression, {
        str: "some.1",
        error: /SyntaxError/
    });

    testSyntax(Expression, {
        str: "some.true",
        result: {
            elements: [
                {name: "some"},
                {dot: true},
                {name: "true"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "some.false",
        result: {
            elements: [
                {name: "some"},
                {dot: true},
                {name: "false"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "some.null",
        result: {
            elements: [
                {name: "some"},
                {dot: true},
                {name: "null"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "some['prop1'].prop2",
        result: {
            elements: [
                {name: "some"},
                {prop: {elements: [
                    {content: "prop1", quotes: "'"}
                ]}},
                {dot: true},
                {name: "prop2"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "some['prop1']().prop2()",
        result: {
            elements: [
                {name: "some"},
                {prop: {elements: [
                    {content: "prop1", quotes: "'"}
                ]}},
                {arguments: []},
                {dot: true},
                {name: "prop2"},
                {arguments: []}
            ]
        }
    });

    testSyntax(Expression, {
        str: "/ilike/i.test( Order.name )",
        result: {
            elements: [
                {regExp: "ilike", flags: "i"},
                {dot: true},
                {name: "test"},
                {arguments: [
                    {elements: [
                        {name: "Order"},
                        {dot: true},
                        {name: "name"}
                    ]}
                ]}
            ]
        }
    });

    testSyntax(Expression, {
        str: "Order[`${ key }`]",
        result: {
            elements: [
                {name: "Order"},
                {prop: {elements: [
                    {template: [
                        {elements: [
                            {name: "key"}
                        ]}
                    ]}
                ]}}
            ]
        }
    });

    testSyntax(Expression, {
        str: "`hello` + `world`",
        result: {
            elements: [
                {template: [
                    {string: "hello"}
                ]},
                {binaryOperator: "+"},
                {template: [
                    {string: "world"}
                ]}
            ]
        }
    });

    testSyntax(Expression, {
        str: "1 > x ? 10 : 30",
        result: {
            elements: [
                {
                    condition: {elements: [
                        {number: "1"},
                        {binaryOperator: ">"},
                        {name: "x"}
                    ]},
                    then: {elements: [
                        {number: "10"}
                    ]},
                    else: {elements: [
                        {number: "30"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "true ? 1 : 0",
        result: {
            elements: [
                {
                    condition: {elements: [
                        {boolean: true}
                    ]},
                    then: {elements: [
                        {number: "1"}
                    ]},
                    else: {elements: [
                        {number: "0"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "a || b ? x && y : c || z",
        result: {
            elements: [
                {
                    condition: {elements: [
                        {name: "a"},
                        {binaryOperator: "||"},
                        {name: "b"}
                    ]},
                    then: {elements: [
                        {name: "x"},
                        {binaryOperator: "&&"},
                        {name: "y"}
                    ]},
                    else: {elements: [
                        {name: "c"},
                        {binaryOperator: "||"},
                        {name: "z"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "[a + b > 100 ? 1 : 0, y % 2 == 0 ? true : false ]",
        result: {
            elements: [
                {array: [
                    {elements: [ {
                        condition: {elements: [
                            {name: "a"},
                            {binaryOperator: "+"},
                            {name: "b"},
                            {binaryOperator: ">"},
                            {number: "100"}
                        ]},
                        then: {elements: [
                            {number: "1"}
                        ]},
                        else: {elements: [
                            {number: "0"}
                        ]}
                    } ]},
                    {elements: [ {
                        condition: {elements: [
                            {name: "y"},
                            {binaryOperator: "%"},
                            {number: "2"},
                            {binaryOperator: "=="},
                            {number: "0"}
                        ]},
                        then: {elements: [
                            {boolean: true}
                        ]},
                        else: {elements: [
                            {boolean: false}
                        ]}
                    } ]}
                ]}
            ]
        }
    });

    testSyntax(Expression, {
        str: "a ? b ? c : d : e",
        result: {
            elements: [
                {
                    condition: {elements: [
                        {name: "a"}
                    ]},
                    then: {elements: [
                        {
                            condition: {elements: [
                                {name: "b"}
                            ]},
                            then: {elements: [
                                {name: "c"}
                            ]},
                            else: {elements: [
                                {name: "d"}
                            ]}
                        }
                    ]},
                    else: {elements: [
                        {name: "e"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "[100, (20, a ? b : c)]",
        result: {
            elements: [
                {
                    array: [
                        {elements: [ {number: "100"} ]},
                        {elements: [
                            {elements: [
                                {number: "20"},
                                {binaryOperator: ","},
                                {
                                    condition: {elements: [
                                        {name: "a"}
                                    ]},
                                    then: {elements: [
                                        {name: "b"}
                                    ]},
                                    else: {elements: [
                                        {name: "c"}
                                    ]}
                                }
                            ]}
                        ]}
                    ]
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "[1, ...arr]",
        result: {
            elements: [{
                array: [
                    {elements: [ {number: "1"} ]},
                    {elements: [
                        {unaryOperator: "..."},
                        {name: "arr"}
                    ]}
                ]
            }]
        }
    });

    testSyntax(Expression, {
        str: "{1:2}[1]+({},{}).t",
        result: {
            elements: [
                {object: [
                    {
                        key: {number: "1"},
                        value: {elements: [
                            {number: "2"}
                        ]}
                    }
                ]},
                {prop: {elements: [
                    {number: "1"}
                ]}},
                {binaryOperator: "+"},
                {elements: [
                    {object: []},
                    {binaryOperator: ","},
                    {object: []}
                ]},
                {dot: true},
                {name: "t"}
            ]
        }
    });

});
