import { IIsChanged, ISettingOptionsMap } from "../../models/models";
import { ISelectionMap, ISettingMap, SideType } from "../../models/models";
import { ITargetRange } from "../../models/models";
import { checkIfArraysAreEqual } from "./checkIfArraysAreEqual";
import { createSpecialSpanWithContent } from "./createSpecialSpanWithContent";
import { setSelection } from "./setSelection";
import { splitTargetElement } from "./splitTargetElement";
import { updateParagraphChildNodes } from "./updateParagraphChildNodes";
import { updateParagraphClassList } from "./updateParagraphClassList";
import { getChildNodesWithoutEmptyNodes } from "./getChildNodesWithoutEmptyNodes";
import { updateParagraphStyles } from "./updateParagraphStyles";

export const updateSelectionAndTargetTextspace = (
  isChanged: IIsChanged,
  targetRange: ITargetRange,
  settingMap: ISettingMap,
  settingOptionsMap: ISettingOptionsMap
) => {
  const { leftContents, selectionContents, rightContents } = splitTargetElement(
    targetRange.textspace,
    targetRange
  );

  isChanged.font
    ? selectionContents.childNodes.forEach((p: HTMLParagraphElement) => {
        updateParagraphChildNodes(p.childNodes, settingMap, settingOptionsMap);
      })
    : selectionContents.childNodes.forEach((p) => {
        updateParagraphClassList(p as HTMLParagraphElement, settingMap);
        updateParagraphStyles(
          p as HTMLParagraphElement,
          settingMap,
          settingOptionsMap
        );
      });

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
  const leftLastParagraph = leftContents.lastChild as HTMLParagraphElement;
  const rightFirstParagraph = rightContents.firstChild as HTMLParagraphElement;

  const leftContentsChildNodes = getChildNodesWithoutEmptyNodes([
    ...leftContents.childNodes,
  ]);
  const selectionContentsChildNodes = [...selectionContents.childNodes];
  const rightContentsChildNodes = getChildNodesWithoutEmptyNodes([
    ...rightContents.childNodes,
  ]);

  const selectionMap: ISelectionMap = {
    startContainer: null,
    endContainer: null,
    startOffset: 0,
    endOffset: 0,
    isLeftLastChildMergedToSelection: false,
  };

  if (
    leftLastParagraph.textContent === "" &&
    rightFirstParagraph.textContent === ""
  ) {
    console.log("SELECTION");
    selectionMap.startContainer = selectionContentsChildNodes[0].firstChild;
    selectionMap.endContainer =
      selectionContentsChildNodes[
        selectionContentsChildNodes.length - 1
      ].lastChild;
    selectionMap.startOffset = 0;
    selectionMap.endOffset =
      selectionContentsChildNodes[
        selectionContentsChildNodes.length - 1
      ].lastChild.textContent.length;
  } else {
    const leftLastChildLength =
      leftContentsChildNodes[leftContentsChildNodes.length - 1] &&
      leftContentsChildNodes[leftContentsChildNodes.length - 1].lastChild
        .textContent.length;

    if (leftContentsChildNodes.length > 0) {
      console.log("LEFT");
      mergeBoundaryNodeListsAndGetSelectionMap(
        selectionMap,
        settingMap,
        settingOptionsMap,
        leftContentsChildNodes,
        selectionContentsChildNodes,
        SideType.Left,
        leftLastChildLength
      );
    }

    if (rightContentsChildNodes.length > 0) {
      console.log("RIGHT");
      mergeBoundaryNodeListsAndGetSelectionMap(
        selectionMap,
        settingMap,
        settingOptionsMap,
        selectionContentsChildNodes,
        rightContentsChildNodes,
        SideType.Right,
        leftLastChildLength
      );
    }
  }

  targetTextarea.innerHTML = "";
  targetTextarea.append(
    ...leftContentsChildNodes,
    ...selectionContentsChildNodes,
    ...rightContentsChildNodes
  );
  setSelection(selectionMap);
};

const mergeBoundaryNodeListsAndGetSelectionMap = (
  selectionMap: ISelectionMap,
  settingMap: ISettingMap,
  settingOptionsMap: ISettingOptionsMap,
  nodeListOne: Node[],
  nodeListTwo: Node[],
  side: SideType,
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
      selectionMap.isLeftLastChildMergedToSelection =
        side === SideType.Left
          ? true
          : selectionMap.isLeftLastChildMergedToSelection;

      const textContent =
        paragraphOne.lastChild.textContent +
        paragraphTwo.firstChild.textContent;
      const textNode = document.createTextNode(textContent);
      updateNodeListsAndDefineSelectionMap(
        side,
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
        selectionMap.isLeftLastChildMergedToSelection =
          side === SideType.Left
            ? true
            : selectionMap.isLeftLastChildMergedToSelection;

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
          side,
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
      side,
      nodeListOne,
      nodeListTwo,
      selectionMap,
      leftLastChildLength
    );
  }
};

const updateNodeListsAndDefineSelectionMap = (
  side: SideType,
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
    if (side === SideType.Left) {
      console.log("joo");
      selectionMap.startContainer = contentNode;
      selectionMap.endContainer = nodeListTwo[nodeListTwo.length - 1].lastChild;
      selectionMap.startOffset = leftLastChildLength;
      selectionMap.endOffset =
        nodeListTwo[nodeListTwo.length - 1].lastChild.textContent.length;

      paragraphOne.removeChild(paragraphOne.lastChild);
      paragraphTwo.firstChild.replaceWith(
        ...paragraphOne.childNodes,
        contentNode
      );
    } else if (side === SideType.Right) {
      console.log("too");
      selectionMap.startContainer =
        selectionMap.isLeftLastChildMergedToSelection
          ? nodeListOne[0].lastChild
          : nodeListOne[0].firstChild;
      selectionMap.endContainer = contentNode;
      selectionMap.startOffset = leftLastChildLength ?? 0;
      selectionMap.endOffset = paragraphOne.lastChild.textContent.length;

      paragraphTwo.removeChild(paragraphTwo.firstChild);
      paragraphOne.lastChild.replaceWith(
        contentNode,
        ...paragraphTwo.childNodes
      );
      nodeListTwo.splice(0, 1);
    }
  } else {
    if (side === SideType.Left) {
      console.log("soo");
      selectionMap.startContainer = paragraphTwo.firstChild;
      selectionMap.endContainer = nodeListTwo[nodeListTwo.length - 1].lastChild;
      selectionMap.startOffset = 0;
      selectionMap.endOffset =
        nodeListTwo[nodeListTwo.length - 1].lastChild.textContent.length;
      paragraphTwo.prepend(...paragraphOne.childNodes);
      nodeListOne.splice(nodeListOne.length - 1, 1);
    } else if (side === SideType.Right) {
      console.log("doo");
      selectionMap.startContainer =
        selectionMap.isLeftLastChildMergedToSelection
          ? nodeListOne[0].lastChild
          : nodeListOne[0].firstChild;
      selectionMap.endContainer = paragraphOne.lastChild;
      selectionMap.startOffset = leftLastChildLength ?? 0;

      selectionMap.endOffset = paragraphOne.lastChild.textContent.length;
      paragraphOne.append(...paragraphTwo.childNodes);
      nodeListTwo.splice(0, 1);
    }
  }
};
