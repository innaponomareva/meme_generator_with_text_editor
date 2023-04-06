import { CategoryType, ISettingMap } from "../../models/models";

export const createSettingClassList = (
  settingMap: ISettingMap,
  category: CategoryType.font | CategoryType.paragraph
) => {
  const classList = [];

  for (let key in settingMap[category]) {
    settingMap[category][key].class
      ? classList.push(settingMap[category][key].class)
      : classList.push(`${key}-default`);
  }

  return classList;
};
