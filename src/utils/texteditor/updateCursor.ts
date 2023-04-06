import { IIsChanged } from "../../models/models";
import { CategoryType, ISettingMap } from "../../models/models";
import { createSettingClassList } from "./createSettingClassList";
import { createDefaultCursor } from "./createDefaultCursor";
import { createSpecialCursor } from "./createSpecialCursor";
import { createSpecialSpan } from "./createSpecialSpan";
import { checkIfFullyDefault } from "./checkIfFullyDefault";
import { updateParagraphClassList } from "./updateParagraphClassList";

export const updateCursor = (
  cursor: HTMLSpanElement,
  targetParagraph: HTMLParagraphElement,
  settingMap: ISettingMap
) => {
  updateParagraphClassList(targetParagraph, settingMap);
  const cursorParent = cursor.parentElement as HTMLElement;
  const settingFontClassList = createSettingClassList(
    settingMap,
    CategoryType.font
  );
  const isFontSettingsFullyDefault = checkIfFullyDefault(settingFontClassList);

  if (isFontSettingsFullyDefault) {
    if (cursorParent.tagName === "SPAN")
      cursorParent.replaceWith(createDefaultCursor());
  } else {
    if (cursorParent.tagName === "SPAN") {
      const newCursorParent = createSpecialSpan(
        settingFontClassList,
        settingMap
      );
      newCursorParent.appendChild(cursor);
      cursorParent.replaceWith(newCursorParent);
    } else if (cursorParent.tagName === "P") {
      const specialCursor = createSpecialCursor(
        settingFontClassList,
        settingMap
      );
      cursor.replaceWith(specialCursor);
    }
  }
};
