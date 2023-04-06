import { IOption } from "../models/models";

export const fontDecorations: IOption[] = [
  {
    name: "normal",
    class: "fd-default",
    value: "normal",
  },
  {
    name: "underline",
    class: "fd-underline",
    value: "underline",
  },
];

export const defaultFontDecoration: IOption = {
  ...fontDecorations[0],
};
