export const heapSort = (portions) => {
    const times = [];
    const finalSortedArray = [];
  
    const heapify = (arr, n, i) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
  
      if (left < n && arr[left] > arr[largest]) largest = left;
      if (right < n && arr[right] > arr[largest]) largest = right;
  
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
      }
    };
  
    portions.forEach((portion) => {
      const sortedArray = [...portion];
      const start = performance.now();
  
      const n = sortedArray.length;
  
      // Build max heap
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(sortedArray, n, i);
      }
  
      // Extract elements from heap
      for (let i = n - 1; i > 0; i--) {
        [sortedArray[0], sortedArray[i]] = [sortedArray[i], sortedArray[0]];
        heapify(sortedArray, i, 0);
      }
  
      const end = performance.now();
      finalSortedArray.push(sortedArray);
      times.push(end - start);
    });
  
    return { sortedArray: finalSortedArray[finalSortedArray.length - 1], times };
  };
  