import { IOption } from "../models/models";

export const paragraphAlignments: IOption[] = [
  {
    name: "left",
    class: "pa-default",
    value: "left",
  },
  {
    name: "center",
    class: "pa-center",
    value: "center",
  },
  {
    name: "right",
    class: "pa-right",
    value: "right",
  },
];

export const defaultParagraphAlignment: IOption = {
  ...paragraphAlignments[0],
};
