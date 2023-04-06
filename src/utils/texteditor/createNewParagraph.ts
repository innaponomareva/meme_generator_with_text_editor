import { v4 as uuidv4 } from "uuid";
import { updateParagraphStyles } from "./updateParagraphStyles";
import { ISettingMap, ISettingOptionsMap } from "../../models/models";

export const createNewParagraph = (
  settingMap: ISettingMap,
  settingOptionsMap: ISettingOptionsMap,
  classList?: string[]
) => {
  const id = uuidv4();
  const newParagraph = document.createElement("p");
  newParagraph.setAttribute("id", id);

  updateParagraphStyles(newParagraph, settingMap, settingOptionsMap);

  classList && newParagraph.classList.add(...classList);
  newParagraph.append(document.createElement("br"));
  return newParagraph;
};
