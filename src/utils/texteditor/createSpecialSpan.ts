import { ISettingMap } from "../../models/models";

export const createSpecialSpan = (classes: string[]) => {
  const newSpan = document.createElement("span");
  newSpan.classList.add(...classes);

  return newSpan;
};
