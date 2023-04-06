export const getTargetParagraph = (container: Node) => {
  // console.log("container", container);
  // console.log("container.parentNode", container.parentNode);

  let targetParagraph: HTMLParagraphElement;
  if (container.nodeName === "DIV") {
    const firstParagraph = container.childNodes[0] as HTMLParagraphElement;
    targetParagraph = firstParagraph;
  } else if (
    container.nodeName === "P" &&
    container.parentNode.nodeName === "DIV"
  ) {
    targetParagraph = container as HTMLParagraphElement;
  } else if (
    container.nodeName === "#text" &&
    container.parentNode.nodeName === "P"
  ) {
    targetParagraph = container.parentNode as HTMLParagraphElement;
  } else if (
    container.nodeName === "BR" &&
    container.parentNode.nodeName === "P"
  ) {
    targetParagraph = container.parentNode as HTMLParagraphElement;
  } else if (
    container.nodeName === "#text" &&
    container.parentNode.nodeName === "SPAN"
  ) {
    const span = container.parentNode as HTMLSpanElement;
    if (span.parentNode.nodeName === "SPAN") {
      const specialSpan = span.parentNode as HTMLSpanElement;
      targetParagraph = specialSpan.parentNode as HTMLParagraphElement;
    } else {
      targetParagraph = span.parentNode as HTMLParagraphElement;
    }
  } else if (
    container.nodeName === "SPAN" &&
    container.parentNode.nodeName === "P"
  ) {
    targetParagraph = container.parentNode as HTMLParagraphElement;
  }

  return targetParagraph;
};
