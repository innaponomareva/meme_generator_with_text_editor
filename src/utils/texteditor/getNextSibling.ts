import { ITargetRange } from "../../models/models";

export const getNextSibling = (targetRange: ITargetRange) => {
  let nextSibling: Node;
  if (
    targetRange.startContainer.nodeName === "#text" &&
    targetRange.startContainer.parentNode.nodeName === "P"
  ) {
    nextSibling = targetRange.startContainer.nextSibling;
  } else if (
    targetRange.startContainer.nodeName === "#text" &&
    targetRange.startContainer.parentNode.nodeName === "SPAN"
  ) {
    nextSibling = targetRange.startContainer.parentNode.nextSibling;
  }
  return nextSibling;
};
