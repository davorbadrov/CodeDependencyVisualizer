function codeFormatHandler()
{
    var codeHtmlContainer = $("#codeHtmlContainer");

    // for font-size: 14px, one line is 17 px high
    var lineHeight = 17;
    var numberOfLines = codeHtmlContainer.offsetHeight/lineHeight;
    createLineNumbers();
    createLineIndentation();

    function createLineIndentation()
    {
        var blocks = $(".BlockStatement");
//        Not all blocks are BlockStatements i.e. switch statements and object expressions
//        var switches = $(".SwitchStatement");

        for (var i = 0; i < blocks.length; i++)
        {
            for (var j = 0; j < blocks[i].children.length; j++)
            {
                if(!hasClass(blocks[i].children[j], "Bracket"))
                    blocks[i].children[j].setAttribute("style", "padding-left: 20px;");
            }
        }

//        // REFACTORING NEEDED
//        for (var x = 0; x < switches.length; x++)
//        {
//            for (var y = 0; y < switches[x].children.length; y++)
//            {
//                if(!hasClass(switches[x].children[y], "Bracket"))
//                    switches[x].children[y].setAttribute("style", "padding-left: 20px;");
//            }
//        }
    }

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