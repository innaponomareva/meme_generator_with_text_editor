import {
  ISelectionMap,
  ISettingMap,
  ISettingOptionsMap,
} from "../../models/models";
import { ITargetRange } from "../../models/models";
import { getChildNodesWithoutEmptyNodes } from "./getChildNodesWithoutEmptyNodes";
import { splitTargetElement } from "./splitTargetElement";
import { checkIfArraysAreEqual } from "./checkIfArraysAreEqual";
import { setSelection } from "./setSelection";
import { createNewParagraph } from "./createNewParagraph";
import { createSpecialSpanWithContent } from "./createSpecialSpanWithContent";

export const onBackspace = (
  targetRange: ITargetRange,
  settingMap: ISettingMap,
  settingOptionsMap: ISettingOptionsMap
) => {
  const { leftContents, selectionContents, rightContents } = splitTargetElement(
    targetRange.textspace,
    targetRange
  );

  updateTargetTextspace(
    settingMap,
    settingOptionsMap,
    targetRange,
    leftContents,
    selectionContents,
    rightContents
  );
};

const updateTargetTextspace = (
  settingMap: ISettingMap,
  settingOptionsMap: ISettingOptionsMap,
  targetRange: ITargetRange,
  leftContents: Node,
  selectionContents: Node,
  rightContents: Node
) => {
  const targetTextarea = targetRange.textspace as HTMLDivElement;

  const isSameParagraph =
    targetRange.startParagraph.id === targetRange.endParagraph.id;
  const leftFirstParagraph = leftContents.lastChild;

  const isAtParagraphStart =
    isSameParagraph && leftFirstParagraph.textContent === "";

  const leftContentsChildNodes = getChildNodesWithoutEmptyNodes([
    ...leftContents.childNodes,
  ]);
  const selectionContentsChildNodes = [...selectionContents.childNodes];
  const rightContentsChildNodes = getChildNodesWithoutEmptyNodes([
    ...rightContents.childNodes,
  ]);

  const leftLastChild =
    leftContentsChildNodes[leftContentsChildNodes.length - 1] &&
    leftContentsChildNodes[leftContentsChildNodes.length - 1].lastChild;

  const leftLastChildLength =
    leftContentsChildNodes[leftContentsChildNodes.length - 1] &&
    leftContentsChildNodes[leftContentsChildNodes.length - 1].lastChild
      .textContent.length;

  if (!isAtParagraphStart && selectionContentsChildNodes.length === 0) {
    if (leftLastChildLength > 1) {
      leftLastChild.textContent = leftLastChild.textContent.slice(0, -1);
    } else if (leftLastChildLength === 1) {
      leftContentsChildNodes[leftContentsChildNodes.length - 1].removeChild(
        leftContentsChildNodes[leftContentsChildNodes.length - 1].lastChild
      );
      leftContentsChildNodes[leftContentsChildNodes.length - 1].childNodes
        .length === 0 && leftContentsChildNodes.splice(-1, 1);
    }
  }

  const selectionMap: ISelectionMap = {
    startContainer: null,
    endContainer: null,
    startOffset: 0,
    endOffset: 0,
    isSelection: selectionContentsChildNodes.length > 0,
    isAtParagraphStart: isAtParagraphStart,
  };

  if (
    leftContentsChildNodes.length === 0 &&
    rightContentsChildNodes.length === 0
  ) {
    leftContentsChildNodes.push(
      createNewParagraph(settingMap, settingOptionsMap)
    );

    selectionMap.startContainer =
      leftContentsChildNodes[leftContentsChildNodes.length - 1].lastChild;
    selectionMap.endContainer =
      leftContentsChildNodes[leftContentsChildNodes.length - 1].lastChild;
    selectionMap.startOffset =
      leftContentsChildNodes[
        leftContentsChildNodes.length - 1
      ].lastChild.textContent.length;
    selectionMap.endOffset =
      leftContentsChildNodes[
        leftContentsChildNodes.length - 1
      ].lastChild.textContent.length;
  } else if (
    leftContentsChildNodes.length > 0 &&
    rightContentsChildNodes.length === 0
  ) {
    selectionMap.startContainer =
      leftContentsChildNodes[leftContentsChildNodes.length - 1].lastChild;
    selectionMap.endContainer =
      leftContentsChildNodes[leftContentsChildNodes.length - 1].lastChild;
    selectionMap.startOffset =
      leftContentsChildNodes[
        leftContentsChildNodes.length - 1
      ].lastChild.textContent.length;
    selectionMap.endOffset =
      leftContentsChildNodes[
        leftContentsChildNodes.length - 1
      ].lastChild.textContent.length;
  } else if (
    leftContentsChildNodes.length === 0 &&
    rightContentsChildNodes.length > 0
  ) {
    selectionMap.startContainer = rightContentsChildNodes[0].firstChild;
    selectionMap.endContainer = rightContentsChildNodes[0].firstChild;
    selectionMap.startOffset = 0;
    selectionMap.endOffset = 0;
  } else if (
    leftContentsChildNodes.length > 0 &&
    rightContentsChildNodes.length > 0
  ) {
    mergeBoundaryNodeListsAndGetSelectionMap(
      selectionMap,
      settingMap,
      settingOptionsMap,
      leftContentsChildNodes,
      rightContentsChildNodes,
      leftLastChildLength
    );
  }

  targetTextarea.innerHTML = "";
  targetTextarea.append(...leftContentsChildNodes, ...rightContentsChildNodes);
  setSelection(selectionMap);
};

