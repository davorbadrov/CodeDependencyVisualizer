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
    menusCreated: false,
    createMenus: function()
    {

        // menusCreated: used to avoid multiple javascript & css menu creation
        // reason: initialize is called every time firebug panel is changed
        if (!this.menusCreated)
        {
            var toolbar, menupopup = null;
            var name, oncommand, menuitem = null;
            var buttonContainer = null;

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

                buttonContainer = document.getElementById("fbCodeDependencyVisualizerButtons");
                buttonContainer .appendChild(toolbar);
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

                buttonContainer = document.getElementById("fbCodeDependencyVisualizerButtons");
                buttonContainer.appendChild(toolbar);
            }

            this.menusCreated = true;
        }
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

    createMenuItem: function(menuitemLabel, menulabelOnCommand, menuLabelValue)
    {
        const XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

        var menuitem = document.createElementNS(XUL_NS, "menuitem");

        if (menuitemLabel != undefined) menuitem.setAttribute("label", menuitemLabel);
        if (menulabelOnCommand != undefined) menuitem.setAttribute("oncommand", menulabelOnCommand);
        if (menuLabelValue != undefined) menuitem.setAttribute("value", menuLabelValue);

        return menuitem;
    }
};

//function createMenus()
//{
//    var toolbar, menupopup = null;
//    var name, oncommand, menuitem = null;
//    var buttonContainer = null;
//
//    // for Javascript
//    if (htmlRepresentation.javascript.length > 0)
//    {
//        toolbar = createToolbarButton("cdvJavascriptMenu", "Javascript", "menu");
//        menupopup = createMenuPopup("cdvJavascriptMenuPopup");
//
//        toolbar.appendChild(menupopup);
//
//        for (var i = 0; i < htmlRepresentation.javascript.length; i++)
//        {
//            name = htmlRepresentation.javascript[i].name;
//            oncommand = "alert (\"script \"" + i + "\" pressed\");";
//
//            menuitem = createMenuItem(name, oncommand, i);
//            menupopup.appendChild(menuitem);
//        }
//
//        buttonContainer = document.getElementById("fbCodeDependencyVisualizerButtons");
//        buttonContainer .appendChild(toolbar);
//    }
//
//    // for CSS
//    if (htmlRepresentation.cssStyle.length > 0)
//    {
//        toolbar = createToolbarButton("cdvCssMenu", "CSS", "menu");
//        menupopup = createMenuPopup("cdvCssMenuPopup");
//
//        toolbar.appendChild(menupopup);
//
//        for (var i = 0; i < htmlRepresentation.cssStyle.length; i++)
//        {
//            name = htmlRepresentation.cssStyle[i].name;
//            oncommand = "alert('test');";
//
//            menuitem = createMenuItem(name, oncommand, i);
//            menupopup.appendChild(menuitem);
//        }
//
//        buttonContainer = document.getElementById("fbCodeDependencyVisualizerButtons");
//        buttonContainer.appendChild(toolbar);
//    }
//}
//
//function createToolbarButton(_id, _label, _type)
//{
//    const XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
//
//    var toolbarbutton = document.createElementNS(XUL_NS, "toolbarbutton");
//
//    if (_id != undefined) toolbarbutton.setAttribute("id", _id);
//    if (_label != undefined) toolbarbutton.setAttribute("label", _label);
//    if (_type != undefined) toolbarbutton.setAttribute("type", _type);
//
//    return toolbarbutton;
//}
//
//function createMenuPopup(_id, _onpopupshowing, _onpopuphiding)
//{
//    const XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
//
//    var menupopup = document.createElementNS(XUL_NS, "menupopup");
//
//    if (_id != undefined) menupopup.setAttribute("id", _id);
//    if (_onpopupshowing != undefined) menupopup.setAttribute("onpopupshowing", _onpopupshowing);
//    if (_onpopuphiding != undefined) menupopup.setAttribute("onpopuphiding", _onpopuphiding);
//
//    return menupopup;
//}
//
//function createMenuItem(_label, _oncommand, _value)
//{
//    const XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
//
//    var menuitem = document.createElementNS(XUL_NS, "menuitem");
//
//    if (_label != undefined) menuitem.setAttribute("label", _label);
//    if (_oncommand != undefined) menuitem.setAttribute("oncommand", _oncommand);
//    if (_value != undefined) menuitem.setAttribute("value", _value);
//
//    return menuitem;
//}