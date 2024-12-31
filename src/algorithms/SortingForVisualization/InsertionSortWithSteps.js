export function insertionSortWithSteps(array) {
    const steps = [];
    const arr = [...array];
  
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
  
      while (j >= 0 && arr[j] > key) {
        steps.push({ array: [...arr], compared: [j, j + 1] }); // Compare
        arr[j + 1] = arr[j]; // Shift element
        steps.push({ array: [...arr], compared: [j, j + 1] }); // Update state
        j--;
      }
  
      arr[j + 1] = key;
      steps.push({ array: [...arr], compared: [j + 1] }); // Insert key
    }
  
    steps.push({ array: [...arr], compared: [] }); // Final sorted state
    return steps;
  }
  