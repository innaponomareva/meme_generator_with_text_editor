import { ITargetRange } from "../../models/models";

export const splitTargetElement = (
  targetElement: HTMLElement,
  targetRange: ITargetRange
) => {
  if (window.getSelection) {
    const range = new Range();
    range.selectNodeContents(targetElement);
    const leftClone = range.cloneRange();
    const selectionClone = range.cloneRange();
    const rightClone = range.cloneRange();
    leftClone.setEnd(targetRange.startContainer, targetRange.startOffset);
    selectionClone.setStart(
      targetRange.startContainer,
      targetRange.startOffset
    );
    selectionClone.setEnd(targetRange.endContainer, targetRange.endOffset);
    rightClone.setStart(targetRange.endContainer, targetRange.endOffset);

    const leftContents = leftClone.cloneContents();
    const selectionContents = selectionClone.cloneContents();
    const rightContents = rightClone.cloneContents();
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    return { leftContents, selectionContents, rightContents };
  }
};
