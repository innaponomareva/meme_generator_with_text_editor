import { IOption } from "../models/models";

export const paragraphLineHeights: IOption[] = [
  {
    name: "1",
    class: "plh-default",
    value: "2",
  },
  {
    name: "2",
    class: "plh-2",
    value: "2.5",
  },
  {
    name: "3",
    class: "plh-3",
    value: "3",
  },
];

export const defaultParagraphLineHeight: IOption = {
  ...paragraphLineHeights[0],
};
