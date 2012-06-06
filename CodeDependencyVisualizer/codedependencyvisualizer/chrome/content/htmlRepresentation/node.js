/**
 * Created by Davor Badrov
 * Date: 6/2/12
 * Time: 11:01 AM
 * To change this template use File | Settings | File Templates.
 */

var node =
{
    /**
     * Holds the currently selected node
     */
    active: null,

    /**
     * Enables node selection/deselection
     *  if there isn't a selected node
     *      select the clicked one
     *  else
     *      if the selected node was previously active
     *          deselect it
     *      else
     *          deselect the previously active node
     *          select the clicked one
     */
    selectNode: function()
    {
        if (this.active == null)
        {
            this.active = this;
        }
        else
        {
            if (this.active.id == this.id)
            {
                this.active = null;
            }
            else
            {
                this.active = this;
            }
        }
    }
};