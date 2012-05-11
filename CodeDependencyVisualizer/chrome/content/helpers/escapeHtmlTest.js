/**
 * Enables escaping HTML elements like <br>, <div>, <p> etc.
 * so they can be displayed as text
 * @param string
 *
 */
function escapeHtml(string)
{
    var div = document.createElement('div');
    var text = document.createTextNode(string);
    div.appendChild(text);
    return div.innerHTML;
}