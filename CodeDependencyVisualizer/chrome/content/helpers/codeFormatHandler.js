function codeFormatHandler()
{
    var codeHtmlContainer = $("#codeHtmlContainer");
    // for font-size: 14px, one line is 17 px high
    var lineHeight = 17;
    var numberOfLines = codeHtmlContainer.offsetHeight/lineHeight;
    createLineNumbers();

    function createLineNumbers()
    {
        var lineNumberDiv = document.createElement("div");
        lineNumberDiv.id = "lineNumberContainer";

        for (var i = 1; i <= numberOfLines; i++)
        {
            lineNumberDiv.innerHTML += i + "<br>";
        }

        document.body.insertBefore(lineNumberDiv, document.body.firstChild);
    }
}