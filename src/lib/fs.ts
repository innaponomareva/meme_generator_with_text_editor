import { IOption } from "../models/models";

export const fontSizes: IOption[] = [
  {
    name: "small",
    class: "fs-default",
    value: "2",
  },
  {
    name: "medium",
    class: "fs-medium",
    value: "2.5",
  },
  {
    name: "large",
    class: "fs-large",
    value: "3",
  },
];

export const defaultFontSize: IOption = {
  ...fontSizes[0],
};
