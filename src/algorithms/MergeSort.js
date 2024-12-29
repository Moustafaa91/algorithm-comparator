export const mergeSort = (portions) => {
  const times = []; // To store sorting times for each portion
  const finalSortedArray = [];

  const merge = (left, right) => {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };

  const recursiveMergeSort = (array) => {
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = recursiveMergeSort(array.slice(0, mid));
    const right = recursiveMergeSort(array.slice(mid));

    return merge(left, right);
  };

  portions.forEach((portion) => {
    const start = performance.now();

    const sortedArray = recursiveMergeSort([...portion]); // Perform sorting and save the result
    const end = performance.now();

    finalSortedArray.push(sortedArray);
    times.push(end - start); // Record time taken for this portion
  });

  return { sortedArray: finalSortedArray[finalSortedArray.length - 1], times}; 
};
