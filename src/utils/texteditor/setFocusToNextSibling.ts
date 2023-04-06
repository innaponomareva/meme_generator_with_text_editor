import { setFocusToStartOf } from "./setFocusToStartOf";

export const setFocusToNextSibling = (nextSibling: Node) => {
  if (nextSibling && nextSibling.nodeName === "#text") {
    setFocusToStartOf(nextSibling);
  } else if (nextSibling && nextSibling.nodeName === "SPAN") {
    setFocusToStartOf(nextSibling.lastChild);
  }
};
