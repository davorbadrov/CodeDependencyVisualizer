/**
 * Created by Davor Badrov.
 * Date: 6/12/12
 * Time: 2:10 PM
 */
// Usedd for creating Javascript and CSS menus(only if there are any JS and CSS files in the site)
// Creating pattern:
//	<toolbarbutton id="..." label="..." type="...">
//		<menupopup id="..." onpopupshowing="..." onpopuphiding="..." >
//			<menuitem label="..." value="..." oncommand="..." />
//			<menuitem label="..." value="..." oncommand="..." />
//			<menuitem label="..." value="..." oncommand="..." />
//		</menupopup>
//	</toolbarbutton>
var XulHelper =
{
    isMenuCreated: false,
    buttonContainerId: "fbCodeDependencyVisualizerDynamicButtons",
    createUI: function()
    {
        if (this.isMenuCreated)
        {
            this.destroyUI();
        }

        var toolbar, menupopup = null;
        var name, oncommand, menuitem = null;
        var buttonContainer = document.getElementById(this.buttonContainerId);

        // create a toolbar separator
        buttonContainer.appendChild(this.createSeparator());

        // create a HTML button
        var htmlButton = this.createHtmlButton();

        buttonContainer.appendChild(htmlButton);

        // for Javascript
        if (htmlRepresentation.javascript.length > 0)
        {
            toolbar = this.createToolbarButton("cdvJavascriptMenu", "Javascript", "menu");
            menupopup = this.createMenuPopup("cdvJavascriptMenuPopup");

            toolbar.appendChild(menupopup);

            for (var i = 0; i < htmlRepresentation.javascript.length; i++)
            {
                name = htmlRepresentation.javascript[i].name;

                // awful code -.-
                // function has to be given as a string, hard-coded values need to be passed
                oncommand = "Firebug.CodeDependencyModule.changePanelContent(htmlRepresentation.javascript[" + i + " ].representation);";

                menuitem = this.createMenuItem(name, oncommand, i);
                menupopup.appendChild(menuitem);
            }

            buttonContainer.appendChild(toolbar);
        }


        // for CSS
        if (htmlRepresentation.cssStyle.length > 0)
        {
            toolbar = this.createToolbarButton("cdvCssMenu", "CSS", "menu");
            menupopup = this.createMenuPopup("cdvCssMenuPopup");

            toolbar.appendChild(menupopup);

            for (var i = 0; i < htmlRepresentation.cssStyle.length; i++)
            {
              name = htmlRepresentation.cssStyle[i].name;
              oncommand = "Firebug.CodeDependencyModule.changePanelContent(htmlRepresentation.cssStyle[" + i + " ].representation);";

              menuitem = this.createMenuItem(name, oncommand, i);
              menupopup.appendChild(menuitem);
            }

            buttonContainer.appendChild(toolbar);
        }

        // navigational buttons
        var toolbar = document.getElementById("fbToolbarInner");
        var navigation = this.createElementNavigationButtons();
        toolbar.appendChild(navigation);

        this.isMenuCreated = true;
    },

    createToolbarButton: function(toolbarId, toolbarLabel, toolbarType)
    {
        const XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

        var toolbarbutton = document.createElementNS(XUL_NS, "toolbarbutton");

        if (toolbarId != undefined) toolbarbutton.setAttribute("id", toolbarId);
        if (toolbarLabel != undefined) toolbarbutton.setAttribute("label", toolbarLabel);
        if (toolbarType != undefined) toolbarbutton.setAttribute("type", toolbarType);

        return toolbarbutton;
    },

    createMenuPopup: function(menupopupId, onMenupopupShowing, onMenupopupHiding)
    {
        const XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

        var menupopup = document.createElementNS(XUL_NS, "menupopup");

        if (menupopupId != undefined) menupopup.setAttribute("id", menupopupId);
        if (onMenupopupShowing != undefined) menupopup.setAttribute("onpopupshowing", onMenupopupShowing);
        if (onMenupopupHiding != undefined) menupopup.setAttribute("onpopuphiding", onMenupopupHiding);

        return menupopup;
    },

    createMenuItem: function(menuitemLabel, menulabelOnCommand, menuitemValue)
    {
        const XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

        var menuitem = document.createElementNS(XUL_NS, "menuitem");

        if (menuitemLabel != undefined) menuitem.setAttribute("label", menuitemLabel);
        if (menulabelOnCommand != undefined) menuitem.setAttribute("oncommand", menulabelOnCommand);
        if (menuitemValue != undefined) menuitem.setAttribute("value", menuitemValue);

        menuitem.setAttribute("type", "radio");

        return menuitem;
    },

    createHtmlButton: function()
    {
        const XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

        var htmlButton = document.createElementNS(XUL_NS, "toolbarbutton");
        htmlButton.setAttribute("id", "cdvHtmlButton");
        htmlButton.setAttribute("label", "HTML");
        htmlButton.setAttribute("tooltiptext", "Click to display HTML.");
        htmlButton.setAttribute("command", "cmd_cdvHtmlButton");

        return htmlButton;
    },

    createElementNavigationButtons: function()
    {
        const XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

        var navigationMenuHBox = document.createElementNS(XUL_NS, "hbox");
        navigationMenuHBox.setAttribute("id", "fbCodeDependencyVisualizerNavigationButtons");

        var selectUpButton = this.createButton("selectUpButton", "▲ ", "Select previous ast element", "InputManager.selectPreviousNode();");
        var selectDownButton = this.createButton("selectDownButton", "▼ ", "Select next ast element", "InputManager.selectNextNode();");
        var selectedElementLabel = this.createLabel("Selected: none");

        navigationMenuHBox.appendChild(this.createSeparator());
        navigationMenuHBox.appendChild(selectUpButton);
        navigationMenuHBox.appendChild(selectDownButton);
        navigationMenuHBox.appendChild(this.createSeparator());
        navigationMenuHBox.appendChild(selectedElementLabel);

        return navigationMenuHBox;
    },

    createSeparator: function()
    {
        const XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

        var separator = document.createElementNS(XUL_NS, "toolbarseparator");

        return separator;
    },

    createButton: function(id, label, tooltiptext, oncommand)
    {
        const XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

        var button = document.createElementNS(XUL_NS, "toolbarbutton");
        button.setAttribute("id", id);
        button.setAttribute("label", label);
        button.setAttribute("tooltiptext", tooltiptext);
        button.setAttribute("oncommand", oncommand);

        return button;
    },

    createLabel: function(labelText)
    {
        const XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

        var label = document.createElementNS(XUL_NS, "label");
        label.setAttribute("value", labelText);
        label.setAttribute("style", "padding-top: 3px;");   // to keep text in line with buttons

        return label;
    },

    updateSelectedNodeLabel: function(nodeId, nodeClass)
    {
        if (nodeId == null || nodeClass == null) { return; }

        var navigationMenu = document.getElementById("fbCodeDependencyVisualizerNavigationButtons");
        var label = navigationMenu.getElementsByTagName("label");

        var labelText = "Selected: " + nodeId + ", " + nodeClass + ".";
        label[0].setAttribute("value", labelText);
    },

    destroyUI: function()
    {
        var buttonContainer = document.getElementById(this.buttonContainerId);

        while (buttonContainer.hasChildNodes())
        {
            buttonContainer.removeChild(buttonContainer.firstChild);
        }

        var navigation = document.getElementById("fbCodeDependencyVisualizerNavigationButtons");

        if (navigation != null)
        {
            navigation.parentNode.removeChild(navigation);
        }

        this.isMenuCreated = false;
    }
};