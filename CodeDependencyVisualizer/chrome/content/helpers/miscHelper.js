/** Selection Helper - jQuery Equivalent
 * Example Of Usage = $('.box');
 *
 * Looks up for elements with the specified selector
 * If el is specified it searches from the specified DOM element
 * Otherwise it searches the whole DOM document
 * Supports: Classes(".className"), Identifiers("#id"), CSS pseudo-classes  (":pseudo-class")
 * Returns: Array filled with nodes defined with the specified selectors
 *          or only one element( used for identifiers - #)
 */
function $(selector, el) {
    if (!el) {el = document;}

    var elements = Array.prototype.slice.call(el.querySelectorAll(selector));
    if (elements.length == 1) return elements[0];
    else return elements;
}

/* Add/Remove class Helpers */
function hasClass(ele,cls)
{
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls)
{
    if (!hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls)
{
    if (hasClass(ele,cls))
    {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}

function getRandomInteger(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* onload event handler */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
addLoadEvent(clickHandler);
addLoadEvent(codeFormatHandler);

