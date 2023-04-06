import { IOption } from "../models/models";

export const fontFamilies: IOption[] = [
  {
    name: "Helvetica",
    class: "ff-default",
    value: '"Helvetica", sans-serif',
  },
  {
    name: "Franklin Gothic",
    class: "ff-franklinGothic",
    value: '"Franklin Gothic Medium", sans-serif',
  },
  {
    name: "Gill Sans",
    class: "ff-gillSans",
    value: '"Gill Sans", "Gill Sans MT", sans-serif',
  },
  {
    name: "Arial",
    class: "ff-arial",
    value: '"Arial", sans-serif',
  },
  {
    name: "Verdana",
    class: "ff-verdana",
    value: '"Verdana", sans-serif',
  },
  {
    name: "Times New Roman",
    class: "ff-timesNewRoman",
    value: '"Times New Roman", Times, serif',
  },
];

export const defaultFontFamily: IOption = {
  ...fontFamilies[0],
};
