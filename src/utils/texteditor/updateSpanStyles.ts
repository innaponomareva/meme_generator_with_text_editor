import { ISettingMap, ISettingOptionsMap } from "../../models/models";
import { getTargetOption } from "./getTargetOption";

export const updateSpanStyles = (
  span: HTMLSpanElement,
  settingMap: ISettingMap,
  settingOptionsMap: ISettingOptionsMap
) => {
  span.style.color =
    settingMap.font.fc.value ??
    getTargetOption("fc", span.classList, settingOptionsMap.font.fc).value;

  span.style.textDecoration =
    settingMap.font.fd.value ??
    getTargetOption("fd", span.classList, settingOptionsMap.font.fd).value;

  span.style.fontFamily =
    settingMap.font.ff.value ??
    getTargetOption("ff", span.classList, settingOptionsMap.font.ff).value;

  span.style.fontSize =
    settingMap.font.fs.value + "rem" ??
    getTargetOption("fs", span.classList, settingOptionsMap.font.fs).value +
      "rem";

  span.style.fontStyle =
    settingMap.font.fst.value ??
    getTargetOption("fst", span.classList, settingOptionsMap.font.fst).value;

  span.style.fontWeight =
    settingMap.font.fw.value ??
    getTargetOption("fw", span.classList, settingOptionsMap.font.fw).value;
};
