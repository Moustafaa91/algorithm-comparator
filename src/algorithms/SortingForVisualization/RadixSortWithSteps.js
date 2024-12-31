export function radixSortWithSteps(array) {
    const steps = [];
    const arr = [...array];
    const max = Math.max(...arr);
    let exp = 1;
  
    while (Math.floor(max / exp) > 0) {
      countingSortByDigitWithSteps(arr, exp, steps);
      exp *= 10;
    }
  
    steps.push({ array: [...arr], compared: [] }); // Final sorted state
    return steps;
  }
  
  function countingSortByDigitWithSteps(arr, exp, steps) {
    const output = new Array(arr.length).fill(0);
    const count = new Array(10).fill(0);
  
    for (let i = 0; i < arr.length; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
    }
  
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];
  
    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      steps.push({ array: [...arr], compared: [i, digit] });
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }
  
    for (let i = 0; i < arr.length; i++) arr[i] = output[i];
  }
  