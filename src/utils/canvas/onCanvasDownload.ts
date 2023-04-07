import { getTextData } from "../textData/getTextData";
import { cloneCanvas } from "./cloneCanvas";
import { writeText } from "./writeText";

export const onCanvasDownload = (ratio: number) => {
  const textData = getTextData();
  console.log("textData", textData);
  const originalCanvas = document.getElementById("canvas") as HTMLCanvasElement;
  const clonedCanvas = cloneCanvas(originalCanvas) as HTMLCanvasElement;
  document.body.appendChild(clonedCanvas);
  writeText(textData, clonedCanvas, ratio);

  const imageURI = clonedCanvas.toDataURL(`image/jpeg`);
  const link = document.createElement("a");
  link.download = "myImage";
  link.style.visibility = "hidden";
  document.body.appendChild(link);

  link.href = imageURI;
  link.click();
  document.body.removeChild(link);
  document.body.removeChild(clonedCanvas);
};
