function bindDependencies(root)
{
    FBL.Firecrow.ASTHelper.traverseAst(root, function(currentElement, attributeName, parentElement)
    {
        var node = document.getElementById("astElement" + formatId(currentElement.nodeId));
        if (node != null && hasClass(node, "node"))
        {
            node.model = {
                dataDependency: [],
                structuralDependency: []
            };

            if (currentElement.dataDependencies != undefined)
            {
                node.model.dataDependency = currentElement.dataDependencies;
            }

            if (currentElement.structuralDependencies != undefined)
            {
                node.model.structuralDependency = currentElement.structuralDependencies;
            }

//            node.model = {
//                dataDependency: currentElement.dataDependencies,
//                structuralDependency: currentElement.structuralDependencies
//            };
        }
    });
}

function showDependencies(elementId)
{
    var node = document.getElementById(elementId);
    var dependency = null;

    if (node != null)
    {
        for (var i = 0; i < node.model.dataDependency.length; i++)
        {
            dependency = document.getElementById(node.model.dataDependency[i]);
            if (dependency != undefined)
            {
                addClass(dependency, "dataDependency");
            }
        }

        for (var i = 0; i < node.model.structuralDependency.length; i++)
        {
            dependency = document.getElementById(node.model.structuralDependency[i]);
            if (dependency != undefined)
            {
                addClass(dependency, "structuralDependency");
            }
        }
    }
}

function hideDependencies(elementId)
{
    var node = document.getElementById(elementId);
    var dependency = null;

    if (node != undefined)
    {
        for (var i = 0; i < node.model.dataDependency.length; i++)
        {
            dependency = document.getElementById(node.model.dataDependency[i]);
            if (dependency != undefined)
            {
                removeClass(dependency, "dataDependency");
            }
        }

        for (var i = 0; i < node.model.structuralDependency.length; i++)
        {
            dependency = document.getElementById(node.model.structuralDependency[i]);
            if (dependency != undefined)
            {
                removeClass(dependency, "structuralDependency");
            }
        }
    }
}

function showAllDependencies(elementId)
{
    var node = document.getElementById(elementId);

    if (node != undefined)
    {
        for (var i = 0; i < node.model.dataDependency.length; i++)
        {
            console.log(node.model.dataDependency[i]);
            showDependencies(node.model.dataDependency[i]);
        }

        for (var i = 0; i < node.model.structuralDependency.length; i++)
        {
            showDependencies(node.model.structuralDependency[i]);
        }
    }
}