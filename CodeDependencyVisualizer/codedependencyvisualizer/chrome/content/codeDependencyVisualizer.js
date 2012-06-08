/**
 * Created by Davor Badrov.
 * Date: 6/4/12
 * Time: 3:24 PM
 */
FBL.ns(function() { with (FBL) {

    var panelName = "CodeDependencyVisualizer";
    var panelTitle = "Code Dependencies";

//	var InitializePlate = domplate(
//	{
//		InitializeTag:
//			DIV({class: "default"},
//					"The " + panelTitle + " panel has just been opened."
//			)
//	});

    /************************************************************
     * 															*
     * 					Module Implementation					*
     *															*
     ************************************************************/

    Firebug.CodeDependencyModule = extend(Firebug.Module,
    {
        showPanel: function(browser, panel)
        {
            var isHwPanel = panel && panel.name == panelName;
            var hwButtons = browser.chrome.$("fbFirebugExtensionButtons");
            collapse(hwButtons, !isHwPanel);

//            // Write a message when panel gets active
            context = Firebug.currentContext;

            var panel = context.getPanel(panelName);
            var parentNode = panel.panelNode;
//            var root = InitializePlate.InitializeTag.replace(
//                {}, parentNode, InitializePlate);

            // initialize html on start
            htmlRepresentation.initialize();
        },

        onHtmlButton: function()
        {
            var panel = context.getPanel(panelName);
            var parentNode = panel.panelNode;
            parentNode.innerHTML = htmlRepresentation.site;
            InputManager.initialize();
        },

        onTestButton1: function()
        {
            var panel = context.getPanel(panelName);
            var parentNode = panel.panelNode;
            parentNode.innerHTML = htmlRepresentation.javascript[2].representation;
        },

        onTestButton2: function()
        {
            var panel = context.getPanel(panelName);
            var parentNode = panel.panelNode;
            parentNode.innerHTML = htmlRepresentation.cssStyle[0].representation;

        },

        onClearButton: function()
        {
            var panel = context.getPanel(panelName);
            var parentNode = panel.panelNode;
            parentNode.innerHTML = "";
        }
    });


    /************************************************************
     * 															*
     * 					Panel Implementation					*
     *															*
     ************************************************************/

    function CodeDependencyPanel() {}
    CodeDependencyPanel.prototype = extend(Firebug.Panel,
    {
        name: panelName,
        title: panelTitle,

        initialize: function()
        {
            Firebug.Panel.initialize.apply(this, arguments);
        }
    });


    /************************************************************
     * 															*
     * 		Registering Panel, Module and CSS Styles			*
     *															*
     ************************************************************/

    Firebug.registerPanel(CodeDependencyPanel);
    Firebug.registerModule(Firebug.CodeDependencyModule);
    Firebug.registerStylesheet("chrome://codedependencyvisualizer/skin/style.css");
}});