/**
 * Created by Jomaras.
 * Date: 27.03.12.@07:47
 */
var testData = [];

/** 0 **
 *  function foo(a, b)
 *  {
 *    a = b;
 *  }
 */
testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":4,"column":1},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":9},"end":{"line":4,"column":1},"source":null},"type":"FunctionDeclaration","id":{"loc":null,"type":"Identifier","name":"foo"},"params":[{"loc":{"start":{"line":1,"column":13},"end":{"line":1,"column":14},"source":null},"type":"Identifier","name":"a"},{"loc":{"start":{"line":1,"column":16},"end":{"line":1,"column":17},"source":null},"type":"Identifier","name":"b"}],"body":{"loc":{"start":{"line":2,"column":0},"end":{"line":3,"column":7},"source":null},"type":"BlockStatement","body":[{"loc":{"start":{"line":3,"column":1},"end":{"line":3,"column":6},"source":null},"type":"ExpressionStatement","expression":{"loc":{"start":{"line":3,"column":1},"end":{"line":3,"column":6},"source":null},"type":"AssignmentExpression","operator":"=","left":{"loc":{"start":{"line":3,"column":1},"end":{"line":3,"column":2},"source":null},"type":"Identifier","name":"a"},"right":{"loc":{"start":{"line":3,"column":5},"end":{"line":3,"column":6},"source":null},"type":"Identifier","name":"b"}}}]},"generator":false,"expression":false}]});

/** 1 **
 * if (a == b)
 * {
 *    c = b;
 * }
 * else if(c == b)
 * {
 *   c = a;
 * }
 * else
 * {
 *   c = 0;
 * }
 */
testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":12,"column":1},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":0},"end":{"line":11,"column":8},"source":null},"type":"IfStatement","test":{"loc":{"start":{"line":1,"column":3},"end":{"line":1,"column":9},"source":null},"type":"BinaryExpression","operator":"==","left":{"loc":{"start":{"line":1,"column":3},"end":{"line":1,"column":4},"source":null},"type":"Identifier","name":"a"},"right":{"loc":{"start":{"line":1,"column":8},"end":{"line":1,"column":9},"source":null},"type":"Identifier","name":"b"}},"consequent":{"loc":{"start":{"line":2,"column":0},"end":{"line":3,"column":8},"source":null},"type":"BlockStatement","body":[{"loc":{"start":{"line":3,"column":2},"end":{"line":3,"column":7},"source":null},"type":"ExpressionStatement","expression":{"loc":{"start":{"line":3,"column":2},"end":{"line":3,"column":7},"source":null},"type":"AssignmentExpression","operator":"=","left":{"loc":{"start":{"line":3,"column":2},"end":{"line":3,"column":3},"source":null},"type":"Identifier","name":"c"},"right":{"loc":{"start":{"line":3,"column":6},"end":{"line":3,"column":7},"source":null},"type":"Identifier","name":"b"}}}]},"alternate":{"loc":{"start":{"line":5,"column":5},"end":{"line":11,"column":8},"source":null},"type":"IfStatement","test":{"loc":{"start":{"line":5,"column":8},"end":{"line":5,"column":14},"source":null},"type":"BinaryExpression","operator":"==","left":{"loc":{"start":{"line":5,"column":8},"end":{"line":5,"column":9},"source":null},"type":"Identifier","name":"c"},"right":{"loc":{"start":{"line":5,"column":13},"end":{"line":5,"column":14},"source":null},"type":"Identifier","name":"b"}},"consequent":{"loc":{"start":{"line":6,"column":0},"end":{"line":7,"column":8},"source":null},"type":"BlockStatement","body":[{"loc":{"start":{"line":7,"column":2},"end":{"line":7,"column":7},"source":null},"type":"ExpressionStatement","expression":{"loc":{"start":{"line":7,"column":2},"end":{"line":7,"column":7},"source":null},"type":"AssignmentExpression","operator":"=","left":{"loc":{"start":{"line":7,"column":2},"end":{"line":7,"column":3},"source":null},"type":"Identifier","name":"c"},"right":{"loc":{"start":{"line":7,"column":6},"end":{"line":7,"column":7},"source":null},"type":"Identifier","name":"a"}}}]},"alternate":{"loc":{"start":{"line":10,"column":0},"end":{"line":11,"column":8},"source":null},"type":"BlockStatement","body":[{"loc":{"start":{"line":11,"column":2},"end":{"line":11,"column":7},"source":null},"type":"ExpressionStatement","expression":{"loc":{"start":{"line":11,"column":2},"end":{"line":11,"column":7},"source":null},"type":"AssignmentExpression","operator":"=","left":{"loc":{"start":{"line":11,"column":2},"end":{"line":11,"column":3},"source":null},"type":"Identifier","name":"c"},"right":{"loc":{"start":{"line":11,"column":6},"end":{"line":11,"column":7},"source":null},"type":"Literal","value":0}}}]}}}]});

/** 2 **
 *  a = 2;
 */
testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":6},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":5},"source":null},"type":"ExpressionStatement","expression":{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":5},"source":null},"type":"AssignmentExpression","operator":"=","left":{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":1},"source":null},"type":"Identifier","name":"a"},"right":{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":5},"source":null},"type":"Literal","value":1}}}]});

/** 3 **
 * a = b
 */
testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":6},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":5},"source":null},"type":"ExpressionStatement","expression":{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":5},"source":null},"type":"AssignmentExpression","operator":"=","left":{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":1},"source":null},"type":"Identifier","name":"a"},"right":{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":5},"source":null},"type":"Identifier","name":"b"}}}]});

/** 4 **
 * if (a == b)
 * {
 *    a = b;
 * }
 */
testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":4,"column":1},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":0},"end":{"line":3,"column":8},"source":null},"type":"IfStatement","test":{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":10},"source":null},"type":"BinaryExpression","operator":"==","left":{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":5},"source":null},"type":"Identifier","name":"a"},"right":{"loc":{"start":{"line":1,"column":9},"end":{"line":1,"column":10},"source":null},"type":"Identifier","name":"b"}},"consequent":{"loc":{"start":{"line":2,"column":0},"end":{"line":3,"column":8},"source":null},"type":"BlockStatement","body":[{"loc":{"start":{"line":3,"column":2},"end":{"line":3,"column":7},"source":null},"type":"ExpressionStatement","expression":{"loc":{"start":{"line":3,"column":2},"end":{"line":3,"column":7},"source":null},"type":"AssignmentExpression","operator":"=","left":{"loc":{"start":{"line":3,"column":2},"end":{"line":3,"column":3},"source":null},"type":"Identifier","name":"a"},"right":{"loc":{"start":{"line":3,"column":6},"end":{"line":3,"column":7},"source":null},"type":"Identifier","name":"b"}}}]},"alternate":null}]});

testData.forEach(function(testElement)
{
    try
    {
        var astId = 0;
        
        FBL.Firecrow.ASTHelper.traverseAst(testElement, function(propertyValue, propName, parentElement)
        {
            propertyValue.astId = buildStringId(astId); //6 znamenkasti string -> "1 - 000001"
            astId++;
        });
    }
    catch(e) { alert("Error when traversing ast in testData.js: " + e);}
});

function buildStringId(curId)
{
	if(curId < 0) alert("Invalid AST Identification: ID cannot be negative (Source: testData.js)");
	if(curId > 999999) alert("Invalid AST Identification: ID exceeds, but is limited to,  6 characters (Source: testData.js)");
	return ("00000" + curId).slice(-6);
}
