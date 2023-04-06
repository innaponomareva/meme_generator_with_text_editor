import { ISettingOptionsMap } from "./../../models/models";
import { ITargetRange } from "../../models/models";
import { mergePrevSiblingAndNextSiblingIfEqual } from "./mergePrevSiblingAndNextSiblingIfEqual";

export const removeElementOrFragment = (
  targetRange: ITargetRange,
  settingOptionsMap: ISettingOptionsMap
) => {
  let prevSibling, nextSibling;

  if (
    targetRange.startContainer.nodeName === "#text" &&
    targetRange.startContainer.parentNode.nodeName === "SPAN"
  ) {
    const specialSpan = targetRange.startContainer
      .parentNode as HTMLSpanElement;

    prevSibling = specialSpan.previousSibling;
    nextSibling = specialSpan.nextSibling;

    specialSpan.remove();
  } else if (
    targetRange.startContainer.nodeName === "#text" &&
    targetRange.startContainer.parentNode.nodeName === "P"
  ) {
    const textNode = targetRange.startContainer as Node;
    prevSibling = textNode.previousSibling;
    nextSibling = textNode.nextSibling;

    const span = document.createElement("span");
    span.append(textNode);

    span.remove();
  }

  console.log("prevSibling", prevSibling);
  console.log("nextSibling", nextSibling);

  if (prevSibling && nextSibling) {
    mergePrevSiblingAndNextSiblingIfEqual(
      prevSibling,
      nextSibling,
      settingOptionsMap
    );
  }
};
