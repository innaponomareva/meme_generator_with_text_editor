import { ISettingOptionsMap, ISettingMap } from "../../models/models";
import { updateSpanStyles } from "./updateSpanStyles";

export const createSpecialSpanWithContent = (
  classes: string[],
  content: string[],
  settingMap: ISettingMap | null,
  settingOptionsMap: ISettingOptionsMap
) => {
  const newSpan = document.createElement("span");
  newSpan.classList.add(...classes);
  newSpan.append(...content);
  updateSpanStyles(newSpan, settingMap, settingOptionsMap);
  return newSpan;
};
