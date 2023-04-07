import { IOption } from "../models/models";

export const fontColors: IOption[] = [
  {
    name: "black",
    class: "fc-default",
    value: "#000000",
  },
  {
    name: "light-grey",
    class: "fc-#9d9d9c",
    value: "#9d9d9c",
  },
  {
    name: "white",
    class: "fc-#ffffff",
    value: "#ffffff",
  },
  {
    name: "magenta",
    class: "fc-#e6007e",
    value: "#e6007e",
  },

  {
    name: "red",
    class: "fc-#be1622",
    value: "#be1622",
  },
  {
    name: "dark-orange",
    class: "fc-#e94e1b",
    value: "#e94e1b",
  },
  {
    name: "light-orange",
    class: "fc-#f9b233",
    value: "#f9b233",
  },
  {
    name: "yellow",
    class: "fc-#ffed00",
    value: "#ffed00",
  },
  {
    name: "dark-green",
    class: "fc-#3aaa35",
    value: "#3aaa35",
  },
  {
    name: "light-green",
    class: "fc-#95c11f",
    value: "#95c11f",
  },
  {
    name: "cyan",
    class: "fc-#009ee0",
    value: "#009ee0",
  },
];

export const defaultFontColor: IOption = {
  ...fontColors[0],
};
