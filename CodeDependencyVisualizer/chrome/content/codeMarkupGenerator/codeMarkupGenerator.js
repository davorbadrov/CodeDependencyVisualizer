/**
 * Created by Jomaras.
 * Date: 27.03.12.@07:54
 */
FBL.ns(function () { with (FBL) {
/*******/

const astHelper = Firecrow.ASTHelper;

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
                    }
                }

                return html;
            }
            else if (astHelper.isFunctionDeclaration(astElement)) { return this.generateFromFunctionDeclaration(astElement); }
            else if (astHelper.isVariableDeclaration(astElement)) { return this.generateFromVariableDeclaration(astElement); }
            else if (astHelper.isBlockStatement(astElement)) { return this.generateFromBlockStatement(astElement); }
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
        if(!astHelper.isFunction(functionDecExp)) { alert("Invalid element when generating function parameters html code!"); return ""; }

        var html = "(";

        for(var i = 0; i < functionDecExp.params.length; i++)
        {
            if(i != 0) { html += ", "; }

            html += this.generateFromPattern(functionDecExp.params[i]);
        }
        html += ")";

        return html;
    },

    generateFromFunctionBody: function(functionDeclExp)
    {
        if(!astHelper.isFunction(functionDeclExp)) { alert("Invalid element when generating function body html code!"); return ""; }

        return this.generateHtml(functionDeclExp.body);
    },

    generateFromBlockStatement: function(blockStatement)
    {
        if(!astHelper.isBlockStatement(blockStatement)) { alert("Invalid element when generating block statement html code!"); return ""; }

        var html = this.getStartElementHtml("div", { class:'block', id : blockStatement.astId});

        html += "{";

        this.currentIntendation += "&nbsp;";

        blockStatement.body.forEach(function(statement)
        {
            html += this.generateHtml(statement);
        }, this);

        this.currentIntendation = this.currentIntendation.replace(/&nbsp;$/g, "");

        html += "}";
        html += this.getEndElementHtml("div");

        return html;
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
        //NOT FINISHED: there are other patterns!
        if(!astHelper.isIdentifier(pattern)) { alert("The pattern is not an identifier when generating html."); return "";}

        if(astHelper.isIdentifier(pattern)) { return this.generateFromIdentifier(pattern);}
        else if(true) {}
    },

    generateFromIdentifier: function(identifier)
    {
        if(!astHelper.isIdentifier(identifier)) { alert("The identifier is not valid when generating html."); return "";}

        return this.getElementHtml("span", {class: "identifier"}, identifier.name);
    },

    generateFromExpression: function(expression)
    {
        if(!astHelper.isLiteral(expression)) { alert("Currently when generating html from expressions we only support literals!"); return; }

        if(astHelper.isLiteral(expression)) { return this.getElementHtml("span", {class: "literal"}, expression.value); }
    },

    getElementHtml: function(elementType, attributes, content)
    {
        return this.getStartElementHtml(elementType, attributes) + this.getHtmlContent(content) + this.getEndElementHtml(elementType);
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