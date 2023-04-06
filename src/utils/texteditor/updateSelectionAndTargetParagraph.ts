import {
  CategoryType,
  IIsChanged,
  ISettingOptionsMap,
  ISelectionMap,
  ISettingMap,
  SideType,
} from "../../models/models";
import { ITargetRange } from "../../models/models";
import { checkIfArraysAreEqual } from "./checkIfArraysAreEqual";
import { createDefaultCursor } from "./createDefaultCursor";
import { createSpecialCursor } from "./createSpecialCursor";
import { setSelection } from "./setSelection";
import { createSettingClassList } from "./createSettingClassList";
import { splitTargetElement } from "./splitTargetElement";
import { updateParagraphChildNodes } from "./updateParagraphChildNodes";
import { checkIfFullyDefault } from "./checkIfFullyDefault";
import { getChildNodesListWithoutEmptyNodes } from "./getChildNodesListWithoutEmptyNodes";
import { updateParagraphClassList } from "./updateParagraphClassList";
import { createSpecialSpanWithContent } from "./createSpecialSpanWithContent";
import { updateParagraphStyles } from "./updateParagraphStyles";

export const updateSelectionAndTargetParagraph = (
  isChanged: IIsChanged,
  targetRange: ITargetRange,
  settingMap: ISettingMap,
  settingOptionsMap: ISettingOptionsMap
) => {
  const targetParagraph = targetRange.startParagraph as HTMLParagraphElement;

  const { leftContents, selectionContents, rightContents } = splitTargetElement(
    targetParagraph,
    targetRange
  );

  isChanged.font
    ? updateFontChangesInSelectionContents(
        selectionContents,
        settingMap,
        settingOptionsMap
      )
    : updateParagraphChangesInSelectionContents(
        targetParagraph,
        selectionContents,
        settingMap,
        settingOptionsMap
      );

  updateTargetParagraphContents(
    settingMap,
    settingOptionsMap,
    isChanged,
    targetRange,
    leftContents,
    selectionContents,
    rightContents
  );
};

const updateParagraphChangesInSelectionContents = (
  targetParagraph: HTMLParagraphElement,
  selectionContents: DocumentFragment,
  settingMap: ISettingMap,
  settingOptionsMap: ISettingOptionsMap
) => {
  selectionContents.childNodes.length === 0 &&
    selectionContents.appendChild(document.createElement("br"));

  updateParagraphClassList(targetParagraph, settingMap);
  updateParagraphStyles(targetParagraph, settingMap, settingOptionsMap);
};

const updateFontChangesInSelectionContents = (
  selectionContents: DocumentFragment,
  settingMap: ISettingMap,
  settingOptionsMap: ISettingOptionsMap
) => {
  const settingFontClassList = createSettingClassList(
    settingMap,
    CategoryType.font
  );

  selectionContents.childNodes.length === 0
    ? selectionContents.appendChild(
        checkIfFullyDefault(settingFontClassList)
          ? createDefaultCursor()
          : createSpecialCursor(
              settingFontClassList,
              settingMap,
              settingOptionsMap
            )
      )
    : updateParagraphChildNodes(
        selectionContents.childNodes,
        settingMap,
        settingOptionsMap
      );
};

const updateTargetParagraphContents = (
  settingMap: ISettingMap,
  settingOptionsMap: ISettingOptionsMap,
  isChanged: IIsChanged,
  targetRange: ITargetRange,
  leftContents: Node,
  selectionContents: Node,
  rightContents: Node
) => {
  const targetParagraph = targetRange.startParagraph as HTMLParagraphElement;
  const leftContentsChildNodes = getChildNodesListWithoutEmptyNodes([
    ...leftContents.childNodes,
  ]);
  const rightContentsChildNodes = getChildNodesListWithoutEmptyNodes([
    ...rightContents.childNodes,
  ]);
  const selectionContentsChildNodes = [...selectionContents.childNodes];

  const selectionMap: ISelectionMap = {
    startContainer: null,
    endContainer: null,
    startOffset: 0,
    endOffset: 0,
    isLeftLastChildMergedToSelection: false,
  };

  if (isChanged.paragraph) {
    if (targetParagraph.childNodes.length === 0) {
      selectionMap.startContainer = selectionContentsChildNodes[0];
      selectionMap.endContainer = selectionContentsChildNodes[0];
      selectionMap.startOffset = 0;
      selectionMap.endOffset = 0;
      targetParagraph.append(...selectionContentsChildNodes);
    } else {
      selectionMap.startContainer = targetRange.startContainer;
      selectionMap.endContainer = targetRange.endContainer;
      selectionMap.startOffset = targetRange.startOffset;
      selectionMap.endOffset = targetRange.endOffset;
    }
    setSelection(selectionMap);
  } else if (isChanged.font) {
    if (
      leftContentsChildNodes.length === 0 &&
      rightContentsChildNodes.length === 0
    ) {
      console.log("SELECTION");
      selectionMap.startContainer = selectionContentsChildNodes[0];
      selectionMap.endContainer =
        selectionContentsChildNodes[selectionContentsChildNodes.length - 1];
      selectionMap.startOffset = 0;
      selectionMap.endOffset =
        selectionContentsChildNodes[
          selectionContentsChildNodes.length - 1
        ].textContent.length;

      targetParagraph.innerHTML = "";
      targetParagraph.append(...selectionContentsChildNodes);

      setSelection(selectionMap);
    } else {
      const leftLastChildLength =
        leftContentsChildNodes[leftContentsChildNodes.length - 1] &&
        leftContentsChildNodes[leftContentsChildNodes.length - 1].textContent
          .length;
      const selectionLastChildLength =
        selectionContentsChildNodes[selectionContentsChildNodes.length - 1]
          .textContent.length;

      if (leftContentsChildNodes.length > 0) {
        //console.log("LEFT");
        mergeBoundaryNodeListsAndDefineSelectionMap(
          selectionMap,
          settingOptionsMap,
          settingMap,
          leftContentsChildNodes,
          selectionContentsChildNodes,
          SideType.Left,
          leftLastChildLength
        );
      }

      if (rightContentsChildNodes.length > 0) {
        //console.log("RIGHT");
        mergeBoundaryNodeListsAndDefineSelectionMap(
          selectionMap,
          settingOptionsMap,
          settingMap,
          selectionContentsChildNodes,
          rightContentsChildNodes,
          SideType.Right,
          leftLastChildLength,
          selectionLastChildLength
        );
      }

      targetParagraph.innerHTML = "";
      targetParagraph.append(
        ...leftContentsChildNodes,
        ...selectionContentsChildNodes,
        ...rightContentsChildNodes
      );

      setSelection(selectionMap);
    }
  }
};

