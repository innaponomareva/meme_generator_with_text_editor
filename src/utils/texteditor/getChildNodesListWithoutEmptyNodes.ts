export const getChildNodesListWithoutEmptyNodes = (childNodes: ChildNode[]) =>
  childNodes.filter((item) => item.textContent !== "");
