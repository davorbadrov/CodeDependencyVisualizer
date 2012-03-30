/**
 * Created by Jomaras.
 * Date: 27.03.12.@07:54
 */
FBL.ns(function () { with (FBL) {
/*******/

const astHelper = Firecrow.ASTHelper;
const valueTypeHelper = Firecrow.ValueTypeHelper;

Firecrow.CodeMarkupGenerator =
{
    currentIntendation: "",
	generateHtml: function(astElement)
    {
        try
        {
        	
            if(astHelper.isProgram(astElement))
            {
                var html = "";

                if(astElement.body != null)
                {
                    for(var i = 0; i < astElement.body.length; i++)
                    {
                        var previousElement = astElement.body[i-1];
                        var currentElement = astElement.body[i];

                        html += this.generateHtml(currentElement);
                        html += "<br>";
                    }
                }

                return html;
            }
       
            /**
             * generalized
             */
            else if (astHelper.isStatement(astElement))             { return this.generateStatement(astElement); }
            else if (astHelper.isExpression(astElement))            { return this.generateExpression(astElement); }

            /**
             * rest
             */
            else if(astHelper.isCatchClause(astElement))            { return this.generateFromCatchClause(astElement); }
            else if (astHelper.isFunction(astElement))              { return this.generateFromFunction(astElement); }
            else if (astHelper.isVariableDeclaration(astElement))   { return this.generateFromVariableDeclaration(astElement); }
            else if (astHelper.isLiteral(astElement))               { return this.generateFromLiteral(astElement); }
            else if (astHelper.isIdentifier(astElement))            { return this.generateFromIdentifier(astElement); }

            else { alert("Error while generating HTML in codeMarkupGenerator: unidentified ast element.: " + astElement.type); return "";}
        }
        catch(e) { alert("Error while generating HTML in codeMarkupGenerator: " + e); }
    },

    generateStatement: function(statement)
    {
        try
        {
            var html = "";

            if (astHelper.isEmptyStatement(statement)) { html += this.generateFromEmptyStatement(statement); }
            else if (astHelper.isBlockStatement(statement)) { html += this.generateFromBlockStatement(statement); }
            else if (astHelper.isExpressionStatement(statement)) { html += this.generateFromExpressionStatement(statement); }
            else if (astHelper.isIfStatement(statement)) { html += this.generateFromIfStatement(statement); }
            else if (astHelper.isWhileStatement(statement)) { html += this.generateFromWhileStatement(statement); }
            else if (astHelper.isDoWhileStatement(statement)) { html += this.generateFromDoWhileStatement(statement); }
            else if (astHelper.isForStatement(statement)) { html += this.generateFromForStatement(statement); }
            else if (astHelper.isLabeledStatement(statement)) { html += this.generateFromLabeledStatement(statement); }
            else if (astHelper.isBreakStatement(statement)) { html+= this.generateFromBreakStatement(statement); }
            else if (astHelper.isContinueStatement(statement)) { html += this.generateFromContinueStatement(statement); }
            else if (astHelper.isReturnStatement(statement)) { html += this.generateFromReturnStatement(statement); }
            else if (astHelper.isWithStatement(statement)) { html += this.generateFromWithStatement(statement); }
            else if (astHelper.isTryStatement(statement)) { html += this.generateFromTryStatement(statement); }
            else if (astHelper.isThrowStatement(statement)) { html += this.generateFromThrowStatement(statement); }
            else { alert("Error: Ast Statement element not defined: " + expression.type);  return "";}

            return html;
        }
        catch(e) { alert("Error when generating HTML from a statement:" + e); }
    },

    generateExpression: function(expression)
    {
        try
        {
            var html = "";

            if (astHelper.isAssignmentExpression(expression)) { html += this.generateFromAssignmentExpression(expression); }
            else if (astHelper.isUnaryExpression(expression)) { html += this.generateFromUnaryExpression(expression); }
            else if (astHelper.isBinaryExpression(expression)) { html += this.generateFromBinaryExpression(expression); }
            else if (astHelper.isLogicalExpression(expression)) { html += this.generateFromLogicalExpression(expression); }
            else if (astHelper.isLiteral(expression)) { html += this.generateFromLiteral(expression); }
            else if (astHelper.isIdentifier(expression)) { html += this.generateFromIdentifier(expression); }
            else if (astHelper.isUpdateExpression(expression)) { html += this.generateFromUpdateExpression(expression); }
            else if (astHelper.isNewExpression(expression)) { html += this.generateFromNewExpression(expression); }
            else if (astHelper.isConditionalExpression(expression)) { html += this.generateFromConditionalExpression(expression); }
            else if (astHelper.isThisExpression(expression)) { html += this.generateFromThisExpression(expression); }
            else if (astHelper.isCallExpression(expression)) { html += this.generateFromCallExpression(expression); }
            else if (astHelper.isMemberExpression(expression)) { html += this.generateFromMemberExpression(expression); }
            else if (astHelper.isSequenceExpression(expression)) { html += this.generateFromSequenceExpression(expression); }
            else if (astHelper.isArrayExpression(expression)) { html += this.generateFromArrayExpression(expression); }
            else if (astHelper.isObjectExpression(expression)) { html += this.generateFromObjectExpression(expression); }
            else if (astHelper.isFunctionExpression(expression)) { html += this.generateFromFunction(expression); }
            else { alert("Error: Ast Expression element not defined: " + expression.type);  return "";}

            return html;
        }
        catch(e) { alert("Error when generating HTML from an expression:" + e); }
    },

    generateFromFunction: function(functionDecExp)
    {
        try
        {
            if(!astHelper.isFunction(functionDecExp)) { alert("Invalid Element when generating function html code!"); }

            var classString = "";
            if(astHelper.isFunctionDeclaration(functionDecExp)) classString = "functionDeclaration";
            else classString = "functionExpression";

            var html = this.getStartElementHtml("span", {class: classString, id : "astElement" + functionDecExp.astId });

            // function declaration has a function keyword and an identifier
            // function expression has none of the above
            if(functionDecExp.id != null)
            {
                html += this.getElementHtml("span", {class:"keyword"}, "function") + " ";
                html += this.generateFromIdentifier(functionDecExp.id);
            }

            html +=  this.generateFunctionParametersHtml(functionDecExp)
                  +  this.generateFromFunctionBody(functionDecExp);

            html += this.getEndElementHtml("span");

            return html;
        }
        catch(e) { alert("Error when generating HTML from a function:" + e); }
    },

//      Replaced by: generateFromFunction
//
//    generateFromFunctionDeclaration: function(functionDeclaration)
//    {
//        try
//        {
//            if(!astHelper.isFunctionDeclaration(functionDeclaration)) { alert("Invalid element when generating function declaration html code!"); return ""; }
//
//            var html = this.getStartElementHtml("div", {class: 'funcDecl', id : "astElement" + functionDeclaration.astId });
//
//            html += this.getElementHtml("span", {class:"keyword"}, "function") + " "
//                 +  this.generateFromIdentifier(functionDeclaration.id)
//                 +  this.generateFunctionParametersHtml(functionDeclaration)
//                 +  this.generateFromFunctionBody(functionDeclaration);
//
//            html += this.getEndElementHtml("div");
//
//            return html;
//        }
//        catch(e) { alert("Error when generating HTML form a function declaration:" + e); }
//    },

    generateFunctionParametersHtml: function(functionDecExp)
    {
    	try
    	{
	        if(!astHelper.isFunction(functionDecExp)) { alert("Invalid element when generating function parameters html code!"); return ""; }
	
	        var html = "(";
	
	        for(var i = 0; i < functionDecExp.params.length; i++)
	        {
	            if(i != 0) { html += ", "; }
	
	            html += this.generateFromPattern(functionDecExp.params[i]);
	        }
	        html += ")";
	
	        return html;
    	}
        catch(e) { alert("Error when generating HTML from function parameters:" + e);}
    },

    generateFromFunctionBody: function(functionDeclExp)
    {
    	try
    	{
	        if(!astHelper.isFunction(functionDeclExp)) { alert("Invalid element when generating function body html code!"); return ""; }
	
	        return this.generateHtml(functionDeclExp.body);
    	}
        catch(e) { alert("Error when generating HTML from function body:" + e); }
    },

    generateFromBlockStatement: function(blockStatement)
    {
    	try
    	{
	        if(!astHelper.isBlockStatement(blockStatement)) { alert("Invalid element when generating block statement html code!"); return ""; }
	
	        var html = this.getStartElementHtml("div", { class:'block', id: blockStatement.astId});
	
	        html += "{"+ "<br>";
	
	        //this.currentIntendation += "&nbsp;&nbsp;";
	        
	        blockStatement.body.forEach(function(statement)
	        {
	            html += this.generateHtml(statement) + "<br>";
	        }, this);
	
	        //this.currentIntendation = this.currentIntendation.replace(/&nbsp;&nbsp;$/g, "");
	        
	        html += "}";
	        html += this.getEndElementHtml("div");
	
	        return html;
    	}
        catch(e) { alert("Error when generating HTML from block statement:" + e);}
    },
    
    generateFromEmptyStatement: function(emptyStatement)
    {
    	try
    	{
	    	if(!astHelper.isEmptyStatement(emptyStatement)) { alert("Invalid element when generating empty statement html code!"); return ""; }
	 
	    	var html = "";
	    	
	    	html += this.getStartElementHtml("span", { class:'emptyStatement' });
	    	html += ";";
	    	html += this.getEndElementHtml("span");
	    	
	    	return html;
    	}
        catch(e) { alert("Error when generating HTML from empty statement:" + e); }
    },
    
    generateFromExpressionStatement: function(expressionStatement)
    {
    	try
    	{
	    	if(!astHelper.isExpressionStatement(expressionStatement)) { alert("Invalid element when generating expression statement html code!"); return "";}
	    	
	    	var html = "";
	    	
	    	html += this.getStartElementHtml("span", { class: "expressionStatement"});
	    	
	    	html += this.generateHtml(expressionStatement.expression);
	    	
	    	html += this.getEndElementHtml("span");
	    	
	    	return html;
    	}
        catch(e) { alert("Error when generating HTML from expression statement:" + e); }
    },
    
    generateFromAssignmentExpression: function(assignmentExpression)
    {
    	try
    	{
	    	if(!astHelper.isAssignmentExpression(assignmentExpression)) { alert("Invalid element when generating assignment expression html code!"); return "";}

            return this.getStartElementHtml("span", { class: "assignmentExpression", id: "astElement" + assignmentExpression.astId})
                 + this.generateHtml(assignmentExpression.left)
                 + " " + assignmentExpression.operator + " "
                 + this.generateHtml(assignmentExpression.right)
                 + this.getEndElementHtml("span");
    	}
        catch(e) { alert("Error when generating HTML from assignment expression:" + e); }
    },

    generateFromUnaryExpression: function(unaryExpression)
    {
        try
        {
            if(!astHelper.isUnaryExpression(unaryExpression)) { alert("Invalid element when generating unary expression html code!"); return "";}

            var html = this.getStartElementHtml("span", {class: "unaryExpression", id: "astElement" + unaryExpression.astId});

            if(unaryExpression.prefix) html += unaryExpression.operator;

            if(unaryExpression.operator == "typeof"
            || unaryExpression.operator == "void"
            || unaryExpression.operator == "delete") html += " (";

            html += this.generateExpression(unaryExpression.argument);

            if(!unaryExpression.prefix) html += unaryExpression.operator;

            if(unaryExpression.operator == "typeof"
                || unaryExpression.operator == "void"
                || unaryExpression.operator == "delete") html += ")";

            html += this.getEndElementHtml("span");

            return html;
        }
        catch(e) { alert("Error when generating HTML from unary expression:" + e); }
    },

    generateFromBinaryExpression: function(binaryExpression)
    {
    	try
    	{
	    	if(!astHelper.isBinaryExpression(binaryExpression)) { alert("Invalid element when generating binary expression html code!"); return ""; }
	
	    	var html = this.getStartElementHtml("span", { class: "binaryExpression", id: "astElement" + binaryExpression.astId});
	    	
			html += this.generateHtml(binaryExpression.left);
	    	html += " " + binaryExpression.operator + " ";
	    	html += this.generateHtml(binaryExpression.right);
	    	
	    	html += this.getEndElementHtml("span");
	    	
	    	return html;
    	}
        catch(e) { alert("Error when generating HTML from binary expression:" + e); }
    },

    generateFromLogicalExpression: function(logicalExpression)
    {
        try
        {
            if(!astHelper.isLogicalExpression(logicalExpression)) { alert("Invalid element when generating logical expression html code!"); return ""; }

            var html = this.getStartElementHtml("span", { class: "logicalExpression", id: "astElement" + logicalExpression.astId});

            html += this.generateHtml(logicalExpression.left);
            html += " " + logicalExpression.operator + " ";
            html += this.generateHtml(logicalExpression.right);

            html += this.getEndElementHtml("span");

            return html;
        }
        catch(e) { alert("Error when generating HTML from logical expression:" + e); }
    },

    generateFromUpdateExpression: function(updateExpression)
    {
        try
        {
            if(!astHelper.isUpdateExpression(updateExpression)) { alert("Invalid element when generating update expression html code!"); return ""; }

            var html = this.getStartElementHtml("span", { class: "updateExpression", id: "astElement" + updateExpression.astId });

            // if prefixed e.g.: ++i
            if(updateExpression.prefix) html += updateExpression.operator;

            html += this.generateHtml(updateExpression.argument);

            // if postfixed e.g.: i++
            if(!updateExpression.prefix) html += updateExpression.operator;

            html += this.getEndElementHtml("span");

            return html;
        }
        catch(e) { alert("Error when generating HTML from update expression:" + e); }
    },

    generateFromNewExpression: function(newExpression)
    {
        try
        {
            var argumentNumber = 0;

            if(!astHelper.isNewExpression(newExpression)) { alert("Invalid element when generating new expression html code!"); return ""; }

            var html = this.getStartElementHtml("span", {class: "newExpression", id: "astElement" + newExpression.astId})
                     + this.getElementHtml("span", {class: "keyword"}, "new") + " "
                     + this.generateHtml(newExpression.callee) + "(";

            html += this.getSequenceHtml(newExpression.arguments);

            html += ")";

            return html;
        }
        catch(e) { alert("Error when generating HTML from new expression:" + e); }
    },

    generateFromConditionalExpression: function(conditionalExpression)
    {
        try
        {
            if(!astHelper.isConditionalExpression(conditionalExpression)) { alert("Invalid element when generating conditional expression html code!"); return ""; }

            var html;

            html = this.getStartElementHtml("span", {class: "conditionalExpression", id: "astElement" + conditionalExpression.astId})
                     + this.generateHtml(conditionalExpression.test)
                     + " ? " + this.generateHtml(conditionalExpression.consequent)
                     + " : " + this.generateHtml(conditionalExpression.alternate)
                     + this.getEndElementHtml("span");

            return html;

        }
        catch(e) { alert("Error when generating HTML from conditional expression:" + e); }
    },

    generateFromThisExpression: function(thisExpression)
    {
        try
        {
            if(!astHelper.isThisExpression(thisExpression)) { alert("Invalid element when generating this expression html code!"); return ""; }

            return this.getElementHtml("span", { class: "keyword", id: "astElement"}, "this");
        }
        catch(e) { alert("Error when generating HTML from this expression:" + e); }
    },

    generateFromCallExpression: function(callExpression)
    {
        try
        {
            if(!astHelper.isCallExpression(callExpression)) { alert("Invalid element when generating call expression html code!"); return ""; }

            var html = this.generateHtml(callExpression.callee) + "(";

            html += this.getSequenceHtml(callExpression.arguments);

            html += ")";

            return html;
        }
        catch(e) { alert("Error when generating HTML from call expression:" + e); }
    },

    generateFromMemberExpression: function(memberExpression)
    {
        try
        {
            if(!astHelper.isMemberExpression(memberExpression)) { alert("Invalid element when generating member expression html code!"); return ""; }

            var html = this.getStartElementHtml("span", { class: "memberExpression", id: "astElement" + memberExpression.astId})
                     + this.generateHtml(memberExpression.object);

            if(memberExpression.computed === false)
            {
                html += "." + this.generateHtml(memberExpression.property);
            }
            else if(memberExpression.computed === true)
            {
                html += "[" + this.generateHtml(memberExpression.property) + "]";
            }

            html += this.getEndElementHtml("span");

            return html;
        }
        catch(e) { alert("Error when generating HTML from member expression:" + e); }
    },

    generateFromSequenceExpression: function(sequenceExpression)
    {
        try
        {
            if(!astHelper.isSequenceExpression(sequenceExpression)) { alert("Invalid element when generating sequence expression html code!"); return ""; }

            var html = this.getStartElementHtml("span", { class: "sequenceExpression", id: "astElement" + sequenceExpression.astId});

            html += this.getSequenceHtml(sequenceExpression.expressions);

            html += this.getEndElementHtml("span");

            return html;
        }
        catch(e) { alert("Error when generating HTML from member expression:" + e); }
    },

    generateFromArrayExpression: function(arrayExpression)
    {
        try
        {
            if(!astHelper.isArrayExpression(arrayExpression)) { alert("Invalid element when generating array expression html code!"); return ""; }

            var html = this.getStartElementHtml("span", {class: "arrayExpression", id: "astElement" + arrayExpression.astId});
            html += "[" + this.getSequenceHtml(arrayExpression.elements) + "]";
            html += this.getEndElementHtml("span");

            return html;
        }
        catch(e) { alert("Error when generating HTML from array expression:" + e); }
    },

    generateFromObjectExpression: function(objectExpression)
    {
        try
        {
            if(!astHelper.isObjectExpression(objectExpression)) { alert("Invalid element when generating object expression html code!"); return ""; }

            var html = this.getStartElementHtml("span", {class: "objectExpression", id: "astElement" + objectExpression.astId});

            //if get or set
            for(var i = 0; i < objectExpression.properties.length; i++)
            {
                if(i != 0) html += ",";

                if(objectExpression.properties[i].kind == "get" || objectExpression.properties[i].kind == "set")
                {
                    html += this.getElementHtml("span", {class: "keyword"}, objectExpression.properties[i].kind)
                          + " " + this.generateHtml(objectExpression.properties[i].key)
                          + this.generateExpression(objectExpression.properties[i].value);
                }
            }

            // if init - UNFINISHED
            if(objectExpression.properties.length == 0) html += "{}";

            html += this.getEndElementHtml("span");

            return html;
        }
        catch(e) { alert("Error when generating HTML from object expression:" + e); }
    },

    generateFromIfStatement: function(ifStatement)
    {
    	try
    	{
	    	if(!astHelper.isIfStatement(ifStatement)) { alert("Invalid element when generating empty statement html code!"); return ""; }

	    	var html = this.getStartElementHtml("span", {class:"ifDeclaration", id:"astElement" + ifStatement.astId})
                     + this.getElementHtml("span", {class:"keyword"}, "if")
                     + " (" + this.generateHtml(ifStatement.test) + ") "
                     + this.generateHtml(ifStatement.consequent);

	    	if(ifStatement.alternate != null)
			{
	    		html += this.getElementHtml("span", {class:"keyword"}, "else ");
	    		html += this.generateHtml(ifStatement.alternate);
			}

            html += this.getEndElementHtml("span");

	    	return html;
    	}
        catch(e) { alert("Error when generating HTML from if statement:" + e); }
    },
    
    generateFromWhileStatement: function(whileStatement)
    {
    	try
    	{
    		if(!astHelper.isWhileStatement(whileStatement)) { alert("Invalid element when generating while statement html code!"); return ""; }
    		
    		var html = this.getStartElementHtml("div", {class: "whileLoopDeclaration", id: "astElement" + whileStatement.astId})
                     + this.getElementHtml("span", {class:"keyword"}, "while")
                     + "(" + this.generateHtml(whileStatement.test) + ")"
                     + this.generateHtml(whileStatement.body);
    		
    		return html;
    	}
        catch(e) { alert("Error when generating HTML from while statement:" + e); }    	
    },
    
    generateFromDoWhileStatement: function(doWhileStatement)
    {
    	try
    	{
    		if(!astHelper.isDoWhileStatement(doWhileStatement)) { alert("Invalid element when generating do while statement html code!"); return ""; }
    	
    		var html = this.getStartElementHtml("div", {class:"doWhileLoopDeclaration", id: "astElement" + doWhileStatement.astId})
                     + this.getElementHtml("span", {class:"keyword"}, "do")
                     + this.generateHtml(doWhileStatement.body)
                     + this.getElementHtml("span", {class:"keyword"}, "while")
                     + "(" + this.generateHtml(doWhileStatement.test) + ")"
                     + this.getEndElementHtml("div");
    		
    		return html;
    	}
    	catch(e) { alert("Error when generating HTML from do while statement:" + e); }   
    },
    
    generateFromForStatement: function(forStatement)
    {
    	try
    	{
    		if(!astHelper.isForStatement(forStatement)) { alert("Invalid element when generating for statement html code!"); return ""; }
        	
    		var html = this.getStartElementHtml("div", {class:"forLoopDeclaration", id:"astElement" + forStatement.astId});

            html += this.getElementHtml("span", {class:"keyword"}, "for") + " "
    		      + "(" + this.generateHtml(forStatement.init) + "; "
    		      + this.generateHtml(forStatement.test) + "; "
    		      + this.generateHtml(forStatement.update) + ")"
    		      + this.generateHtml(forStatement.body);

            html += this.getEndElementHtml("div");

    		return html;
    	}
    	catch(e) { alert("Error when generating HTML from for statement:" + e); }   
    },

    generateFromBreakStatement: function(breakStatement)
    {
        try
        {
            if(!astHelper.isBreakStatement(breakStatement)) { alert("Invalid element when generating break statement html code!"); return ""; }

            var html = this.getStartElementHtml("span", {class: "breakStatement", id: "astElement" + breakStatement.astId})
                     + this.getElementHtml("span", {class:"keyword"}, "break");

            if(breakStatement.label != null) html += " " + this.generateFromIdentifier(breakStatement.label);

            html += this.getEndElementHtml("span");

            return html;
        }
        catch(e) { alert("Error when generating HTML from break statement:" + e); }
    },

    generateFromContinueStatement: function(continueStatement)
    {
      try
      {
          if(!astHelper.isContinueStatement(continueStatement)) { alert("Invalid element when generating continue statement html code!"); return ""; }

          var html = this.getStartElementHtml("span", {class: "continueStatement", id: "astElement" + continueStatement.astId})
                   + this.getElementHtml("span", {class:"keyword"}, "continue");

          if(continueStatement.label != null) html += " " + this.generateFromIdentifier(continueStatement.label);

          html += this.getEndElementHtml("span");

          return html;
      }
      catch(e) { alert("Error when generating HTML from continue statement:" + e); }
    },

    generateFromReturnStatement: function(returnStatement)
    {
        try
        {
            if(!astHelper.isReturnStatement(returnStatement)) { alert("Invalid element when generating return statement html code!"); return ""; }

            var html = this.getStartElementHtml("span", {class: "returnStatement", id: "astElement" + returnStatement.astId})
                + this.getElementHtml("span", {class:"keyword"}, "return");

            if(returnStatement.argument != null) html += " " + this.generateExpression(returnStatement.argument);

            html += this.getEndElementHtml("span");

            return html;
        }
        catch(e) { alert("Error when generating HTML from return statement:" + e); }
    },

    generateFromWithStatement: function(withStatement)
    {
        try
        {
            if(!astHelper.isWithStatement(withStatement)) { alert("Invalid element when generating with statement html code!"); return ""; }

            var html = this.getStartElementHtml("span", {class: "withStatement", id: "astElement" + withStatement.astId})
                     + this.getElementHtml("span", {class:"keyword"}, "with") + " ("
                     + this.generateExpression(withStatement.object) + ")"
                     + this.generateStatement(withStatement.body)
                     + this.getEndElementHtml("span");

            return html;
        }
        catch(e) { alert("Error when generating HTML from with statement:" + e); }
    },

    generateFromThrowStatement: function(throwStatement)
    {
        try
        {
            if(!astHelper.isThrowStatement(throwStatement)) { alert("Invalid element when generating throw statement html code!"); return ""; }

            var html = this.getStartElementHtml("span", {class: "throwStatement", id: "astElement" + throwStatement.astId})
                     + this.getElementHtml("span", {class: "keyword"}, "throw")
                     + " " + this.generateExpression(throwStatement.argument);

            return html;
        }
        catch(e) { alert("Error when generating HTML from throw statement:" + e); }
    },

    generateFromTryStatement: function(tryStatement)
    {
        try
        {
            if(!astHelper.isTryStatement(tryStatement)) { alert("Invalid element when generating try statement html code!"); return ""; }

            var html = this.getStartElementHtml("div", {class: "tryStatement", id: "astElement" + tryStatement.astId})
                + this.getElementHtml("span", {class:"keyword"}, "try")
                + this.generateHtml(tryStatement.block);

            // catch clauses
            for(var i = 0; i < tryStatement.handlers.length; i++)
            {
                html += this.generateFromCatchClause(tryStatement.handlers[i]);
            }

            if(tryStatement.finalizer != null)
            {
                html += this.getElementHtml("span", {class:"keyword"}, "finally")
                      + this.generateHtml(tryStatement.finalizer);
            }

            return html;
        }
        catch(e) { alert("Error when generating HTML from try statement:" + e); }
    },

    generateFromLabeledStatement: function(labeledStatement)
    {
        try
        {
            if(!astHelper.isLabeledStatement(labeledStatement)) { alert("Invalid element when generating labeled statement html code!"); return ""; }

            var html = this.getStartElementHtml("span", {class: "labeledStatement", id: "astElement" + labeledStatement.astId})
                     + this.generateFromIdentifier(labeledStatement.label) + ": "
                     + this.generateHtml(labeledStatement.body)
                     + this.getEndElementHtml("span");

            return html;
        }
        catch(e) { alert("Error when generating HTML from labeled statement:" + e); }
    },

    generateFromVariableDeclaration: function(variableDeclaration)
    {
        try
        {
            if(!astHelper.isVariableDeclaration(variableDeclaration)) { alert("Invalid element when generating html variable declaration"); return "";}
            
            var html = "";

            html += this.getStartElementHtml("span", {class: 'variableDeclaration', id : "astElement" + variableDeclaration.astId });
            html += this.getElementHtml("span", {class:"keyword"}, variableDeclaration.kind);
            html += " ";

            for(var i = 0; i < variableDeclaration.declarations.length; i++)
            {
                var previousDeclarator = i == 0 ? variableDeclaration : variableDeclaration.declarations[i-1];
                var currentDeclarator = variableDeclaration.declarations[i];

                if(previousDeclarator.loc.start.line != currentDeclarator.loc.start.line)
                {
                    html += "<br/>";
                }

                if(previousDeclarator != variableDeclaration)
                {
                    html += ", ";
                }

                html += this.generateFromVariableDeclarator(currentDeclarator);
            }

            html += this.getEndElementHtml("span");

            return html;
        }
        catch(e) { alert("Error when generating HTML from variable declaration:" + e);}
    },

    generateFromVariableDeclarator: function(variableDeclarator)
    {
        try
        {
            if(!astHelper.isVariableDeclarator(variableDeclarator)) { alert("The element is not a variable declarator when generating html code!"); return ""; }

            var html = this.generateFromPattern(variableDeclarator.id);

            if(variableDeclarator.init != null)
            {
                html += " = ";
                html += this.generateHtml(variableDeclarator.init);
            }

            return html;
        }
        catch(e) { alert("Error when generating HTML code from variableDeclarator - CodeMarkupGenerator:" + e);}
    },

    generateFromPattern: function(pattern)
    {
    	try
    	{
	        //NOT FINISHED: there are other patterns!
	        if(!astHelper.isIdentifier(pattern)) { alert("The pattern is not an identifier when generating html."); return "";}
	
	        if(astHelper.isIdentifier(pattern)) { return this.generateFromIdentifier(pattern);}
    	}
        catch(e) { alert("Error when generating HTML from pattern:" + e);}
    },

    generateFromCatchClause: function(catchClause)
    {
        try
        {
            if(!astHelper.isCatchClause(catchClause)) { alert("Invalid element when generating catch clause html code!"); return ""; }

            var html = this.getStartElementHtml("div", {class: "catchClause", id: "astElement" + catchClause.astId})
                      + this.getElementHtml("span", {class: "keyword"}, "catch");

            html += " (" + this.generateHtml(catchClause.param);

            if(catchClause.guard != null) html += " if " + this.generateExpression(catchClause.guard);

            html += ")";
            html += this.generateStatement(catchClause.body);

            html += this.getEndElementHtml("div");

            return html;
        }
        catch(e) { alert("Error when generating HTML from catch clause:" + e);}
    },

    generateFromIdentifier: function(identifier)
    {
    	try
    	{
	        if(!astHelper.isIdentifier(identifier)) { alert("The identifier is not valid when generating html."); return "";}
	
	        return this.getElementHtml("span", {class: "identifier"}, identifier.name);
    	}
        catch(e) { alert("Error when generating HTML from an identifier:" + e);}
    },

    generateFromExpression: function(expression)
    {
    	try
    	{
	        if(!astHelper.isLiteral(expression)) { alert("Currently when generating html from expressions we only support literals!"); return; }

	        if(astHelper.isLiteral(expression)) { return this.getElementHtml("span", {class: "literal"}, expression.value); }
	        if(astHelper.isIdentifier(expression)) { return this.getElementHtml("span", {class: "identifier"}, expression.name); }
	        if(astHelper.isUpdateExpression(expression))
	        {
	        	var html = "";


	        	return html;
	        }
    	}
        catch(e) { alert("Error when generating HTML from expression:" + e);}
    },

    generateFromLiteral: function(literal)
    {
    	try
    	{
    		if (!astHelper.isLiteral(literal)) { alert("The literal is not valid when generating html."); return ""; }

            if (valueTypeHelper.isString(literal.value))
                return this.getElementHtml("span", {class: "string"}, "\"" + literal.value + "\"");
            else if (valueTypeHelper.isBoolean(literal.value) || valueTypeHelper.isNull(literal.value))
                return this.getElementHtml("span", {class: "keyword"}, literal.value);
            else if(valueTypeHelper.isInteger)
                return this.getElementHtml("span", {class: "number"}, literal.value)
            else
                return this.getElementHtml("span", {class: "literal"}, literal.value);
    	}
        catch(e) { alert("Error when generating HTML from literal:" + e);}
    },

    getSequenceHtml: function(sequence)
    {
        var html = "";

        for(var i = 0; i < sequence.length; i++)
        {
            if(i != 0) { html += ", "; }
            html += this.generateHtml(sequence[i]);
        }

        return html;
    },

    getElementHtml: function(elementType, attributes, content)
    {
        return this.getStartElementHtml(elementType, attributes) + content + this.getEndElementHtml(elementType);
    },

    getHtmlContent: function(content)
    {
        return this.currentIntendation + content;
    },

    getStartElementHtml: function(elementType, attributes)
    {
        try
        {
            var html = "<" + elementType + " ";

            for(var propertyName in attributes)
            {
                html += propertyName + " = '" + attributes[propertyName] + "' ";
            }

            html += ">";

            return html;
        }
        catch(e) { alert("Error when generating start element html: " + e);}
    },

    getEndElementHtml: function(elementType)
    {
        try
        {
            return "</" + elementType  + ">";
        }
        catch(e) { alert("Error when generating end element html: " + e);}
    }
}
}});