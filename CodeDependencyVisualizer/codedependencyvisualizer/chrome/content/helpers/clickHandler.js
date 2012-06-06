function clickHandler()
{
    var currentlySelectedElement = null;
    var hoverMenu = null;

    var selectables = $(".node");
    var scripts = $(".script");
    var styles= $(".style");
    var links = $(".link");

    for(var i = 0; i < selectables.length; i++)
    {
        selectables[i].addEventListener("click", stopEvent, false);
        selectables[i].addEventListener("click", selectElement, false);
    }

    if (links.length != undefined)
    {
        for(var i = 0; i < scripts.length; i++)
        {
            links[i].addEventListener("click", toggleStyles, false);
            links[i].addEventListener("click", stopEvent, false);
        }
    }
    else
    {
        links.addEventListener("click", toggleStyles, false);
        links.addEventListener("click", stopEvent, false);
    }

    if(scripts.length != undefined)
    {
        for(var i = 0; i < scripts.length; i++)
        {
            scripts[i].addEventListener("click", toggleScripts, false);
            scripts[i].addEventListener("click", stopEvent, false);
        }
    }
    else
    {
        scripts.addEventListener("click", toggleScripts, false);
        scripts.addEventListener("click", stopEvent, false);
    }

    if(styles.length != undefined)
    {
        for(var i = 0; i < styles.length; i++)
        {
            styles[i].addEventListener("click", toggleStyles, false);
           // styles[i].addEventListener("click", stopEvent, false);
        }
    }
    else
    {
        styles.addEventListener("click", toggleStyles, false);
    }

    function toggleShow()
    {
        if (this.children[0].getAttribute("style") == "display: none;")
        {
            for(var i = 0; i < this.children.length; i++)
                this.children[i].setAttribute("style", "display: block;");
        }
        else //null when not set or display: block; when set
        {
            for(var i = 0; i < this.children.length; i++)
                this.children[i].setAttribute("style", "display: none;");
        }
    }

    function toggleStyles()
    {
        var codeContainer = $(".cssContainer", this);

        if (codeContainer.getAttribute("style") == "display: none")
        {
            codeContainer.setAttribute("style", "display: block");
        }
        else //style is null when not set or when set it's display: block;
        {
            codeContainer.setAttribute("style", "display: none");
        }
    }

    function toggleScripts()
    {
        var codeContainer = $(".jsContainer", this);

        if (codeContainer.getAttribute("style") == "display: none")
        {
            codeContainer.setAttribute("style", "display: block");
        }
        else //style is null when not set or when set it's display: block;
        {
            codeContainer.setAttribute("style", "display: none");
        }
    }
    function toggleBlockCollapse()
    {
        var block = $(".BlockStatement", this.parentNode);

        //for(var i = 0; i < this.children.length; i++)
        //this.children[i].setAttribute("style", "display: none;");
        //if(block.hasAttribute("style", "display: none;"))
        //   block.setAttribute("style", "display: block;")
        //else

        if (block.getAttribute("style") == "display: none;")
        {
            block.setAttribute("style", "display: block;");
            // remove the "{...}" child of this.parentNode
            //this.parentNode.removeChild($(".CollapsedBlock", this.parentNode));
            // buggy code
            this.removeChild($(".CollapsedBlock", this));
        }
        else
        {
            block.setAttribute("style", "display: none;");

            var collapsedBlock = document.createElement("span");
            collapsedBlock.className = "CollapsedBlock";
            collapsedBlock.innerHTML = "{...}";
            console.log(this);
            console.log(this.parentNode);
            //this.parentNode.appendChild(collapsedBlock);
            this.parentNode.insertBefore(collapsedBlock, this);
        }

        this.insertBefore(collapsedBlock, this.children[0]);
    }

    //createCollapseButtons();
    // Create a collapse/decollapse button/div for each block statement
    function createCollapseButtons()
    {
        var blockStatements = $(".BlockStatement");

        for (var i = 0; i < blockStatements.length; i++)
        {
            var collapseButton = document.createElement("div");
            // Unused
            //collapseButton.id = "collapseButton";
            // Used for style
            collapseButton.className = "collapseButton";

            collapseButton.addEventListener("click", toggleBlockCollapse, false);

            blockStatements[i].parentNode.setAttribute("style", "position: relative");
            blockStatements[i].parentNode.insertBefore(collapseButton, blockStatements[i]);
        }
    }

    function selectElement()
    {
        // If there's already an active element, deselect it
        if (currentlySelectedElement != null)
        {
            removeClass(currentlySelectedElement, "active");
            console.log(currentlySelectedElement);
            hideDependencies(currentlySelectedElement.id);
        }

        // Assign the currently active element
        currentlySelectedElement = this;
        addClass(currentlySelectedElement, "active");

        showDependencies(currentlySelectedElement.id);

        createHoverMenu(this);
    }

    /**
     * Dissallows multiple events
     * i.e.: on click when there are multiple elements overlapping
     * @param ev
     */
    function stopEvent(ev)
    {
        ev.stopPropagation();
    }

    /**
     * Checks if there is a hoverMenu already created
     * if not it creates one, after that it updates's the
     * hover menu status based on the element sent as the parameter
     * @param element
     */
    function createHoverMenu(element)
    {
        if(hoverMenu == null)
        {
            hoverMenu = document.createElement("div");

            hoverMenu.id = "hoverMenu";
            hoverMenu.className = "hoverMenu";
        }

        hoverMenu.innerHTML = "Selected: " + formatClass(element.className) + "<br>"
                            + "ID: " + element.id + "<br>";

        console.log(element.model);

        var dependencies = "<br>";
        for (var i = 0; i < element.model.dataDependency.length; i++)
        {
            var _class = formatClass(document.getElementById(element.model.dataDependency[i]).className);

            dependencies += "&nbsp;" + _class +": " + element.model.dataDependency[i] + "<br>";
        }
        hoverMenu.innerHTML += "Data dependency: " + dependencies;

        dependencies = "<br>";
        for (var i = 0; i < element.model.structuralDependency.length; i++)
        {
            var _class = formatClass(document.getElementById(element.model.structuralDependency[i]).className);

            dependencies += "&nbsp;" + _class +": " + element.model.structuralDependency[i] + "<br>";
        }
        hoverMenu.innerHTML += "<br>Structural dependency: " + dependencies;



        hoverMenu.appendChild(createHoverMenuButtons());

        document.body.appendChild(hoverMenu);
    }

    function hoverMenuButtonClicked()
    {
        alert("A hover menu button has been clicked.\nActive ast element: "
            + currentlySelectedElement.id + "\nElement type: "
            + formatClass(currentlySelectedElement.className));

        showAllDependencies(currentlySelectedElement.id);
    }

    function createHoverMenuButtons()
    {
        var hoverMenuButton = document.createElement("div");

        hoverMenuButton.id = "hoverMenuButton";
        hoverMenuButton.className = "hoverMenuButton";

        hoverMenuButton.addEventListener("click", hoverMenuButtonClicked, false);

        return hoverMenuButton;
    }

    // Removes the Selectable & Selected class from the element for displaying purposes
    function formatClass(className)
    {
        var formattedClass = className.replace("active", "");
        formattedClass = formattedClass.replace("node", "");
        formattedClass = formattedClass.replace("dataDependency", "");
        formattedClass = formattedClass.replace("structuralDependency", "");
        return formattedClass;
    }
}