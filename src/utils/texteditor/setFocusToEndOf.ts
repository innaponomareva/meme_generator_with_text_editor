export const setFocusToEndOf = (node: Node) => {
  if (document.createRange) {
    //Firefox, Chrome, Opera, Safari, IE 9+
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(node);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};
