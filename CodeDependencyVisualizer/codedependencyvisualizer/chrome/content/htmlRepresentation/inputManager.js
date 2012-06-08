/**
 * Created by Davor Badrov.
 * Date: 6/5/12
 * Time: 4:56 PM
 */
var InputManager =
{
    currentlySelectedElement: null,

    initialize: function()
    {
        try
        {
            var nodes = content.document.querySelectorAll(".node");

            alert(nodes);
            alert(nodes.length);
        }
        catch (e) { alert("Error while initializing input manager: " + e); }
//        var doc = undefined;
//
//        if (content != undefined)
//        {
//            doc = content.document;
//        }
//        else
//        {
//            doc = document;
//        }

        //var nodes = document.getElementsByClassName("node");
        //alert(document);
//        var nodes = context.window.document.querySelectorAll(".node");
//
//        alert(nodes);
//        alert(nodes.length);

        //var node = context.document.getElementById("astElement002145");
//        alert(node);
//        alert(nodes);
//
//        for (var i = 0; i < nodes.length; i++)
//        {
//            nodes[i].addEventListener("click", this.stopEventPropagation);
//            nodes[i].addEventListener("click", this.selectElement);
//        }
    },

    selectElement: function()
    {
        if (InputManager.currentlySelectedElement != null)
        {
            removeClass(InputManager.currentlySelectedElement, "active");
//            Dependencies.HideAll();
        }

        InputManager.currentlySelectedElement = this;
        addClass(InputManager.currentlySelectedElement, "active");

//        Dependencies.ShowDirect(this.currentylSelectedElement);
    },

    stopEventPropagation: function(ev)
    {
        ev.stopPropagation();
    }
}