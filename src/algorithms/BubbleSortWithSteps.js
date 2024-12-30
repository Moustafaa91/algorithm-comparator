export function bubbleSortWithSteps(array) {
    const steps = [];
    const arr = [...array]; // Clone array to avoid mutations
    const n = arr.length;
  
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        steps.push({ array: [...arr], compared: [j, j + 1] }); // Emit current state with compared indices
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push({ array: [...arr], compared: [j, j + 1] });
        }
      }
    }
    steps.push({ array: [...arr], compared: [] }); // Capture final sorted state
    return steps; // Return only steps for visualization
  }
  