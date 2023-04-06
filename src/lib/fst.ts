import { IOption } from "../models/models";

export const fontStyles: IOption[] = [
  {
    name: "normal",
    class: "fst-default",
    value: "normal",
  },
  {
    name: "italic",
    class: "fst-italic",
    value: "italic",
  },
];

export const defaultFontStyle: IOption = {
  ...fontStyles[0],
};
