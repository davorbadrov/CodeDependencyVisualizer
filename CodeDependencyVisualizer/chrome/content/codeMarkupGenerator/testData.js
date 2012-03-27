/**
 * Created by Jomaras.
 * Date: 27.03.12.@07:47
 */
var testData = [];

testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":10},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"Identifier","name":"a"},"init":{"loc":{"start":{"line":1,"column":8},"end":{"line":1,"column":9},"source":null},"type":"Literal","value":3}}]}]});
testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":17},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":16},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"Identifier","name":"a"},"init":{"loc":{"start":{"line":1,"column":8},"end":{"line":1,"column":9},"source":null},"type":"Literal","value":3}},{"loc":{"start":{"line":1,"column":11},"end":{"line":1,"column":16},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":1,"column":11},"end":{"line":1,"column":16},"source":null},"type":"Identifier","name":"b"},"init":{"loc":{"start":{"line":1,"column":15},"end":{"line":1,"column":16},"source":null},"type":"Literal","value":4}}]}]});
testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":2,"column":10},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"Identifier","name":"a"},"init":{"loc":{"start":{"line":1,"column":8},"end":{"line":1,"column":9},"source":null},"type":"Literal","value":3}}]},{"loc":{"start":{"line":2,"column":0},"end":{"line":2,"column":9},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":9},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":9},"source":null},"type":"Identifier","name":"b"},"init":{"loc":{"start":{"line":2,"column":8},"end":{"line":2,"column":9},"source":null},"type":"Literal","value":4}}]}]});
testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":4,"column":1},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":9},"end":{"line":4,"column":1},"source":null},"type":"FunctionDeclaration","id":{"loc":null,"type":"Identifier","name":"test"},"params":[{"loc":{"start":{"line":1,"column":14},"end":{"line":1,"column":15},"source":null},"type":"Identifier","name":"a"},{"loc":{"start":{"line":1,"column":17},"end":{"line":1,"column":18},"source":null},"type":"Identifier","name":"b"}],"body":{"loc":{"start":{"line":2,"column":0},"end":{"line":3,"column":12},"source":null},"type":"BlockStatement","body":[{"loc":{"start":{"line":3,"column":2},"end":{"line":3,"column":7},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":3,"column":6},"end":{"line":3,"column":7},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":3,"column":6},"end":{"line":3,"column":11},"source":null},"type":"Identifier","name":"a"},"init":{"loc":{"start":{"line":3,"column":10},"end":{"line":3,"column":11},"source":null},"type":"Literal","value":3}}]}]},"generator":false,"expression":false}]});

testData.forEach(function(testElement)
{
    try
    {
        var astId = 0;
        FBL.Firecrow.ASTHelper.traverseAst(testElement, function(propertyValue, propName, parentElement)
        {
            propertyValue.astId = astId++; //6 znamenkasti string -> "1 - 000000"
        });
    }
    catch(e) { alert("Error when traversing ast in testData.js: " + e);}
});