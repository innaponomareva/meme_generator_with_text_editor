import { ITargetRange } from "../../models/models";

export const getPreviousSibling = (targetRange: ITargetRange) => {
  let prevSibling: Node;
  if (
    targetRange.startContainer.nodeName === "#text" &&
    targetRange.startContainer.parentNode.nodeName === "P"
  ) {
    prevSibling = targetRange.startContainer.previousSibling;
  } else if (
    targetRange.startContainer.nodeName === "#text" &&
    targetRange.startContainer.parentNode.nodeName === "SPAN"
  ) {
    prevSibling = targetRange.startContainer.parentNode.previousSibling;
  }
  return prevSibling;
};
