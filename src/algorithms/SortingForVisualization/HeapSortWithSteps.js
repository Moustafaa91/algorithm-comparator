export function heapSortWithSteps(array) {
    const steps = [];
    const arr = [...array];
  
    function heapify(arr, n, i) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
  
      if (left < n && arr[left] > arr[largest]) largest = left;
      if (right < n && arr[right] > arr[largest]) largest = right;
  
      if (largest !== i) {
        steps.push({ array: [...arr], compared: [i, largest] }); // Compare
        [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap
        steps.push({ array: [...arr], compared: [i, largest] });
        heapify(arr, n, largest);
      }
    }
  
    // Build heap
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      heapify(arr, arr.length, i);
    }
  
    // Extract elements
    for (let i = arr.length - 1; i > 0; i--) {
      steps.push({ array: [...arr], compared: [0, i] }); // Compare
      [arr[0], arr[i]] = [arr[i], arr[0]]; // Swap
      steps.push({ array: [...arr], compared: [0, i] });
      heapify(arr, i, 0);
    }
  
    steps.push({ array: [...arr], compared: [] }); // Final sorted state
    return steps;
  }
  