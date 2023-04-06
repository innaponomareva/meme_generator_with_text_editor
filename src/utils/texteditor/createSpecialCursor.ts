import { ISettingMap, ISettingOptionsMap } from "./../../models/models";
import { createDefaultCursor } from "./createDefaultCursor";
import { createSpecialSpan } from "./createSpecialSpan";
import { getTargetOption } from "./getTargetOption";

export const createSpecialCursor = (
  classes: string[],
  settingMap: ISettingMap,
  settingOptionsMap: ISettingOptionsMap
) => {
  const newSpan = createSpecialSpan([...classes]);

  newSpan.style.color =
    settingMap.font.fc.value ??
    getTargetOption("fc", newSpan.classList, settingOptionsMap.font.fc).value;

  newSpan.style.textDecoration =
    settingMap.font.fd.value ??
    getTargetOption("fd", newSpan.classList, settingOptionsMap.font.fd).value;

  newSpan.style.fontFamily =
    settingMap.font.ff.value ??
    getTargetOption("ff", newSpan.classList, settingOptionsMap.font.fc).value;

  newSpan.style.fontSize =
    settingMap.font.fs.value + "rem" ??
    getTargetOption("fs", newSpan.classList, settingOptionsMap.font.fs).value +
      "rem";

  newSpan.style.fontStyle =
    settingMap.font.fst.value ??
    getTargetOption("fst", newSpan.classList, settingOptionsMap.font.fst).value;

  newSpan.style.fontWeight =
    settingMap.font.fw.value ??
    getTargetOption("fw", newSpan.classList, settingOptionsMap.font.fw).value;

  const defaultCursor = createDefaultCursor();
  newSpan.appendChild(defaultCursor);
  return newSpan;
};
