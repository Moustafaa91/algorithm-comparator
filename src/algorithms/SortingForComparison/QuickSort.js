export const quickSort = (portions) => {
    const times = []; // To store sorting times for each portion
    const finalSortedArray = [];
    const recursiveQuickSort = (arr) => {
      if (arr.length <= 1) return arr;
      const pivot = arr[arr.length - 1];
      const left = arr.filter((el) => el < pivot);
      const right = arr.filter((el) => el > pivot);
      return [...recursiveQuickSort(left), pivot, ...recursiveQuickSort(right)];
    };

    portions.forEach((portion) => {
      const start = performance.now();

      const sortedArray = recursiveQuickSort([...portion]); // Perform sorting;
      
      const end = performance.now();
      finalSortedArray.push(sortedArray);
      times.push(end - start); // Record time taken for this portion
    });
    
    return { sortedArray: finalSortedArray[finalSortedArray.length - 1], times}; 
  };
  