const mergeBoundaryNodeListsAndDefineSelectionMap = (
  selectionMap: ISelectionMap,
  settingOptionsMap: ISettingOptionsMap,
  settingMap: ISettingMap,
  nodeListOne: Node[],
  nodeListTwo: Node[],
  side: SideType,
  leftLastChildLength: number,
  selectionLastChildLength?: number
) => {
  const nodesListOneLastChild = nodeListOne[nodeListOne.length - 1];
  const nodesListTwoFirstChild = nodeListTwo[0];
  let areEqual = false;

  if (nodesListOneLastChild.nodeName === nodesListTwoFirstChild.nodeName) {
    const nodeName = nodesListOneLastChild.nodeName;
    if (nodeName === "#text") {
      areEqual = true;

      selectionMap.isLeftLastChildMergedToSelection =
        side === SideType.Left
          ? true
          : selectionMap.isLeftLastChildMergedToSelection;

      const textContent =
        nodesListOneLastChild.textContent + nodesListTwoFirstChild.textContent;
      const textNode = document.createTextNode(textContent);
      updateNodeListsAndDefineSelectionMap(
        side,
        nodeListOne,
        nodeListTwo,
        selectionMap,
        leftLastChildLength,
        selectionLastChildLength,
        textNode
      );
    } else if (nodeName === "SPAN") {
      const spanOne = nodesListOneLastChild as HTMLSpanElement;
      const spanTwo = nodesListTwoFirstChild as HTMLSpanElement;
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

        const textContent = spanOne.textContent + spanTwo.textContent;
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
          selectionLastChildLength,
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
  leftLastChildLength: number,
  selectionLastChildLength?: number,
  contentNode?: Node
) => {
  if (contentNode) {
    if (side === SideType.Left) {
      //console.log("foo");
      nodeListOne.splice(-1, 1);
      nodeListTwo.splice(0, 1, contentNode);
      selectionMap.startContainer = nodeListTwo[0];
      selectionMap.endContainer = nodeListTwo[0];
      selectionMap.startOffset = leftLastChildLength;
      selectionMap.endOffset = contentNode.textContent.length;
    } else if (side === SideType.Right) {
      //console.log("koo");
      nodeListOne.splice(-1, 1, contentNode);
      nodeListTwo.splice(0, 1);
      selectionMap.startContainer = nodeListOne[nodeListOne.length - 1];
      selectionMap.endContainer = nodeListOne[nodeListOne.length - 1];
      selectionMap.startOffset = selectionMap.isLeftLastChildMergedToSelection
        ? leftLastChildLength
        : 0;
      selectionMap.endOffset = selectionMap.isLeftLastChildMergedToSelection
        ? leftLastChildLength + selectionLastChildLength
        : selectionLastChildLength;
    }
  } else {
    if (side === SideType.Left) {
      //console.log("boo");
      selectionMap.startContainer = nodeListTwo[0];
      selectionMap.endContainer = nodeListTwo[nodeListTwo.length - 1];
      selectionMap.startOffset = 0;
      selectionMap.endOffset =
        nodeListTwo[nodeListTwo.length - 1].textContent.length;
    } else if (side === SideType.Right) {
      //console.log("goo");
      selectionMap.startContainer = nodeListOne[0];
      selectionMap.endContainer = nodeListOne[nodeListOne.length - 1];
      selectionMap.startOffset = selectionMap.isLeftLastChildMergedToSelection
        ? leftLastChildLength
        : 0;
      selectionMap.endOffset =
        nodeListOne[nodeListOne.length - 1].textContent.length;
    }
  }
};
