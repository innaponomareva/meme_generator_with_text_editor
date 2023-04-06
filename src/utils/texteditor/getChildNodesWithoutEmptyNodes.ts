export const getChildNodesWithoutEmptyNodes = (childNodes: ChildNode[]) => {
  return childNodes.filter((elem) => {
    if (elem.textContent !== "") {
      elem.childNodes.forEach((node) => {
        if (node.textContent === "") node.remove();
      });
      return elem;
    }
  });
};
