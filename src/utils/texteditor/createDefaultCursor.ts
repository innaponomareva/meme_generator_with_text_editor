export const createDefaultCursor = () => {
  const cursorSpan = document.createElement("span");
  cursorSpan.classList.add("cursor");
  cursorSpan.append(document.createTextNode("\uFEFF"));
  return cursorSpan;
};
