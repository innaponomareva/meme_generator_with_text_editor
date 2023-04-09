import { ITextData } from "../../models/models";

export const writeText = (
  textData: ITextData,
  canvas: HTMLCanvasElement,
  ratio: number
) => {
  const ctx = canvas.getContext("2d");

  let y_textspaceOne = 4 * ratio;
  let y_textspaceTwo = canvas.height + 2 * ratio;

  textData.textspaceOne.length > 0 &&
    textData.textspaceOne.forEach((p) => {
      y_textspaceOne = y_textspaceOne + p.offsetHeight * ratio;

      const allElemsWidth =
        p.style.pa !== "left"
          ? p.children.reduce((a, b) => a + b.offsetWidth, 0) * ratio
          : 0;

      let x_textspaceOne =
        p.style.pa === "center"
          ? (canvas.width - allElemsWidth) / 2
          : p.style.pa === "right"
          ? canvas.width - allElemsWidth - 9
          : 9;

      p.children.forEach((child) => {
        ctx.fillStyle = child.style.fc;
        ctx.font = `${child.style.fst} ${child.style.fw} ${
          parseInt(child.style.fs) * 16 * ratio
        }px ${child.style.ff}`;

        ctx.textBaseline = "alphabetic";
        ctx.fillText(child.textContent, x_textspaceOne, y_textspaceOne);
        x_textspaceOne = x_textspaceOne + child.offsetWidth * ratio;
      });
    });

  textData.textspaceTwo.length > 0 &&
    textData.textspaceTwo
      .slice()
      .reverse()
      .forEach((p, index) => {
        y_textspaceTwo =
          index === 0
            ? y_textspaceTwo - (parseInt(p.style.plh) * 16 * ratio) / 2
            : y_textspaceTwo - p.offsetHeight * ratio;

        const allElemsWidth =
          p.style.pa !== "left"
            ? p.children.reduce((a, b) => a + b.offsetWidth, 0) * ratio
            : 0;

        let x_textspaceTwo =
          p.style.pa === "center"
            ? (canvas.width - allElemsWidth) / 2
            : p.style.pa === "right"
            ? canvas.width - allElemsWidth - 9
            : 9;

        p.children.forEach((child) => {
          ctx.fillStyle = child.style.fc;
          ctx.font = `${child.style.fst} ${child.style.fw} ${
            parseInt(child.style.fs) * 16 * ratio
          }px ${child.style.ff}`;
          ctx.textBaseline = "alphabetic";
          ctx.fillText(child.textContent, x_textspaceTwo, y_textspaceTwo);
          x_textspaceTwo = x_textspaceTwo + child.offsetWidth * ratio;
        });
      });
};
