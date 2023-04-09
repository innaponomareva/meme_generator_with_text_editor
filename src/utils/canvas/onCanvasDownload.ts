import { getTextData } from "../textData/getTextData";
import { cloneCanvas } from "./cloneCanvas";
import { writeText } from "./writeText";

export const onCanvasDownload = (ratio: number) => {
  const textData = getTextData();
  const originalCanvas = document.getElementById("canvas") as HTMLCanvasElement;
  const clonedCanvas = cloneCanvas(originalCanvas) as HTMLCanvasElement;
  document.body.appendChild(clonedCanvas);
  writeText(textData, clonedCanvas, ratio);

  const imageURI = clonedCanvas.toDataURL(`image/jpeg`);
  downloadImage(imageURI, "myImage.jpg");
  document.body.removeChild(clonedCanvas);
};

const downloadImage = (url: string, name: string) => {
  fetch(url)
    .then((resp) => resp.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 200);
    })
    .catch(() => alert("An error sorry"));
};
