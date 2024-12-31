export function quickSortWithSteps(array) {
    const steps = [];
    const arr = [...array];
  
    function quickSort(arr, low, high) {
      if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
      }
    }
  
    function partition(arr, low, high) {
      const pivot = arr[high];
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        steps.push({ array: [...arr], compared: [j, high] }); // Compare with pivot
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
          steps.push({ array: [...arr], compared: [i, j] });
        }
      }
  
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Place pivot
      steps.push({ array: [...arr], compared: [i + 1, high] });
  
      return i + 1;
    }
  
    quickSort(arr, 0, arr.length - 1);
    steps.push({ array: [...arr], compared: [] }); // Final sorted state
    return steps;
  }
  