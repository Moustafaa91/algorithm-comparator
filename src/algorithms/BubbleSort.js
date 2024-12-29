export const bubbleSort = (portions) => {
    const times = []; // To store sorting times for each portion
    const finalSortedArray = [];
    portions.forEach((portion) => {
      const sortedArray = [...portion];
      const start = performance.now();
  
      for (let i = 0; i < sortedArray.length - 1; i++) {
        for (let j = 0; j < sortedArray.length - i - 1; j++) {
          if (sortedArray[j] > sortedArray[j + 1]) {
            [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
          }
        }
      }
  
      const end = performance.now();
      finalSortedArray.push(sortedArray);
      times.push(end - start); // Record time taken for this portion
    });
    
    return { sortedArray: finalSortedArray[finalSortedArray.length - 1], times}; 
  };
  