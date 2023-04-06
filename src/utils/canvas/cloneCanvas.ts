export const cloneCanvas = (oldCanvas: HTMLCanvasElement) => {
  const newCanvas = document.createElement("canvas");
  const context = newCanvas.getContext("2d");
  newCanvas.width = oldCanvas.width;
  newCanvas.height = oldCanvas.height;
  context.drawImage(oldCanvas, 0, 0);
  return newCanvas;
};
