export const removeCursor = (cursor: HTMLSpanElement) => {
  const cursorType = getCursorType(cursor);
  checkCursorSiblingsAndCombineifEqual(cursorType);
  cursorType.remove();
};

export const getCursorType = (cursor: HTMLSpanElement) => {
  let cursorType: HTMLSpanElement;
  const cursorParent = cursor.parentElement as HTMLElement;
  if (cursorParent.nodeName === "SPAN") {
    cursorType = cursorParent;
  } else {
    cursorType = cursor;
  }
  return cursorType;
};

export const checkCursorSiblingsAndCombineifEqual = (
  cursor: HTMLSpanElement
) => {
  if (cursor.previousSibling && cursor.nextSibling) {
    if (
      cursor.previousSibling.nodeName === "SPAN" &&
      cursor.nextSibling.nodeName === "SPAN"
    ) {
      const prevSibling = cursor.previousSibling as HTMLSpanElement;
      const nextSibling = cursor.nextSibling as HTMLSpanElement;
      if (prevSibling.classList[1] === nextSibling.classList[1]) {
        prevSibling.innerHTML = prevSibling.innerHTML + nextSibling.innerHTML;
        nextSibling.remove();
      }
    } else if (
      cursor.previousSibling.nodeName === "#text" &&
      cursor.nextSibling.nodeName === "#text"
    ) {
      cursor.previousSibling.textContent =
        cursor.previousSibling.textContent + cursor.nextSibling.textContent;
      cursor.nextSibling.remove();
    }
  } else {
    const paragraph = cursor.parentElement as HTMLParagraphElement;
    paragraph.append(document.createElement("br"));
  }
};
