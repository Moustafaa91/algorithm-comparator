export function bucketSortWithSteps(array) {
    const steps = [];
    const arr = [...array];
    const bucketCount = 10;
    const buckets = Array.from({ length: bucketCount }, () => []);
    const max = Math.max(...arr);
    const divisor = max / buckets.length;
  
    for (let i = 0; i < arr.length; i++) {
      const bucketIndex = Math.min(
        bucketCount - 1,
        Math.floor(arr[i] / divisor)
      ); // Ensure index is within bounds
      steps.push({ array: [...arr], compared: [i, bucketIndex] });
      buckets[bucketIndex].push(arr[i]);
    }
  
    let sortedIndex = 0;
    for (let i = 0; i < buckets.length; i++) {
      buckets[i].sort((a, b) => a - b);
      for (let j = 0; j < buckets[i].length; j++) {
        arr[sortedIndex++] = buckets[i][j];
        steps.push({ array: [...arr], compared: [sortedIndex - 1] });
      }
    }
  
    steps.push({ array: [...arr], compared: [] }); // Final sorted state
    return steps;
  }
  