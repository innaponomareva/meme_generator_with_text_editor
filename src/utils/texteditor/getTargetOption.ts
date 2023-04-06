import { IOption } from "../../models/models";

export const getTargetOption = (
  key: string,
  classList: Element["classList"],
  allOptions: IOption[]
) => {
  const targetClassName = getTargetClassName(key, classList);
  return allOptions.find((item) => item.class === targetClassName);
};

const getTargetClassName = (key: string, classList: Element["classList"]) => {
  let foundClassName: string;
  classList.forEach((item) => {
    if (item.split("-")[0] === key) foundClassName = item;
  });

  return foundClassName;
};
