import { CategoryType, ISettingMap } from "../../models/models";
import { checkIfFullyDefault } from "./checkIfFullyDefault";
import { createSettingClassList } from "./createSettingClassList";

export const updateParagraphClassList = (
  targetParagraph: HTMLParagraphElement,
  settingMap: ISettingMap
) => {
  const classList = createSettingClassList(settingMap, CategoryType.paragraph);
  const isClassListFullyDefault = checkIfFullyDefault(classList);

  if (isClassListFullyDefault) {
    targetParagraph.removeAttribute("class");
  } else {
    targetParagraph.removeAttribute("class");
    targetParagraph.classList.add(...classList);
  }
};
