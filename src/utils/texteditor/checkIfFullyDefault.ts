export const checkIfFullyDefault = (classList: string[]) => {
  return classList.every(
    (item) => item !== undefined && item.includes("default")
  );
};
