import { ISettingMap, ISettingOptionsMap } from "../../models/models";
import { checkIfArraysAreEqual } from "./checkIfArraysAreEqual";
import { checkIfFullyDefault } from "./checkIfFullyDefault";
import { createSpecialSpanWithContent } from "./createSpecialSpanWithContent";

export const updateNodesAndMergeIfEqualNodes = (
  nodeClassList: string[],
  nextSiblingClassList: string[],
  node: ChildNode,
  nextSibling: ChildNode,
  settingMap: ISettingMap,
  settingOptionsMap: ISettingOptionsMap
) => {
  const areEqual = checkIfArraysAreEqual(nodeClassList, nextSiblingClassList);

  if (areEqual) {
    const span = createSpecialSpanWithContent(
      [...nodeClassList],
      [node.textContent + nextSibling.textContent],
      settingMap,
      settingOptionsMap
    );
    const textNode = document.createTextNode(span.textContent);
    const isFullyDefault = checkIfFullyDefault(nodeClassList);
    node.replaceWith(isFullyDefault ? textNode : span);
    nextSibling.remove();
  } else {
    const isStartFullyDefault = checkIfFullyDefault(nodeClassList);
    const isEndFullyDefault = checkIfFullyDefault(nextSiblingClassList);

    const start = isStartFullyDefault
      ? document.createTextNode(node.textContent)
      : createSpecialSpanWithContent(
          [...nodeClassList],
          [node.textContent],
          settingMap,
          settingOptionsMap
        );

    const end = isEndFullyDefault
      ? document.createTextNode(nextSibling.textContent)
      : createSpecialSpanWithContent(
          [...nextSiblingClassList],
          [nextSibling.textContent],
          settingMap,
          settingOptionsMap
        );

    node.replaceWith(start);
    nextSibling.replaceWith(end);
  }
};
