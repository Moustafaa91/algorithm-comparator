export const generateRandomArray = (size) => {
    const startGenTime = performance.now();
    const array = Array.from({ length: size }, () => Math.floor(Math.random() * size));
    const endGenTime = performance.now();
  
    const portions = splitIntoPortions(array, size);
    return { array, portions, generationTime: endGenTime - startGenTime };
  };
  
  export const generateSortedArray = (size) => {
    const startGenTime = performance.now();
    const array = Array.from({ length: size }, (_, i) => i);
    const endGenTime = performance.now();
  
    const portions = splitIntoPortions(array, size);
    return { array, portions, generationTime: endGenTime - startGenTime };
  };
  
  export const generateReverseSortedArray = (size) => {
    const startGenTime = performance.now();
    const array = Array.from({ length: size }, (_, i) => size - i - 1);
    const endGenTime = performance.now();
  
    const portions = splitIntoPortions(array, size);
    return { array, portions, generationTime: endGenTime - startGenTime };
  };
  
  /**
   * Splits an array into 10 evenly sized portions.
   * Each portion contains incrementally more elements up to the full array size.
   *
   * @param {Array} array - The array to split.
   * @param {number} size - The size of the array.
   * @returns {Array[]} An array of portions.
   */
  const splitIntoPortions = (array, size) => {
    const portionSize = size / 10; // Divide into 10 chunks
    return Array.from({ length: 10 }, (_, i) => array.slice(0, portionSize * (i + 1)));
  };
  