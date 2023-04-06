import { IOption } from "../models/models";

export const fontWeights: IOption[] = [
  {
    name: "normal",
    class: "fw-default",
    value: "normal",
  },
  {
    name: "bold",
    class: "fw-bold",
    value: "bold",
  },
];

export const defaultFontWeight: IOption = {
  ...fontWeights[0],
};
