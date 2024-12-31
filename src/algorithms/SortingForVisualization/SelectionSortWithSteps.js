export function selectionSortWithSteps(array) {
    const steps = [];
    const arr = [...array];
  
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
  
      for (let j = i + 1; j < arr.length; j++) {
        steps.push({ array: [...arr], compared: [minIdx, j] }); // Compare
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          steps.push({ array: [...arr], compared: [minIdx, j] });
        }
      }
  
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]; // Swap
        steps.push({ array: [...arr], compared: [i, minIdx] });
      }
    }
  
    steps.push({ array: [...arr], compared: [] }); // Final sorted state
    return steps;
  }
  