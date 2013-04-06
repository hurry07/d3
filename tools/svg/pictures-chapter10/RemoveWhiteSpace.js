function RemoveWhiteSpaceChildNodesOf(node)
{
  if (node != null)
  {
    var child = node.lastChild;
    while (child != null)
    {
      if (child.nodeType == 3 && child.nodeValue.match(/\S/) == null)
      {
        var previous = child.previousSibling;
        child.parentNode.removeChild(child);
        child = previous;
      }
      else
      {
        RemoveWhiteSpaceChildNodesOf(child);
        child = child.previousSibling;
      }
    }
    
  }
}
