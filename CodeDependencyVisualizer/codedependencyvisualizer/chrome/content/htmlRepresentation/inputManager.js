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
                    if (!hasClass(currentItem.htmlNode, "selected")) {
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
                    if (!hasClass(dependency.htmlNode, "selected") && !hasClass(dependency.htmlNode, "dependent")) {
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
//        // TODO: some nodes are empty (like text nodes), need to fix that, same applies for selectNextNode()
//        var document = Firebug.CodeDependencyModule.getPanelContent();
//
//        var previousSelected = document.querySelector(".selected");
//
//        if (previousSelected == null) { return; } // need for error messages?
//
//        var idNumber = previousSelected.model.nodeId - 1; // problem w/ textNodes and similar stuff...
//        var astId = "astElement" + FBL.Firecrow.CodeMarkupGenerator.formatId(idNumber);
//
//        var selected = document.querySelector("#" + astId);
//
//        if (selected == null) { return; }
//        while (selected.model.type == "textNode" && selected.model.textContent == "") {
//
//        }
//
//        InputManager.deselectAllCodeElements();
//
//        InputManager.selectNode(selected);
//
//        InputManager.selectDependencies(selected);

        const document = Firebug.CodeDependencyModule.getPanelContent();

        var allNodes = document.querySelectorAll(".node");
        var currentNode = document.querySelector(".selected");

        for (var i = 0; i < allNodes.length; i++) {
            if (currentNode == allNodes[i]) {
                InputManager.deselectAllCodeElements();
                // make sure not to select empty textNode (ast tree artefacts?)
                //while (hasClass(allNodes[i], "textNode") && allNodes[i].textContent != "") i++;
                while (i > 0 && hasClass(allNodes[i-1], "textNode") && allNodes[i-1].innerHTML != "")
                    --i;

                if (i > 0)
                    InputManager.selectNode(allNodes[--i]);
                return;
            }
        }
    },

    selectNextNode:function () {
//        var document = Firebug.CodeDependencyModule.getPanelContent();
//
//        var previousSelected = document.querySelector(".selected");
//
//        if (previousSelected == null) {
//            return;
//        } // need for error messages?
//
//        var idNumber = previousSelected.model.nodeId + 1;
//        var astId = "astElement" + FBL.Firecrow.CodeMarkupGenerator.formatId(idNumber);
//
//        var selected = document.querySelector("#" + astId);
//
//        if (selected == null) {
//            return;
//        }
//
//        InputManager.deselectAllCodeElements();
//
//        InputManager.selectNode(selected);
//
//        InputManager.selectDependencies(selected);
        const document = Firebug.CodeDependencyModule.getPanelContent();

        var allNodes = document.querySelectorAll(".node");
        var currentNode = document.querySelector(".selected");

        for (var i = 0; i < allNodes.length; i++) {
            if (currentNode == allNodes[i]) {
                InputManager.deselectAllCodeElements();
                // make sure not to select empty textNode (ast tree artefacts?)
                //while (hasClass(allNodes[i], "textNode") && allNodes[i].textContent != "") i++;
                while (hasClass(allNodes[i+1], "textNode") && allNodes[i+1].innerHTML != "" && i < allNodes.length) ++i;
                InputManager.selectNode(allNodes[++i]);
                return;
            }
        }
    }
};