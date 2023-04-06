import { ISelectionMap, ISettingOptionsMap } from "../../models/models";
import { checkIfArraysAreEqual } from "./checkIfArraysAreEqual";
import { getTargetOption } from "./getTargetOption";
import { setFocusToPreviousSibling } from "./setFocusToPreviousSibling";
import { setSelection } from "./setSelection";

export const mergePrevSiblingAndNextSiblingIfEqual = (
  prevSibling: ChildNode,
  nextSibling: ChildNode,
  settingOptionsMap: ISettingOptionsMap
) => {
  const selectionMap: ISelectionMap = {
    startContainer: null,
    endContainer: null,
    startOffset: 0,
    endOffset: 0,
  };
  const prevSiblingTextContentLength = prevSibling.textContent.length;

  if (prevSibling.nodeName === "#text" && nextSibling.nodeName === "#text") {
    const newTextNode = document.createTextNode(
      prevSibling.textContent + nextSibling.textContent
    );
    prevSibling.replaceWith(newTextNode);
    nextSibling.remove();

    selectionMap.startContainer = newTextNode;
    selectionMap.endContainer = newTextNode;
    selectionMap.startOffset = prevSiblingTextContentLength;
    selectionMap.endOffset = prevSiblingTextContentLength;
    setSelection(selectionMap);
  } else if (
    prevSibling.nodeName === "SPAN" &&
    nextSibling.nodeName === "SPAN"
  ) {
    const prevSpan = prevSibling as HTMLSpanElement;
    const nextSpan = nextSibling as HTMLSpanElement;
    const areEqual = checkIfArraysAreEqual(
      [...prevSpan.classList],
      [...nextSpan.classList]
    );

    if (areEqual) {
      const newSpan = document.createElement("span");
      newSpan.classList.add(...prevSpan.classList);
      newSpan.append(prevSibling.textContent + nextSibling.textContent);
      newSpan.style.color = getTargetOption(
        "fc",
        prevSpan.classList,
        settingOptionsMap.font.fc
      ).value;

      prevSibling.replaceWith(newSpan);
      nextSibling.remove();

      selectionMap.startContainer = newSpan;
      selectionMap.endContainer = newSpan;
      selectionMap.startOffset = prevSiblingTextContentLength;
      selectionMap.endOffset = prevSiblingTextContentLength;
      setSelection(selectionMap);
    } else {
      setFocusToPreviousSibling(prevSibling);
    }
  }
};
