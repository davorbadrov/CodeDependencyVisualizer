encoder =
{
    /**     Enables escaping <br> and other HTML elements represented in strings
     *      An example if HTML in a string isn't escaped: te<br>st
     *      Shows as: te
     *                st
      */
    escapeHtml: function(str)
    {
        var div = document.createElement('div');
        var text = document.createTextNode(str);
        div.appendChild(text);
        return div.innerHTML;
    }
};