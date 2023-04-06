export const setFocusToStartOf = (node: Node) => {
  if (document.createRange) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};
