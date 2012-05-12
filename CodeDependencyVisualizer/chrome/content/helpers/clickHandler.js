function clickHandler()
{
    var currentlySelectedElement = null;
    var hoverMenu = null;

    var selectables = $(".Selectable");
    var blockStatements = $(".BlockStatement");

    for(var i = 0; i < blockStatements.length; i++)
    {
        //blockStatements[i].addEventListener("click", collapseBlock, false);
    }

    for(var i = 0; i < selectables.length; i++)
    {
        selectables[i].addEventListener("click", stopEvent, false);
        selectables[i].addEventListener("click", handleClick, false);
    }

    function collapseBlock()
    {
        //this.innerHTML = "{...}";
    }

    function handleClick()
    {
        // If there's a selected element, deselect it removing it's "selected" properties
        // so there can't be two or more selected elements at the same time
        if (currentlySelectedElement != null)
        {
            removeClass(currentlySelectedElement, "Selected");
            //Deselect the element, remove its "selected" properties etc.
        }

        // Assign the currently selected element, attach the "selected" properties to it etc.
        currentlySelectedElement = this;
        addClass(currentlySelectedElement, "Selected");

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

        hoverMenu.appendChild(createHoverMenuButtons());

        document.body.appendChild(hoverMenu);
    }

    function hoverMenuButtonClicked()
    {
        alert("A hover menu button has been clicked.\nActive ast element: "
            + currentlySelectedElement.id + "\nElement type: "
            + formatClass(currentlySelectedElement.className));
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
        var formattedClass = className.replace("Selectable", "");
        formattedClass = formattedClass.replace("Selected", "");
        return formattedClass;
    }
}