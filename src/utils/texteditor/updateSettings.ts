import {
  ITargetRange,
  IOption,
  CategoryType,
  IOptionsSettingMap,
} from "../../models/models";
import { defaultSettingMap } from "../../lib/defaultSettingMap";

export const updateSettings = (
  targetRange: ITargetRange,
  setSettingMap: (
    category: CategoryType.font | CategoryType.paragraph,
    key: string,
    option: IOption
  ) => void,
  optionsSettingMap: IOptionsSettingMap
) => {
  const sameNode =
    targetRange.startContainer.parentNode ===
    targetRange.endContainer.parentNode;

  if (sameNode) {
    const targetParentNode = targetRange.startContainer
      .parentNode as HTMLElement;

    const targetParagraph = targetRange.startParagraph as HTMLParagraphElement;
    const isParagraphDefault = !targetParagraph.hasAttribute("class");

    if (isParagraphDefault) {
      setCategorySettingsToDefault(CategoryType.paragraph, setSettingMap);
    } else {
      setCategorySettingsToOption(
        sameNode,
        [[...targetParagraph.classList]],
        CategoryType.paragraph,
        setSettingMap,
        optionsSettingMap
      );
    }

    if (
      (targetRange.startContainer.nodeName === "#text" &&
        targetParentNode.nodeName === "P") ||
      (targetRange.startContainer.nodeName === "P" &&
        targetParentNode.nodeName === "DIV") ||
      (targetRange.startContainer.nodeName === "#text" &&
        targetParentNode.nodeName === "SPAN" &&
        targetParentNode.classList.contains("cursor") &&
        targetParentNode.parentNode.nodeName === "P")
    ) {
      setCategorySettingsToDefault(CategoryType.font, setSettingMap);
    } else if (
      targetParentNode.nodeName === "SPAN" &&
      !targetParentNode.classList.contains("cursor")
    ) {
      const span = targetParentNode as HTMLSpanElement;
      setCategorySettingsToOption(
        sameNode,
        [[...span.classList]],
        CategoryType.font,
        setSettingMap,
        optionsSettingMap
      );
    }
  } else {
    const sameParagraph =
      targetRange.startParagraph.id === targetRange.endParagraph.id;

    const selectionChildNodes = [...getSelectionContents().childNodes];

    const nodes: Node[] = sameParagraph
      ? selectionChildNodes
      : getChildNodesFromDifferentParagraphs(selectionChildNodes);

    const isFontSettingsDefault = nodes.every(
      (node) => node.nodeName === "#text"
    );

    const isParagraphSettingsDefault = sameParagraph
      ? !targetRange.startParagraph.hasAttribute("class")
      : !selectionChildNodes.every((p) => {
          const paragraph = p as HTMLParagraphElement;
          return paragraph.hasAttribute("class");
        });

    isParagraphSettingsDefault
      ? setCategorySettingsToDefault(CategoryType.paragraph, setSettingMap)
      : setCategorySettingsToOption(
          sameNode,
          getAllParagraphsClassLists(
            sameParagraph ? [targetRange.startParagraph] : selectionChildNodes
          ),
          CategoryType.paragraph,
          setSettingMap,
          optionsSettingMap
        );

    isFontSettingsDefault
      ? setCategorySettingsToDefault(CategoryType.font, setSettingMap)
      : setCategorySettingsToOption(
          sameNode,
          getAllNodeClassLists(nodes),
          CategoryType.font,
          setSettingMap,
          optionsSettingMap
        );
  }
};

const getSelectionContents = () => {
  if (window.getSelection) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    const selectionContents = range.cloneRange().cloneContents();
    // selection.removeAllRanges();
    // selection.addRange(range);
    return selectionContents;
  }
};

const getChildNodesFromDifferentParagraphs = (selectionChildNodes: Node[]) => {
  const nodes: Node[] = [];
  selectionChildNodes.forEach((node) => nodes.push(...node.childNodes));
  return nodes;
};

const getAllNodeClassLists = (nodes: Node[]) => {
  const allClassLists: string[][] = [];
  nodes.forEach((node) => {
    if (node.nodeName === "SPAN") {
      const span = node as HTMLSpanElement;
      allClassLists.push([...span.classList]);
    } else if (node.nodeName === "#text") {
      allClassLists.push([
        "fc-default",
        "fd-default",
        "ff-default",
        "fs-default",
        "fst-default",
        "fw-default",
      ]);
    }
  });
  return allClassLists;
};

const getAllParagraphsClassLists = (paragraphsList: ChildNode[]) => {
  const allClassLists: string[][] = [];

  paragraphsList.forEach((p) => {
    const paragraph = p as HTMLParagraphElement;
    if (paragraph.hasAttribute("class")) {
      allClassLists.push([...paragraph.classList]);
    } else {
      allClassLists.push(["pa-default", "plh-default"]);
    }
  });
  return allClassLists;
};

const setCategorySettingsToDefault = (
  category: CategoryType.font | CategoryType.paragraph,
  setSettingMap: (
    category: CategoryType.font | CategoryType.paragraph,
    key: string,
    option: IOption
  ) => void
) => {
  for (let key in defaultSettingMap[category]) {
    setSettingMap(
      CategoryType[category],
      key,
      defaultSettingMap[category][key]
    );
  }
};

const setCategorySettingsToOption = (
  sameNode: boolean,
  allClassLists: string[][],
  category: CategoryType.font | CategoryType.paragraph,
  setSettingMap: (
    category: CategoryType.font | CategoryType.paragraph,
    key: string,
    option: IOption
  ) => void,
  optionsSettingMap: IOptionsSettingMap
) => {
  let index = 0;
  for (let key in optionsSettingMap[category]) {
    const firstElemOption = optionsSettingMap[category][key].find(
      (item: IOption) => item.class === allClassLists[0][index]
    );
    // console.log("optionsSettingMap", optionsSettingMap);
    // console.log("firstElemOption", firstElemOption);

    setSettingMap(
      CategoryType[category],
      key,
      allClassLists.every(
        (elemClasses) => elemClasses[index] === firstElemOption.class
      )
        ? sameNode
          ? firstElemOption
            ? firstElemOption
            : defaultSettingMap[category][key]
          : firstElemOption
        : null
    );
    index++;
  }
};
