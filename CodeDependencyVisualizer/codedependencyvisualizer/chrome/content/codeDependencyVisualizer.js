/**
 * Created by Davor Badrov.
 * Date: 6/4/12
 * Time: 3:24 PM
 */
FBL.ns(function() { with (FBL) {

    var panelName = "CodeDependencyVisualizer";
    var panelTitle = "Code Dependencies";
    //var root = FBL.Firebug.context.getPanel(panelName).panelNode;
    //FBL.Firebug.CodeDependencyModule.panel

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
        test: 1,
        showPanel: function(browser, panel)
        {
            try
            {
                var isCdvPanel = panel && panel.name == panelName;

                // Chrome changes in Firebug version 1.4
                var chrome = browser.chrome ? browser.chrome : Firebug.chrome;

                var cdvButtons = chrome.$("fbCodeDependencyVisualizerButtons");

                collapse(cdvButtons, !isCdvPanel);

                var cdvDynamicButtons = chrome.$("fbCodeDependencyVisualizerDynamicButtons");

                collapse(cdvDynamicButtons, !isCdvPanel);

                if (panel && (panel.name == panelName))
                {
                    var parentNode = panel.panelNode;
                    parentNode.innerHTML = "<div>Code dependency visualizer</div><div>Click \"Get page code\" to start</p>";
                }
//                //context = Firebug.currentContext;
//
//                //var panel = context.getPanel(panelName);
//
//
//                var parentNode = panel.panelNode;
//                parentNode.innerHTML = "<p>Click start to show page code!</p>";

//            var root = InitializePlate.InitializeTag.replace(
//                {}, parentNode, InitializePlate);

                // initialize html on start
//                htmlRepresentation.initialize(function()
//                {
//                    htmlRepresentation.determineDependencies();
//                    XulHelper.createMenus();
//                }, this);
            }
            catch(e) { alert("Error when showing panel: " + e); }
        },

        initContext: function()
        {
        },

        reattachContext: function()
        {
        },

        initialize: function()
        {
        },

        onGetPageCodeButton: function()
        {
            htmlRepresentation.destroyContent();

            htmlRepresentation.initialize(function()
            {
            }, this);

            // asynchronous function calls ? HTML doesn't get generated before calling this function or something
            //this.changePanelContent(htmlRepresentation.site);

        },

        onHtmlButton: function()
        {
            this.changePanelContent(htmlRepresentation.site);
        },

        changePanelContent: function(newContent)
        {
            var context = Firebug.currentContext;
            var panel = context.getPanel(panelName);
            var parentNode = panel.panelNode;

            parentNode.innerHTML = newContent;

            this.onPanelContentChange();
        },

        onPanelContentChange: function()
        {
            htmlRepresentation.initialized = false;
            htmlRepresentation.initialize();

            var codeContainer = this.getPanelContent();
            var model = htmlRepresentation.pageModel;

            htmlRepresentation.createLinksBetweenHtmlAndModel(codeContainer, model);
            htmlRepresentation.establishDependencies(htmlRepresentation.dependencyGraph);

            InputManager.initialize();
        },

        getPanelContent: function()
        {
            var context = Firebug.currentContext;
            var panel = context.getPanel(panelName);
            var parentNode = panel.panelNode;

            return parentNode;
        }

//        establishDependencies: function()
//        {
//
//        }
//        onJavascriptButton: function()
//        {
//            var panel = context.getPanel(panelName);
//            var parentNode = panel.panelNode;
//            parentNode.innerHTML = htmlRepresentation.javascript[2].representation;
//            InputManager.initialize();
//        },
//
//        onCssButton: function()
//        {
//            var panel = context.getPanel(panelName);
//            var parentNode = panel.panelNode;
//            parentNode.innerHTML = htmlRepresentation.cssStyle[0].representation;
//            InputManager.initialize();
//        },
//
//        onClearButton: function()
//        {
//            var panel = context.getPanel(panelName);
//            var parentNode = panel.panelNode;
//            parentNode.innerHTML = "";
//        }
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