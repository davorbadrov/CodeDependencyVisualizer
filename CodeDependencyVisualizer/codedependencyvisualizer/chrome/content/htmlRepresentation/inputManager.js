/**
 * Created by Davor Badrov.
 * Date: 6/5/12
 * Time: 4:56 PM
 */

var InputManager =
{
    currentlySelectedElement: null,

    initialize: function(root)
    {
        var nodes = root.querySelectorAll(".node");

        for (var i = 0; i < nodes.length; i++)
        {
            nodes[i].addEventListener("click", this.stopEventPropagation);
            nodes[i].addEventListener("click", this.selectElement);
        }
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