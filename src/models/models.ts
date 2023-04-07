import { defaultFontColor } from "../lib/fc";

export interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

export interface IImageSize {
  width: number;
  height: number;
  coeff: number;
}

export interface IImage {
  size: IImageSize;
  src: string;
}

export interface ITargetRange {
  startContainer: Node | null;
  startOffset: number;
  endContainer: Node | null;
  endOffset: number;
  startParagraph: HTMLParagraphElement | null;
  endParagraph: HTMLParagraphElement | null;
  textspace: HTMLDivElement | null;
}

export interface ISelectionMap {
  startContainer: Node | null;
  endContainer: Node | null;
  startOffset: number;
  endOffset: number;
  isLeftLastChildMergedToSelection?: boolean;
  isSelection?: boolean;
  isAtParagraphStart?: boolean;
}

export interface IOption {
  name: string;
  class: string;
  value?: string;
}

export interface ISettingMap {
  font: {
    ff: IOption;
    fs: IOption;
    fw: IOption;
    fst: IOption;
    fd: IOption;
    fc: IOption;
  };
  paragraph: {
    pa: IOption;
    plh: IOption;
  };
}

export interface ISettingOptionsMap {
  font: {
    ff: IOption[];
    fs: IOption[];
    fw: IOption[];
    fst: IOption[];
    fd: IOption[];
    fc: IOption[];
  };
  paragraph: {
    pa: IOption[];
    plh: IOption[];
  };
}

export interface ITextData {
  textspaceOne: IParagraph[];
  textspaceTwo: IParagraph[];
}

export interface IParagraph {
  style: { pa: CanvasTextAlign; plh: string };
  children: IChild[];
  offsetHeight: number;
}

export interface IChild {
  style: {
    fc: string;
    fd: string;
    ff: string;
    fs: string;
    fst: string;
    fw: string;
  };
  textContent: string;
  offsetWidth: number;
}

export enum CategoryType {
  font = "font",
  paragraph = "paragraph",
}

export interface IIsChanged {
  font: boolean;
  paragraph: boolean;
}

export enum Key {
  Enter = "Enter",
  Backspace = "Backspace",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
}

export enum SideType {
  Left = "Left",
  Right = "Right",
}