const mergeBoundaryNodeListsAndGetSelectionMap = (
  selectionMap: ISelectionMap,
  settingMap: ISettingMap,
  settingOptionsMap: ISettingOptionsMap,
  nodeListOne: Node[],
  nodeListTwo: Node[],
  leftLastChildLength: number
) => {
  const paragraphOne = nodeListOne[
    nodeListOne.length - 1
  ] as HTMLParagraphElement;
  const paragraphTwo = nodeListTwo[0] as HTMLParagraphElement;

  let areEqual = false;

  if (paragraphOne.lastChild.nodeName === paragraphTwo.firstChild.nodeName) {
    const nodeName = paragraphOne.lastChild.nodeName;
    if (nodeName === "#text") {
      areEqual = true;
      const textContent =
        paragraphOne.lastChild.textContent +
        paragraphTwo.firstChild.textContent;
      const textNode = document.createTextNode(textContent);
      updateNodeListsAndDefineSelectionMap(
        nodeListOne,
        nodeListTwo,
        selectionMap,
        leftLastChildLength,
        textNode
      );
    } else if (nodeName === "SPAN") {
      const spanOne = paragraphOne.lastChild as HTMLSpanElement;
      const spanTwo = paragraphTwo.firstChild as HTMLSpanElement;
      const spanOneClassList = [...spanOne.classList];
      const spanTwoClassList = [...spanTwo.classList];
      const haveSameClasses = checkIfArraysAreEqual(
        spanOneClassList,
        spanTwoClassList
      );
      if (haveSameClasses) {
        areEqual = true;
        const textContent =
          paragraphOne.lastChild.textContent +
          paragraphTwo.firstChild.textContent;
        const span = createSpecialSpanWithContent(
          spanOneClassList,
          [textContent],
          settingMap,
          settingOptionsMap
        );

        updateNodeListsAndDefineSelectionMap(
          nodeListOne,
          nodeListTwo,
          selectionMap,
          leftLastChildLength,
          span
        );
      }
    }
  }
  if (!areEqual) {
    updateNodeListsAndDefineSelectionMap(
      nodeListOne,
      nodeListTwo,
      selectionMap,
      leftLastChildLength
    );
  }
};

const updateNodeListsAndDefineSelectionMap = (
  nodeListOne: Node[],
  nodeListTwo: Node[],
  selectionMap: ISelectionMap,
  leftLastChildLength?: number,
  contentNode?: Node
) => {
  const paragraphOne = nodeListOne[
    nodeListOne.length - 1
  ] as HTMLParagraphElement;
  const paragraphTwo = nodeListTwo[0] as HTMLParagraphElement;

  if (contentNode) {
    selectionMap.startContainer = contentNode;
    selectionMap.endContainer = contentNode;
    selectionMap.startOffset =
      selectionMap.isSelection || selectionMap.isAtParagraphStart
        ? leftLastChildLength
        : leftLastChildLength - 1;
    selectionMap.endOffset =
      selectionMap.isSelection || selectionMap.isAtParagraphStart
        ? leftLastChildLength
        : leftLastChildLength - 1;

    paragraphOne.removeChild(paragraphOne.lastChild);
    paragraphTwo.firstChild.replaceWith(
      ...paragraphOne.childNodes,
      contentNode
    );
  } else {
    selectionMap.startContainer = paragraphOne.lastChild;
    selectionMap.endContainer = paragraphOne.lastChild;
    selectionMap.startOffset = paragraphOne.lastChild.textContent.length;
    selectionMap.endOffset = paragraphOne.lastChild.textContent.length;
    paragraphTwo.prepend(...paragraphOne.childNodes);
    nodeListOne.splice(nodeListOne.length - 1, 1);
  }
};
