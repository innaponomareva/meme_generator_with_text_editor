export const checkIfArraysAreEqual = (array1: string[], array2: string[]) => {
  const areEqual =
    array1.length == array2.length &&
    array1.every(function (item, index) {
      return item === array2[index];
    });
  return areEqual;
};
