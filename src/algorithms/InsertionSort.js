export const insertionSort = (portions) => {
    const times = [];
    const finalSortedArray = [];
  
    portions.forEach((portion) => {
      const sortedArray = [...portion];
      const start = performance.now();
  
      for (let i = 1; i < sortedArray.length; i++) {
        const key = sortedArray[i];
        let j = i - 1;
        while (j >= 0 && sortedArray[j] > key) {
          sortedArray[j + 1] = sortedArray[j];
          j -= 1;
        }
        sortedArray[j + 1] = key;
      }
  
      const end = performance.now();
      finalSortedArray.push(sortedArray);
      times.push(end - start);
    });
  
    return { sortedArray: finalSortedArray[finalSortedArray.length - 1], times };
  };
  