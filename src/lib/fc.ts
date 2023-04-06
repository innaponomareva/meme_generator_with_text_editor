import { IOption } from "../models/models";

export const fontColors: IOption[] = [
  {
    name: "black",
    class: "fc-default",
    value: "#000000",
  },
  {
    name: "white",
    class: "fc-white",
    value: "#ffffff",
  },
  {
    name: "magenta",
    class: "fc-magenta",
    value: "#e6007e",
  },
  {
    name: "yellow",
    class: "fc-yellow",
    value: "#ffed00",
  },
  {
    name: "red",
    class: "fc-red",
    value: "#be1622",
  },
  {
    name: "dark-orange",
    class: "fc-dark-orange",
    value: "#e94e1b",
  },
  {
    name: "light-orange",
    class: "fc-light-orange",
    value: "#f9b233",
  },
  {
    name: "dark-green",
    class: "fc-dark-green",
    value: "#3aaa35",
  },
  {
    name: "light-green",
    class: "fc-light-green",
    value: "#95c11f",
  },
  {
    name: "blue",
    class: "fc-blue",
    value: "#2626b0",
  },
  {
    name: "cyan",
    class: "fc-cyan",
    value: "#009ee0",
  },
];

export const defaultFontColor: IOption = {
  ...fontColors[0],
};
