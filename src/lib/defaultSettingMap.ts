import { ISettingMap } from "../models/models";
import { defaultFontColor } from "./fc";
import { defaultFontDecoration } from "./fd";
import { defaultFontFamily } from "./ff";
import { defaultFontSize } from "./fs";
import { defaultFontStyle } from "./fst";
import { defaultFontWeight } from "./fw";
import { defaultParagraphAlignment } from "./pa";
import { defaultParagraphLineHeight } from "./plh";

export const defaultSettingMap: ISettingMap = {
  font: {
    fc: defaultFontColor,
    fd: defaultFontDecoration,
    ff: defaultFontFamily,
    fs: defaultFontSize,
    fst: defaultFontStyle,
    fw: defaultFontWeight,
  },
  paragraph: {
    pa: defaultParagraphAlignment,
    plh: defaultParagraphLineHeight,
  },
};
