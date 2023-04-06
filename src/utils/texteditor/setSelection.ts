import { ISelectionMap } from "../../models/models";

export const setSelection = (selectionMap: ISelectionMap) => {
  //console.log("selectionMap", selectionMap);
  const { startContainer, endContainer, startOffset, endOffset } = selectionMap;
  const range = new Range();
  range.setStart(startContainer.firstChild ?? startContainer, startOffset);
  range.setEnd(endContainer.firstChild ?? endContainer, endOffset);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
};
