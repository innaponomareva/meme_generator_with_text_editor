import { IImageSize, InputFileEvent } from "../../models/models";
import { createCanvas } from "./createCanvas";

export const onFileChanged = (
  e: InputFileEvent,
  imageSize: IImageSize,
  ratio: number
) => {
  const input = e.target as HTMLInputElement;
  const reader = new FileReader();
  reader.onload = function (event: ProgressEvent<FileReader>) {
    const target = event.target as FileReader;
    const img = new Image();
    img.onload = function () {
      const imgCoeff = imageSize.width / img.width;
      //ratio.value = img.width / 500; // change ratio to preserve the original image size
      imageSize.width = imageSize.width;
      imageSize.height = imgCoeff * img.height;
      const { ctx } = createCanvas(imageSize.width, imageSize.height, ratio);
      ctx.drawImage(img, 0, 0, imageSize.width, imageSize.height);
    };
    img.src = target.result as string;
  };
  reader.readAsDataURL(input.files[0]);
};
