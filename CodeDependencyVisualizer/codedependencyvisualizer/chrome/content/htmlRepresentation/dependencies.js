/**
 * Created by Davor Badrov
 * Date: 6/2/12
 * Time: 11:01 AM
 * To change this template use File | Settings | File Templates.
 */
var Dependencies =
{
    initialize: function(rootElement)
    {
        FBL.Firecrow.ASTHelper.traverseAst(rootElement, function(currentElement, attributeName, parentElement)
        {
            var node = document.getElementById("astElement" + formatId(currentElement.nodeId));
            if (node != null && hasClass(node, "node"))
            {
                node.model = {
                    dataDependency: [],
                    structuralDependency: []
                };

                if (currentElement.dataDependencies != undefined)
                {
                    node.model.dataDependency = currentElement.dataDependencies;
                }

                if (currentElement.structuralDependencies != undefined)
                {
                    node.model.structuralDependency = currentElement.structuralDependencies;
                }
            }
        });
    },

    showDirect: function(element)
    {
        try
        {
            this.showData(element);
            this.showStructural(element);
        }
        catch(e) { alert("Error while trying to show direct dependencies: " + e); }
    },

    showData: function(element)
    {
        if (element.model.dataDependency != undefined)
        {
            for (var i = 0; i < element.model.dataDependency.length; i++)
            {
                this.markDependency(element.model.dataDependency[i], "dataDependency");
            }
        }
    },

    showStructural: function(element)
    {
        if (element.model.structuralDependency != undefined)
        {
            for (var i = 0; i < element.model.structuralDependency.length; i++)
            {
                this.markDependency(element.model.structuralDependency[i], "structuralDependency");
            }
        }
    },

    showAll: function(element)
    {
        try
        {
            this.showAllData(element);
            this.showAllStructural(element)
        }
        catch(e) { alert("Error while trying to show all dependencies: " + e); }
    },

    showAllData: function(element)
    {
        try
        {
            if (element.model != undefined && element.model.dataDependency != undefined)
            {
                for (var i = 0; i < element.model.dataDependency.length; i++)
                {
                    this.markDependency(element.model.dataDependency[i]);
                    this.showAll(element.model.dataDependency[i]);
                }
            }
        }
        catch(e) { alert("Error while showing data dependencies: " + e); }
    },

    showAllStructural: function(element)
    {
        try
        {
            if (element.model != undefined && element.model.structuralDependency != undefined)
            {
                for (var i = 0; i < element.model.structuralDependency.length; i++)
                {
                    this.markDependency(element.model.structuralDependency[i]);
                    this.showAll(element.model.structuralDependency[i]);
                    this.showAll(element.model.structuralDependency[i]);
                }
            }
        }
        catch(e) { alert("Error while showing structural dependencies: " + e); }
    },

    markDependency: function(element, dependencyType)
    {
        try
        {
            addClass(element, dependencyType);
        }
        catch(e) { alert("Error while marking dependencies: " + e); }
    },

    hideAll: function()
    {
        try
        {
            this.hideData();
            this.hideStructural();
        }
        catch(e) { alert("Error while hiding dependencies: " + e); }
    },

    hideData: function()
    {
        var dataDependencies = document.getElementsByClassName("dataDependency");
        if (dataDependencies != undefined)
        {
            for (var i = 0; i < dataDependencies.length; i++)
            {
                removeClass(dataDependencies[i], "dataDependency");
            }
        }
    },

    hideStructural: function()
    {

        var structuralDependencies = document.getElementsByClassName("structuralDependency");
        if (structuralDependencies != undefined)
        {
            for (var i = 0; i < structuralDependencies.length; i++)
            {
                removeClass(structuralDependencies[i], "structuralDependency");
            }
        }
    }
};