import {
  CategoryType,
  ISettingOptionsMap,
  ISettingMap,
} from "../../models/models";
import { checkIfFullyDefault } from "./checkIfFullyDefault";
import { createSettingClassList } from "./createSettingClassList";
import { createSpecialSpanWithContent } from "./createSpecialSpanWithContent";
import { getTargetOption } from "./getTargetOption";
import { getUpdatedClassList } from "./getUpdatedClassList";
import { updateNodesAndMergeIfEqualNodes } from "./updateNodesAndMergeIfEqualNodes";

export const updateParagraphChildNodes = (
  nodes: NodeListOf<ChildNode>,
  settingMap: ISettingMap,
  settingOptionsMap: ISettingOptionsMap
) => {
  const settingFontClassList = createSettingClassList(
    settingMap,
    CategoryType.font
  );

  nodes.forEach((_, index, array) => {
    if (array[index + 1]) {
      let nodeClassList: string[], nextSiblingClassList: string[];
      if (
        array[index].nodeName === "SPAN" &&
        array[index + 1].nodeName === "SPAN"
      ) {
        const node = array[index] as HTMLSpanElement;
        nodeClassList = getUpdatedClassList(settingMap, CategoryType.font, [
          ...node.classList,
        ]);
        const nextSibling = array[index + 1] as HTMLSpanElement;
        nextSiblingClassList = getUpdatedClassList(
          settingMap,
          CategoryType.font,
          [...nextSibling.classList]
        );
      } else if (
        array[index].nodeName === "SPAN" &&
        array[index + 1].nodeName === "#text"
      ) {
        const node = array[index] as HTMLSpanElement;
        nodeClassList = getUpdatedClassList(settingMap, CategoryType.font, [
          ...node.classList,
        ]);
        nextSiblingClassList = getUpdatedClassList(
          settingMap,
          CategoryType.font,
          [...settingFontClassList]
        );
      } else if (
        array[index].nodeName === "#text" &&
        array[index + 1].nodeName === "SPAN"
      ) {
        nodeClassList = getUpdatedClassList(settingMap, CategoryType.font, [
          ...settingFontClassList,
        ]);
        const nextSibling = array[index + 1] as HTMLSpanElement;
        nextSiblingClassList = getUpdatedClassList(
          settingMap,
          CategoryType.font,
          [...nextSibling.classList]
        );
      }

      updateNodesAndMergeIfEqualNodes(
        nodeClassList,
        nextSiblingClassList,
        array[index],
        array[index + 1],
        settingMap,
        settingOptionsMap
      );
    } else {
      if (array[index].nodeName === "SPAN") {
        const span = array[index] as HTMLSpanElement;

        const spanClassList = getUpdatedClassList(
          settingMap,
          CategoryType.font,
          [...span.classList]
        );

        const isFullyDefault = checkIfFullyDefault(spanClassList);
        array[index].replaceWith(
          isFullyDefault
            ? document.createTextNode(array[index].textContent)
            : createSpecialSpanWithContent(
                [...spanClassList],
                [array[index].textContent],
                settingMap,
                settingOptionsMap
              )
        );
      } else if (array[index].nodeName === "#text") {
        const isFullyDefault = checkIfFullyDefault(settingFontClassList);

        array[index].replaceWith(
          isFullyDefault
            ? document.createTextNode(array[index].textContent)
            : createSpecialSpanWithContent(
                [...settingFontClassList],
                [array[index].textContent],
                settingMap,
                settingOptionsMap
              )
        );
      }
    }
  });
};
