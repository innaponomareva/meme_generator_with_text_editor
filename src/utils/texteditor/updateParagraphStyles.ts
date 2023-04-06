import { defaultFontFamily } from "../../lib/ff";
import { defaultFontSize } from "../../lib/fs";
import { ISettingMap, ISettingOptionsMap } from "../../models/models";
import { getTargetOption } from "./getTargetOption";

export const updateParagraphStyles = (
  targetParagraph: HTMLParagraphElement,
  settingMap: ISettingMap,
  settingOptionsMap: ISettingOptionsMap
) => {
  targetParagraph.style.fontFamily = defaultFontFamily.value;
  targetParagraph.style.fontSize = defaultFontSize.value + "rem";

  targetParagraph.style.textAlign =
    settingMap.paragraph.pa.value ??
    getTargetOption(
      "pa",
      targetParagraph.classList,
      settingOptionsMap.paragraph.pa
    ).value;

  targetParagraph.style.lineHeight =
    settingMap.paragraph.plh.value + "rem" ??
    getTargetOption(
      "plh",
      targetParagraph.classList,
      settingOptionsMap.paragraph.plh
    ).value + "rem";
};
