/**
 * Created by Davor Badrov.
 * Date: 6/5/12
 * Time: 4:56 PM
 */

var InputManager =
{
    initialize:function () {
        try {
            const document = Firebug.CodeDependencyModule.getPanelContent();

            var nodes = document.querySelectorAll(".node");

            for (var i = 0; i < nodes.length; i++) {
                nodes[i].onclick = function (eventArgs) {
                    eventArgs.cancelBubble = true;

                    InputManager.selectNode(this);
                }
            }
        }
        catch (e) {
            alert("Error while initializing input: " + e);
        }
    },

    deselectAllCodeElements:function () {
        const document = Firebug.CodeDependencyModule.getPanelContent();

        var currentlySelected = document.querySelectorAll(".selected");
        var currentlyDependent = document.querySelectorAll(".dependent");
        var currentlySecondDependent = document.querySelectorAll(".secondHandDependency");

        for (var i = 0; i < currentlySelected.length; i++) {
            currentlySelected[i].classList.remove("selected");
        }

        for (var i = 0; i < currentlyDependent.length; i++) {
            currentlyDependent[i].classList.remove("dependent");
        }

        for (var i = 0; i < currentlySecondDependent.length; i++) {
            currentlySecondDependent[i].classList.remove("secondHandDependency");
        }
    },

    getAllDependencies:function (item, result) {
        if (item == null) {
            return result;
        }

        var dependecies = item.dependencies;

        for (var i = 0; i < dependecies.length; i++) {
            var currItem = dependecies[i];
            if (result[currItem.nodeId] != null) {
                continue;
            }

            result[currItem.nodeId] = currItem;

            this.getAllDependencies(currItem, result);
        }
    },

    selectDependencies:function (htmlNode) {
        if (htmlNode == null) {
            alert("A node has to be selected to get it's dependencies.");
            return;
        }

        var dependencies = htmlNode.model.dependencies;

        if (dependencies == null) {
            return;
        }

        for (var j = 0; j < dependencies.length; j++) {
            var currentItem = dependencies[j];
            var allDependencies = {};
            InputManager.getAllDependencies(currentItem, allDependencies);

            for (var nodeId in allDependencies) {

                if (currentItem.htmlNode != null) {
                    // not to hide higher priority dependencies
                    if (!hasClass(currentItem.htmlNode, "selected")
                     || !hasClass(currentItem.htmlNode.parentNode, "selected")
                     && !this.doesParentHaveAHigherPriorityDependency(currentItem.htmlNode, "dependent")
                    ) {
                        currentItem.htmlNode.classList.add("dependent");
                    }
                }
                else {
                    // direct dependency could also be in another source files
                    // check former comment
                }

                var dependency = allDependencies[nodeId];
                if (dependency.htmlNode != null) {
                    // not to hide higher priority dependencies
                    if (!hasClass(dependency.htmlNode, "selected")
                     && !hasClass(dependency.htmlNode, "dependent")
                     && !this.doesParentHaveAHigherPriorityDependency(dependency.htmlNode, "secondHandDependency"))
                    {
                        dependency.htmlNode.classList.add("secondHandDependency");
                    }

                }
                else {
                    // maybe it's dependent upon a variable/element from another source file
                    // therefore it can be normal if it isn't found
                }
            }
        }
    },

    selectNode:function (htmlNode) {
        InputManager.deselectAllCodeElements();
        htmlNode.classList.add("selected");
        InputManager.selectDependencies(htmlNode);
        XulHelper.updateSelectedNodeLabel(htmlNode.id, htmlNode.classList[0]);
    },

    selectPreviousNode:function () {

        const document = Firebug.CodeDependencyModule.getPanelContent();

        var allNodes = document.querySelectorAll(".node");
        var currentNode = document.querySelector(".selected");

        for (var i = 0; i < allNodes.length; i++) {
            if (currentNode == allNodes[i]) {

                // make sure not to select empty textNode (ast tree artefacts?)
                //while (hasClass(allNodes[i], "textNode") && allNodes[i].textContent != "") i++;
                while (i > 0 && hasClass(allNodes[i-1], "textNode") && allNodes[i-1].innerHTML != "")
                    --i;

                if (i-1 < 0) { return; }

                InputManager.deselectAllCodeElements();
                InputManager.selectNode(allNodes[--i]);

                return;
            }
        }
    },

    selectNextNode:function () {

        const document = Firebug.CodeDependencyModule.getPanelContent();

        var allNodes = document.querySelectorAll(".node");
        var currentNode = document.querySelector(".selected");

        for (var i = 0; i < allNodes.length; i++) {
            if (currentNode == allNodes[i]) {
                // make sure not to select empty textNode (ast tree artefacts?)
                //while (hasClass(allNodes[i], "textNode") && allNodes[i].textContent != "") i++;
                while (hasClass(allNodes[i+1], "textNode") && allNodes[i+1].innerHTML != "" && i < allNodes.length) ++i;

                if (i >= allNodes.length) { return; } // element range check

                InputManager.deselectAllCodeElements();
                InputManager.selectNode(allNodes[++i]);

                return;
            }
        }
    },

    // check if the parent element has a higher priority dependency, to avoid markup clashes
    doesParentHaveAHigherPriorityDependency: function(htmlNode, dependencyType) {
    try
    {
        var elementParent = htmlNode.parentNode;

        // if element is directly dependent, only higher priority is selected
        if (dependencyType === "dependent")
        {
            while (elementParent != null && elementParent.className != undefined)
            {
                if (hasClass(elementParent, "selected"))
                {
                    return true;
                }
            }

            elementParent = elementParent.parentNode;
        }
        else  // dependency type is secondHandDependency
        {
            while (elementParent != null && elementParent.className != undefined)
            {
                if (hasClass(elementParent, "selected") || hasClass(elementParent, "dependent"))
                {
                    return true;
                }

                elementParent = elementParent.parentNode;
            }
        }

        return false;
    }
    catch (e) { alert("Error in evaluating dependency priorities: " + e); }
    }
};