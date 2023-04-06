import { CategoryType, ISettingMap } from "../../models/models";

export const getUpdatedClassList = (
  settingMap: ISettingMap,
  category: CategoryType.font | CategoryType.paragraph,
  classList: string[]
) => {
  const classes = [];
  let index = 0;

  // console.log("settingMap", settingMap);
  // console.log("classList", classList);

  for (let key in settingMap[category]) {
    settingMap[category][key].class
      ? classes.push(settingMap[category][key].class)
      : classList[index]
      ? classes.push(classList[index])
      : classes.push(`${key}-default`);

    index++;
  }
  //console.log("classes", classes);
  return classes;
};
