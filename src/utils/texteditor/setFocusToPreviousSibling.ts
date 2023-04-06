import { setFocusToEndOf } from "./setFocusToEndOf";

export const setFocusToPreviousSibling = (prevSibling: Node) => {
  if (prevSibling && prevSibling.nodeName === "#text") {
    setFocusToEndOf(prevSibling);
  } else if (prevSibling && prevSibling.nodeName === "SPAN") {
    setFocusToEndOf(prevSibling.lastChild);
  }
};
