/**
 * Created by Davor Badrov.
 * Date: 6/2/12
 * Time: 11:01 AM
 */

var htmlRepresentation;
htmlRepresentation = {
    initialized:false,
    haveDependenciesBeenDetermined:false,
    dependencyGraph:null,
    site:"",
    pageModel:null,
    javascript:[],
    cssStyle:[],

    initialize:function (hasBeenInitializedCallback, thisValue) {
        if (!this.initialized) {
            Firebug.FirecrowModule.asyncGetPageModel(function (pageModel) {
                XulHelper.destroyUI();
                this.destroyContent();

                this.pageModel = pageModel;
                this.site = this.generateHtmlRepresentation(pageModel);
                this.initialized = true;

                htmlRepresentation.determineDependencies();
                XulHelper.createUI();
            }, this);
        }
        else {
            if (hasBeenInitializedCallback != null) {
                hasBeenInitializedCallback.call(thisValue);
            }
        }
    },

    determineDependencies:function () {
        try {
            if (this.haveDependenciesBeenDetermined) {
                return;
            }

            var Firecrow = FBL.Firecrow;
            var Browser = Firecrow.DoppelBrowser.Browser;
            FBL.Firecrow.ASTHelper.setParentsChildRelationships(this.pageModel);

            this.dependencyGraph = new Firecrow.DependencyGraph.DependencyGraph();
            var browser = new Browser();

            browser.registerNodeCreatedCallback(this.dependencyGraph.handleNodeCreated, this.dependencyGraph);
            browser.registerNodeInsertedCallback(this.dependencyGraph.handleNodeInserted, this.dependencyGraph);
            browser.registerDataDependencyEstablishedCallback(this.dependencyGraph.handleDataDependencyEstablished, this.dependencyGraph);
            browser.registerControlDependencyEstablishedCallback(this.dependencyGraph.handleControlDependencyEstablished, this.dependencyGraph);
            browser.registerControlFlowConnectionCallback(this.dependencyGraph.handleControlFlowConnection, this.dependencyGraph);
            browser.registerImportantConstructReachedCallback(this.dependencyGraph.handleImportantConstructReached, this.dependencyGraph);

            browser.buildPageFromModel(this.pageModel);
        }
        catch (e) {
            alert("HtmlRepresentation - error when determining dependencies: " + e);
        }
    },

    generateHtmlRepresentation:function (root) {
        try {
            //generate the main container
            var html = "<div class='htmlRepresentation'>";

            // generate the HTML Document Type Definition
            html += this.generateHtmlDocumentTypeTags(root.docType);

            // generate the <html> oppening tags
            html += '<div class="html node" id="astElement' + root.htmlElement.nodeId + '">'
                + this.generateOpeningTags(root.htmlElement.type, root.htmlElement.attributes);

            // generate <head>
            var htmlHeadNode = root.htmlElement.childNodes[0];

            html += '<div class="head indented node" id="astElement' + FBL.Firecrow.CodeMarkupGenerator.formatId(htmlHeadNode.nodeId) + '">'
                + this.generateOpeningTags(htmlHeadNode.type, htmlHeadNode.attributes);

            // generate <head> child nodes
            for (var i = 0; i < htmlHeadNode.childNodes.length; i++) {
                html += this.generateHtmlElement(htmlHeadNode.childNodes[i]);
            }

            // generate </head>
            html += this.generateClosingTags(htmlHeadNode.type) + '</div>';

            // generate <body>
            var htmlBodyNode = root.htmlElement.childNodes[2];
            html += '<div class="body indented node" id="astElement'
                + FBL.Firecrow.CodeMarkupGenerator.formatId(htmlBodyNode.nodeId) + '">'
                + this.generateOpeningTags(htmlBodyNode.type, htmlBodyNode.attributes);

            // generate <body> child nodes
            for (var i = 0; i < htmlBodyNode.childNodes.length; i++) {
                html += this.generateHtmlElement(htmlBodyNode.childNodes[i]);
            }
            // generate </body>
            html += this.generateClosingTags(htmlBodyNode.type) + '</div>';

            // generate </html>
            html += this.generateClosingTags(root.htmlElement.type) + '</div>';

            // close the main container
            html += '</div>';

            return html;
        }
        catch (e) {
            alert("Error while creating a HTML representation of the site: " + e);
        }
    },

    generateHtmlDocumentTypeTags:function (documentType) {
        var docTypeHtml = '<div class="documentType">';

        if (documentType == "") {
            docTypeHtml += '&#60;&#33;DOCTYPE html&#62;';
        }
        else if (documentType === "http://www.w3.org/TR/html4/strict.dtd") {
            docTypeHtml += '&#60;&#33;DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"&#62;';
        }
        else if (documentType === "http://www.w3.org/TR/html4/loose.dtd") {
            docTypeHtml += '&#60;&#33;DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&#62;';
        }
        else if (documentType === "http://www.w3.org/TR/html4/frameset.dtd") {
            docTypeHtml += '&#60;&#33;DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd"&#62;';
        }
        else if (documentType === "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd") {
            docTypeHtml += '&#60;&#33;DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"&#62;';
        }
        else if (documentType === "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd") {
            docTypeHtml += '&#60;&#33;DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&#62;';
        }
        else if (documentType === "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd") {
            docTypeHtml += '&#60;&#33;DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd"&#62;';
        }
        else if (documentType === "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd") {
            docTypeHtml += '&#60;&#33;DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"&#62;';
        }
        else {
            return "";
        }

        docTypeHtml += '</div>';
        return docTypeHtml;
    },

    generateOpeningTags:function (elementType, elementAttributes) {
        if (elementType === 'textNode')
            return '';

        var html = '';

        // generate <elementType attribute[0].name="attribute[0].value" ... attribute[N].name="attribute[N].value">
        // <elementType
        html += '&#60;' + '<span class="htmlTag">' + elementType + '</span>';
        for (var i = 0; i < elementAttributes.length; i++) {
            html += " " + '<span class="htmlAttributeName">' + elementAttributes[i].name + '</span>=';
            html += '"' + '<span class="htmlAttributeValue">' + elementAttributes[i].value + '</span>"';

        }
        // generate >
        html += '&#62;';

        return html;
    },

    generateClosingTags:function (elementType) {
        if (elementType === "textNode")
            return "";

        var html = "";
        html += '&#60;<span class="htmlTag">&#47;' + elementType + "</span>&#62;";
        return html;
    },

    generateHtmlElement:function (element) {
        try {
            var html = "";

            html += '<div class="' + element.type + " indented node" + '" id="astElement' + FBL.Firecrow.CodeMarkupGenerator.formatId(element.nodeId) + '">'
                + this.generateOpeningTags(element.type, element.attributes);

            if (element.type === "script") {
                var isExternScript = false;
                var _path = "";
                var _filename = "";

                // check if extern script
                for (var i = 0; i < element.attributes.length; i++) {
                    if (element.attributes[i].name === "src") {
                        isExternScript = true;
                        _path = element.attributes[i].value;
                    }
                }

                // -------------------------------

                FBL.Firecrow.ASTHelper.traverseAst(element.pathAndModel.model, function (currentElement, attributeName, parentElement) {
                    if (currentElement.type == undefined) {
                        return;
                    }
                    if (parentElement.children == null) {
                        parentElement.children = [];
                    }

                    parentElement.children.push(currentElement.type);

                    currentElement.parent = parentElement.type;
                });

                // -------------------------------

                if (isExternScript) {
                    var reFilename = new RegExp("[^/]*$", "g");
                    _filename = reFilename.exec(_path);
                    _path = _path.replace(_filename, "");

                    this.javascript.push(
                        {
                            path:_path,
                            name:_filename,
                            representation:FBL.Firecrow.CodeMarkupGenerator.generateHtml(element.pathAndModel.model)
                        }
                    );
                }
                else {
                    html += FBL.Firecrow.CodeMarkupGenerator.generateHtml(element.pathAndModel.model);
                }

            }
            else if (element.type === "link") {
                // Check if the link is a stylesheet
                var isLinkStyleSheet = false;
                var _path = "";

                for (var i = 0; i < element.attributes.length; i++) {
                    if (element.attributes[i] != undefined) {
                        if (element.attributes[i].name === "rel"
                            && element.attributes[i].value.toLowerCase() == "stylesheet") {
                            isLinkStyleSheet = true;
                        }
                        if (element.attributes[i].name === "type"
                            && element.attributes[i].value.toLowerCase() === "text/css") {
                            isLinkStyleSheet = true;
                        }

                        if (element.attributes[i].name === "href") {
                            _path = element.attributes[i].value;
                        }
                    }
                }

                if (isLinkStyleSheet) {
                    var reFilename = new RegExp("[^/]*$", "g");
                    _filename = reFilename.exec(_path);
                    _path = _path.replace(_filename, "");

                    this.cssStyle.push(
                        {
                            path:_path,
                            name:_filename,
                            representation:this.generateCSSRepresentation(element.pathAndModel.model)
                        }
                    );
                }
            }
            else if (element.type === "style") {
                html += this.generateCSSRepresentation(element.pathAndModel.model);
            }
            else {
                if (element.textContent != undefined)
                    html += element.textContent;

                for (var i = 0; i < element.childNodes.length; i++)
                    html += '<span class="htmlContent">' + this.generateHtmlElement(element.childNodes[i]) + '</span>';

            }

            if (this.doesElementHaveClosingTags(element.type))
                html += this.generateClosingTags(element.type);
            html += "</div>";

            return html;
        }
        catch (e) {
            alert("Error while generating a html element: " + e);
        }
    },

    generateCSSRepresentation:function (cssModel) {
        try {
            var html = "<div class=\"cssContainer\">";
            var cssRules = "";
            var rulesArray = [];
            for (var i = 0; i < cssModel.rules.length; i++) {
                // if rule is @charset
                if (cssModel.rules[i].cssText[0] == "@") {
                    html += '<div class="cssCharset node" id="astElement' + cssModel.rules[i].nodeId + '">' + cssModel.rules[i].cssText + '</div>';
                }
                else {
                    cssRules = cssModel.rules[i].cssText.replace(cssModel.rules[i].selector, "");

                    cssRules = cssRules.replace("{", "");
                    cssRules = cssRules.replace("}", "");
                    while (cssRules[0] === " ")
                        cssRules = cssRules.replace(" ", "");

                    html += '<div class="cssRulesContainer node" id="astElement' + FBL.Firecrow.CodeMarkupGenerator.formatId(cssModel.rules[i].nodeId) + '">';
                    //html += '<span class="cssSelector">' + cssModel.rules[i].selector + "</span><br>";
                    html += '<span class="cssSelector node">' + cssModel.rules[i].selector + '</span><br>';
                    html += "{ <br>";

                    rulesArray = cssRules.split("; ");

                    for (var j = 0; j < rulesArray.length; j++) {
                        if (rulesArray[j] != "")
                            html += '<span class="cssRule node">' + rulesArray[j] + ';</span><br>';
                    }
                    html += '} </div>';
                }
            }

            html += "</div>";
            return html;
        }
        catch (e) {
            alert("Error while generating HTML representation of CSS: " + e);
        }
    },

    doesElementHaveClosingTags:function (elementType) {
        return !(elementType === "area"
            || elementType === "base"
            || elementType === "br"
            || elementType === "basefont"
            || elementType === "col"
            || elementType === "frame"
            || elementType === "hr"
            || elementType === "img"
            || elementType === "input"
            || elementType === "meta"
            //|| elementType === "link"
            //|| elementType === "script"
            || elementType === "param");
    },

    destroyContent:function () {
        this.initialized = false;
        this.site = "";
        this.haveDependenciesBeenDetermined = false;
        this.dependencyGraph = null;
        this.pageModel = null;
        this.javascript.length = 0;
        this.cssStyle.length = 0;
    },

    createLinksBetweenHtmlAndModel:function (code, model) {
        try {
            //TODO: check for missing model elements
            FBL.Firecrow.ASTHelper.traverseAst(model, function (modelElement, propName) {
                if (propName === "pathAndModel" || modelElement.type === "Program") {
                    return;
                }

                var nodeId = "astElement" + FBL.Firecrow.CodeMarkupGenerator.formatId(modelElement.nodeId);
                var htmlNode = code.querySelector("#" + nodeId);

                if (htmlNode == null && modelElement.type == "TextNode") {
                    return;
                }
                if (htmlNode == null) {
                    return; // the tree containes node models for the whole page,
                    // it's normal if it doesn't find each one in the current document
                }

                modelElement.htmlNode = htmlNode;
                htmlNode.model = modelElement;
            });
        }
        catch (e) {
            alert("Error while creating links between HTML and ast model: " + e);
        }
    },

    establishDependencies:function (dependencyGraph) {
        try {
            var allNodes = dependencyGraph.nodes;

            for (var i = 0, length = allNodes.length; i < length; i++) {
                var node = allNodes[i];
                var nodeModel = node.model;

                if (nodeModel.dependencies == null) {
                    nodeModel.dependencies = [];
                }

                var edges = node.dataDependencies;

                for (var j = 0, dependencyLenght = edges.length; j < dependencyLenght; j++) {
                    nodeModel.dependencies.push(edges[j].destinationNode.model);
                }
            }
        }
        catch (e) {
            alert("Error while establishing dependencies: " + e);
        }
    }
};
