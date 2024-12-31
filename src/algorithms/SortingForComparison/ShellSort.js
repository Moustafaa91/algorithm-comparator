export const shellSort = (portions) => {
    const times = [];
    const finalSortedArray = [];
  
    portions.forEach((portion) => {
      const arr = [...portion];
      const n = arr.length;
      const start = performance.now();
      let gap = Math.floor(n / 2);
  
      while (gap > 0) {
        for (let i = gap; i < n; i++) {
          const temp = arr[i];
          let j = i;
  
          while (j >= gap && arr[j - gap] > temp) {
            arr[j] = arr[j - gap];
            j -= gap;
          }
          arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
      }
  
      const end = performance.now();
      finalSortedArray.push(arr);
      times.push(end - start);
    });
  
    return { sortedArray: finalSortedArray[finalSortedArray.length - 1], times };
  };
  