export const radixSort = (portions) => {
    const times = [];
    const finalSortedArray = [];
  
    portions.forEach((portion) => {
      const arr = [...portion];
      const max = Math.max(...arr);
      let exp = 1;
  
      const start = performance.now();
      while (Math.floor(max / exp) > 0) {
        countingSortByDigit(arr, exp);
        exp *= 10;
      }
      const end = performance.now();
  
      finalSortedArray.push(arr);
      times.push(end - start);
    });
  
    return { sortedArray: finalSortedArray[finalSortedArray.length - 1], times };
  };
  
  function countingSortByDigit(arr, exp) {
    const output = new Array(arr.length).fill(0);
    const count = new Array(10).fill(0);
  
    for (let i = 0; i < arr.length; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
    }
  
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];
  
    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }
  
    for (let i = 0; i < arr.length; i++) arr[i] = output[i];
  }
  