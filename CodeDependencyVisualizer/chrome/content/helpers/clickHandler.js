window.onload = function()
{
/** Selection Helper - jQuery Equivalent
 * Example Of Usage = $('.box');
 *
 * Looks up for elements with the specified selector
 * If el is specified it searches from the specified DOM element
 * Otherwise it searches the whole DOM document
 * Supports: Classes(".className"), Identifiers("#"), CSS... something(:)
 * Returns: Array filled with nodes with the specified identifiers
 */
function $(selector, el) {
    if (!el) {el = document;}
    return Array.prototype.slice.call(el.querySelectorAll(selector));
}

var test = [];
test = $(".ForStatement");
var hit = 0;

for(var i = 0; i < test.length; i++)
{
    test[i].addEventListener("click", stopEvent, false);
    test[i].addEventListener("click", handleClick, false);
    //console.log(test[i].innerHTML);
}
function handleClick()
{
    alert("Clicked on: " + this.className + ", " + this.id);
}

function stopEvent(ev)
{
    ev.stopPropagation();
}
}