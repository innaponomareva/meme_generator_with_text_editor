import { defaultFontColor } from "../../lib/fc";
import { defaultFontDecoration } from "../../lib/fd";
import { defaultFontFamily } from "../../lib/ff";
import { defaultFontSize } from "../../lib/fs";
import { defaultFontStyle } from "../../lib/fst";
import { defaultFontWeight } from "../../lib/fw";

export const getTextData = () => {
  const textspacesBox = document.getElementById(
    "textspaces-box"
  ) as HTMLDivElement;
  const textspaceOne = textspacesBox.firstChild as HTMLDivElement;
  const textspaceTwo = textspacesBox.lastChild as HTMLDivElement;

  const textData = {
    textspaceOne: [],
    textspaceTwo: [],
  };

  textspaceOne.childNodes.forEach((p) =>
    textData.textspaceOne.push(getParagraphData(p as HTMLParagraphElement))
  );
  textspaceTwo.childNodes.forEach((p) =>
    textData.textspaceTwo.push(getParagraphData(p as HTMLParagraphElement))
  );

  return textData;
};

const getParagraphData = (p: HTMLParagraphElement) => {
  const paragraphData = {
    style: {
      pa: p.style.textAlign,
      plh: p.style.lineHeight,
    },
    children: [],
    offsetHeight: p.offsetHeight,
  };

  p.childNodes.forEach((node) => {
    if (node.nodeName === "#text" || node.nodeName === "BR") {
      const element = document.createElement("span");
      element.style.fontFamily = defaultFontFamily.value;
      element.style.fontSize = `${defaultFontSize.value}rem`;
      element.append(node.textContent);
      document.body.appendChild(element);
      const width = element.offsetWidth;
      document.body.removeChild(element);
      paragraphData.children.push({
        style: {
          fc: defaultFontColor.value,
          fd: defaultFontDecoration.value,
          ff: defaultFontFamily.value,
          fs: defaultFontSize.value,
          fst: defaultFontStyle.value,
          fw: defaultFontWeight.value,
        },
        textContent: node.nodeName === "#text" ? node.textContent : "",
        offsetWidth: width,
      });
    } else if (node.nodeName === "SPAN") {
      const span = node as HTMLSpanElement;

      paragraphData.children.push({
        style: {
          fc: span.style.color,
          fd: span.style.textDecoration,
          ff: span.style.fontFamily,
          fs: span.style.fontSize,
          fst: span.style.fontStyle,
          fw: span.style.fontWeight,
        },
        textContent: node.textContent,
        offsetWidth: span.offsetWidth,
      });
    }
  });

  return paragraphData;
};
