/**
 * Created by Jomaras.
 * Date: 27.03.12.@07:54
 */
FBL.ns(function () { with (FBL) {
/*******/

const astHelper = Firecrow.ASTHelper;

Firecrow.CodeMarkupGenerator =
{
    //currentIntendation: "",
	currentLine: 1,
	currentIndentation: 0, // current column ?
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
                    }
                }

                return html;
            }
       
            /**
             * Statements
             */
            else if (astHelper.isEmptyStatement(astElement)) { return this.generateFromEmptyStatement(astElement); }
            else if (astHelper.isBlockStatement(astElement)) { return this.generateFromBlockStatement(astElement); }
            else if (astHelper.isExpressionStatement(astElement)) { return this.generateFromExpressionStatement(astElement); }
            else if (astHelper.isIfStatement(astElement)) { return this.generateFromIfStatement(astElement); }
            
            /**
             * Declarations
             */
            else if (astHelper.isFunctionDeclaration(astElement)) { return this.generateFromFunctionDeclaration(astElement); }
            else if (astHelper.isVariableDeclaration(astElement)) { return this.generateFromVariableDeclaration(astElement); }
    
            /**
             *  Expressions
             */
            else if (astHelper.isAssignmentExpression(astElement)) { return this.generateFromAssignmentExpression(astElement); }
            else if (astHelper.isBinaryExpression(astElement)) { return this.generateFromBinaryExpression(astElement); }
            else if (astHelper.isLiteral(astElement)) { return this.generateFromLiteral(astElement); }
            else if (astHelper.isIdentifier(astElement)) { return this.generateFromIdentifier(astElement); }
        }
        catch(e) { alert("Error while generating HTML in codeMarkupGenerator: " + e); }
    },

    generateFromFunctionDeclaration: function(functionDeclaration)
    {
        if(!astHelper.isFunctionDeclaration(functionDeclaration)) { alert("Invalid element when generating function declaration html code!"); return ""; }

        var html = this.getStartElementHtml("div", {class: 'funcDecl', id : "astElement" + functionDeclaration.astId });

        html += this.getElementHtml("span", {class:"keyword"}, "function") + " "
             +  this.generateFromIdentifier(functionDeclaration.id)
             +  this.generateFunctionParametersHtml(functionDeclaration)
             +  this.generateFromFunctionBody(functionDeclaration);

        html += this.getEndElementHtml("div");

        return html;
    },

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
	
	        html += "{";
	
	        //this.currentIntendation += "&nbsp;&nbsp;";
	        ind = ++this.currentIndentation;
	        blockStatement.body.forEach(function(statement)
	        {
	            html += this.generateHtml(statement);
	        }, this);
	
	        //this.currentIntendation = this.currentIntendation.replace(/&nbsp;&nbsp;$/g, "");
	        this.currentIndentation--;
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
	    	
	    	var html = "";
	    	
	    	html += this.getStartElementHtml("span", { class: "assignmentExpression"});
	    	
			html += this.generateHtml(assignmentExpression.left);
	    	html += " " + assignmentExpression.operator + " "; 
	    	html += this.generateHtml(assignmentExpression.right);
	    	
	    	html += this.getEndElementHtml("span");
	    	
	    	return html;
    	}
        catch(e) { alert("Error when generating HTML from assignment expression:" + e); }
    },
    
    generateFromBinaryExpression: function(binaryExpression)
    {
    	try
    	{
	    	if(!astHelper.isBinaryExpression(binaryExpression)) { alert("Invalid element when generating binary expression html code!"); return ""; }
	
	    	var html = "";
	
	    	html += this.getStartElementHtml("span", { class: "binaryExpression"});
	    	
			html += this.generateHtml(binaryExpression.left);
	    	html += " " + binaryExpression.operator + " "; 
	    	html += this.generateHtml(binaryExpression.right);
	    	
	    	html += this.getEndElementHtml("span");
	    	
	    	return html;
    	}
        catch(e) { alert("Error when generating HTML from binary expression:" + e); }
    },
    
    generateFromIfStatement: function(ifStatement)
    {
    	try
    	{
	    	if(!astHelper.isIfStatement(ifStatement)) { alert("Invalid element when generating empty statement html code!"); return ""; }
	    	
	    	var html = "";
	    	
	    	html += this.getElementHtml("span", {class:"keyword"}, "if");
	    	
	    	// test expression
	    	html += " (";
	    	html += this.generateHtml(ifStatement.test);
	    	html += ")";
	    	
	    	// consequent statement (block statement) (if test evaluates to true)
	    	html += this.generateHtml(ifStatement.consequent)
	    	
	    	// alternate statement if not null, that is, if specified
	    	if(ifStatement.alternate != null)
			{
	    		html += this.getElementHtml("span", {class:"keyword"}, "else ");
	    		html += this.generateHtml(ifStatement.alternate);
			}
		
	    	return html;
    	}
        catch(e) { alert("Error when generating HTML from if statement:" + e); }
    },
    
    generateFromVariableDeclaration: function(variableDeclaration)
    {
        try
        {
            if(!astHelper.isVariableDeclaration(variableDeclaration)) { alert("Invalid element in generate html variable declaration"); return "";}

            var html = "";

            html += this.getStartElementHtml("div", {class: 'varDecl', id : "astElement" + variableDeclaration.astId });
            html += this.currentIntendation + this.getElementHtml("span", {class:"keyword"}, variableDeclaration.kind);
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

            html += this.getEndElementHtml("div");

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
                html += this.generateFromExpression(variableDeclarator.init);
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
	        else if(true) {}
    	}
        catch(e) { alert("Error when generating HTML from pattern:" + e);}
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
    	}
        catch(e) { alert("Error when generating HTML from expression:" + e);}
    },

    generateFromLiteral: function(literal)
    {
    	try
    	{
    		if(!astHelper.isLiteral(literal)) { alert("The literal is not valid when generating html."); return ""; }
    	 
    		if(astHelper.isLiteral(literal)) { return this.getElementHtml("span", {class: "literal"}, literal.value); }
    	}
        catch(e) { alert("Error when generating HTML from literal:" + e);}
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