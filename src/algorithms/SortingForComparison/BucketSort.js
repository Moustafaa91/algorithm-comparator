export const bucketSort = (portions) => {
    const times = [];
    const finalSortedArray = [];
  
    portions.forEach((portion) => {
      const arr = [...portion];
      const max = Math.max(...arr);
      const bucketCount = 10;
      const divisor = max / bucketCount;
  
      const start = performance.now();
  
      const buckets = Array.from({ length: bucketCount }, () => []);
      for (let i = 0; i < arr.length; i++) {
        const bucketIndex = Math.min(
          bucketCount - 1,
          Math.floor(arr[i] / divisor)
        ); // Ensure index is within bounds
        buckets[bucketIndex].push(arr[i]);
      }
  
      for (let i = 0; i < buckets.length; i++) {
        buckets[i].sort((a, b) => a - b);
      }
  
      const sortedArray = [].concat(...buckets);
      const end = performance.now();
  
      finalSortedArray.push(sortedArray);
      times.push(end - start);
    });
  
    return { sortedArray: finalSortedArray[finalSortedArray.length - 1], times };
  };
  