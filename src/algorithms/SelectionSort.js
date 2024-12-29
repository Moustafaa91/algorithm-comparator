export const selectionSort = (portions) => {
    const times = [];
    const finalSortedArray = [];
  
    portions.forEach((portion) => {
      const sortedArray = [...portion];
      const start = performance.now();
  
      for (let i = 0; i < sortedArray.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < sortedArray.length; j++) {
          if (sortedArray[j] < sortedArray[minIndex]) {
            minIndex = j;
          }
        }
        if (minIndex !== i) {
          [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];
        }
      }
  
      const end = performance.now();
      finalSortedArray.push(sortedArray);
      times.push(end - start);
    });
  
    return { sortedArray: finalSortedArray[finalSortedArray.length - 1], times };
  };
  