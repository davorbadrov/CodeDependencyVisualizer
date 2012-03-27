/**
 * Created by Jomaras.
 * Date: 27.03.12.@07:54
 */
FBL.ns(function () { with (FBL) {
/*******/

const astHelper = Firecrow.ASTHelper;

Firecrow.CodeMarkupGenerator =
{
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

                        if(previousElement != null && previousElement.loc.start.line != currentElement.loc.start.line)
                        {
                            html += "<br/>";
                        }

                        html += this.generateHtml(currentElement);
                    }
                }

                return html;
            }

            if(astHelper.isVariableDeclaration(astElement)) { return this.generateFromVariableDeclaration(astElement); }
        }
        catch(e) { alert("Error while generating HTML in codeMarkupGenerator: " + e); }
    },

    generateFromVariableDeclaration: function(variableDeclaration)
    {
        try
        {
            if(!astHelper.isVariableDeclaration(variableDeclaration)) { alert("Invalid element in generate html variable declaration"); return "";}

            var html = "";

            html += "<div class='varDecl'>";

            html += "<span class='keyword'>" + variableDeclaration.kind + "</span>";
            html += "&nbsp;"

            for(var i = 0; i < variableDeclaration.declarations.length; i++)
            {
                var previousDeclarator = i == 0 ? variableDeclaration : variableDeclaration.declarations[i-1];
                var currentDeclarator = variableDeclaration.declarations[i];

                if(previousDeclarator.loc.start.line != currentDeclarator.loc.start.line)
                {
                    html += "<br/>";
                }

                html += this.generateFromVariableDeclarator(currentDeclarator);
            }

            html+= "</div>";

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

        if(astHelper.isIdentifier(pattern)) { return "<span class='identifier'>" + pattern.name + "</span>"; }
    },

    generateFromExpression: function(expression)
    {
        if(!astHelper.isLiteral(expression)) { alert("Currently when generating html from expressions we only support literals!"); return; }

        if(astHelper.isLiteral) { return "<span class='literal'>" + expression.value + "</span>"; }
    }
}
}});