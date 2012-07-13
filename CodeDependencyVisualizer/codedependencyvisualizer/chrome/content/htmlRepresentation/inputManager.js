/**
 * Created by Davor Badrov.
 * Date: 6/5/12
 * Time: 4:56 PM
 */

var InputManager =
{
    initialize: function(documentRoot)
    {
        try
        {
            var nodes = documentRoot.querySelectorAll(".node");

            for (var i = 0; i < nodes.length; i++)
            {
                nodes[i].onclick = function(eventArgs)
                {
                    eventArgs.cancelBubble = true;

                    InputManager.deselectAllCodeElements(documentRoot);

                    InputManager.selectNode(this);
                    //this.classList.add("selected");

                    InputManager.selectDependencies(this);
                }
            }
        }
        catch (e) { alert("Error while initializing input: " + e); }
    },

    deselectAllCodeElements: function(documentRoot)
    {
        var currentlySelected = documentRoot.querySelectorAll(".selected");
        var currentlyDependent = documentRoot.querySelectorAll(".dependent");
        var currentlySecondDependent = documentRoot.querySelectorAll(".secondHandDependency");

        for(var i = 0; i < currentlySelected.length; i++)
        {
            currentlySelected[i].classList.remove("selected");
        }

        for(var i = 0; i < currentlyDependent.length; i++)
        {
            currentlyDependent[i].classList.remove("dependent");
        }

        for(var i = 0; i < currentlySecondDependent.length; i++)
        {
            currentlySecondDependent[i].classList.remove("secondHandDependency");
        }
    },

    getAllDependencies: function(item, result)
    {
        if (item == null) { return result; }

        var dependecies = item.dependencies;

        for (var i = 0; i < dependecies.length; i++)
        {
            var currItem = dependecies[i];
            if (result[currItem.nodeId] != null) { continue; }

            result[currItem.nodeId] = currItem;

            this.getAllDependencies(currItem, result);
        }
    },

    selectDependencies: function(htmlNode)
    {
        if (htmlNode == null) { alert("A node has to be selected to get it's dependencies."); return; }

        var dependencies = htmlNode.model.dependencies;

        if (dependencies == null) { return; }

        for (var j = 0; j < dependencies.length; j++)
        {
            var currentItem = dependencies[j];
            var allDependencies = {};
            InputManager.getAllDependencies(currentItem, allDependencies);

            for (var nodeId in allDependencies)
            {
                var dependency = allDependencies[nodeId];
                if (dependency.htmlNode != null)
                {
                    dependency.htmlNode.classList.add("secondHandDependency");
                }
                else {
                    // maybe it's dependent upon a variable/element from another source file
                    // therefore it can be normal if it isn't found
                }
            }

            if (currentItem.htmlNode != null)
            {
                currentItem.htmlNode.classList.add("dependent");
            }
            else
            {
                // direct dependency could also be in another source files
                // check former comment
            }
        }
    },

    selectNode: function(htmlNode)
    {
        htmlNode.classList.add("selected");

        //var class = FBL.Firecrow.CodeMarkupGenerator.
        XulHelper.updateSelectedNodeLabel(htmlNode.id, htmlNode.classList[0]);
    },

    selectPreviousNode: function()
    {
        var document = Firebug.CodeDependencyModule.getPanelContent();

        var previousSelected = document.querySelector(".selected");

        if (previousSelected == null) { return; } // need for error messages?

        var idNumber = previousSelected.model.nodeId - 1;
        var astId = "astElement" + FBL.Firecrow.CodeMarkupGenerator.formatId(idNumber);

        var selected = document.querySelector("#" + astId);

        if (selected == null) { return; }

        InputManager.deselectAllCodeElements(document);

        InputManager.selectNode(selected);

        InputManager.selectDependencies(selected);
    },

    selectNextNode: function()
    {
        var document = Firebug.CodeDependencyModule.getPanelContent();

        var previousSelected = document.querySelector(".selected");

        if (previousSelected == null) { return; } // need for error messages?

        var idNumber = previousSelected.model.nodeId + 1;
        var astId = "astElement" + FBL.Firecrow.CodeMarkupGenerator.formatId(idNumber);

        var selected = document.querySelector("#" + astId);

        if (selected == null) { return; }

        InputManager.deselectAllCodeElements(document);

        InputManager.selectNode(selected);

        InputManager.selectDependencies(selected);
    }
}