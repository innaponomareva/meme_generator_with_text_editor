import { IImage, InputFileEvent } from "../../models/models";
import { createCanvas } from "./createCanvas";

export const onFileChanged = (
  e: InputFileEvent,
  image: IImage,
  ratio: number
) => {
  const input = e.target as HTMLInputElement;
  const reader = new FileReader();
  reader.onload = function (event: ProgressEvent<FileReader>) {
    const target = event.target as FileReader;
    const img = new Image();
    img.onload = function () {
      image.size.coeff = image.size.width / img.width;
      image.size.width = image.size.width;
      image.size.height = image.size.coeff * img.height;
      const { ctx } = createCanvas(
        image.size.width,
        image.size.height,
        ratio * 2
      );
      ctx.drawImage(img, 0, 0, image.size.width, image.size.height);
    };
    img.src = target.result as string;
    image.src = target.result as string;
  };
  reader.readAsDataURL(input.files[0]);
};
