import { checkIfFullyDefault } from "./checkIfFullyDefault";
import { removeCursor } from "./removeCursor";
import { createDefaultCursor } from "./createDefaultCursor";
import {
  ISettingMap,
  ISettingOptionsMap,
  ITargetRange,
} from "../../models/models";
import { createNewParagraph } from "./createNewParagraph";
import { getTargetParagraphIndex } from "./getTargetParagraphIndex";
import { setFocusToStartOf } from "./setFocusToStartOf";
import { createSpecialCursor } from "./createSpecialCursor";

export const splitTargetParagraphAndAddNewParagraph = (
  currentTextarea: HTMLDivElement,
  targetRange: ITargetRange,
  settingMap: ISettingMap,
  settingOptionsMap: ISettingOptionsMap
) => {
  const targetParagraph = targetRange.startParagraph as HTMLParagraphElement;
  const allParagraphs = [...currentTextarea.childNodes];
  const targetParagraphIndex = getTargetParagraphIndex(
    targetParagraph,
    allParagraphs
  );
  const targetParagraphClassList = [...targetParagraph.classList];
  const isTargetParagraphDefault = checkIfFullyDefault(
    targetParagraphClassList
  );
  const newParagraph = createNewParagraph(
    settingMap,
    settingOptionsMap,
    !isTargetParagraphDefault && targetParagraphClassList
  );
  let placeholderElem: HTMLBRElement | HTMLSpanElement;

  const startContainerParentNode = targetRange.startContainer
    .parentNode as HTMLElement;

  if (
    startContainerParentNode.nodeName === "SPAN" &&
    startContainerParentNode.classList[0] === "cursor"
  ) {
    const cursor = startContainerParentNode as HTMLSpanElement;
    const cursorParent = cursor.parentElement as HTMLElement;
    if (cursorParent.nodeName === "SPAN") {
      placeholderElem = createSpecialCursor(
        [...cursorParent.classList],
        settingMap,
        settingOptionsMap
      );
    } else if (cursorParent.nodeName === "P") {
      placeholderElem = createDefaultCursor();
    }
  } else if (
    startContainerParentNode.nodeName === "SPAN" &&
    startContainerParentNode.classList[0] !== "cursor" &&
    targetRange.startOffset !== 0
  ) {
    const targetSpan = startContainerParentNode as HTMLSpanElement;
    placeholderElem = createSpecialCursor(
      [...targetSpan.classList],
      settingMap,
      settingOptionsMap
    );
  } else {
    placeholderElem = document.createElement("br");
  }

  if (targetParagraph.firstChild.nodeName !== "BR") {
    if (window.getSelection) {
      const range = new Range();
      range.selectNodeContents(targetParagraph);
      const cloneOne = range.cloneRange();
      const cloneTwo = range.cloneRange();
      cloneOne.setEnd(targetRange.startContainer, targetRange.startOffset);
      cloneTwo.setStart(targetRange.endContainer, targetRange.endOffset);
      const contentsLeft = cloneOne.cloneContents();
      const contentsRight = cloneTwo.cloneContents();

      targetParagraph.innerHTML = "";
      targetParagraph.append(
        contentsLeft.textContent === "" ? placeholderElem : contentsLeft
      );

      const cursor = targetParagraph.querySelector(
        ".cursor"
      ) as HTMLSpanElement;
      if (cursor) removeCursor(cursor);

      newParagraph.innerHTML = "";
      newParagraph.append(
        contentsRight.textContent === "" ? placeholderElem : contentsRight
      );
    }
  }

  allParagraphs.splice(targetParagraphIndex + 1, 0, newParagraph);
  allParagraphs.forEach((p) => {
    currentTextarea.append(p);
  });

  setFocusToStartOf(newParagraph.firstChild);
};
