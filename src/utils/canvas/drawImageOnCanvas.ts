import { IImage } from "../../models/models";

export const drawImageOnCanvas = (
  ctx: CanvasRenderingContext2D,
  image: IImage
) => {
  const img = new Image();
  img.src = image.src;
  ctx.drawImage(img, 0, 0, image.size.width, image.size.height);
};
