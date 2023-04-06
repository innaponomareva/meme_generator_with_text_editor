export const getTargetParagraphIndex = (
  targetParagraph: HTMLParagraphElement,
  allParagraphs: ChildNode[]
) => {
  let paragraphIndex = 0;
  allParagraphs.forEach((p: HTMLParagraphElement, index: number) => {
    if (p.id === targetParagraph.id) paragraphIndex = index;
  });
  return paragraphIndex;
};
