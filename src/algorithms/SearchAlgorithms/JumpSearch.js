export function jumpSearch(array, target) {
  const steps = [];
  const n = array.length;
  const stepSize = Math.floor(Math.sqrt(n)); // Optimal step size is √n
  let step = stepSize; // Initialize step
  let prev = 0;

  while (prev < n) {
    steps.push({ array: [...array], currentIndex: prev }); // Log step

    // If target is within the current block
    if (array[Math.min(step, n) - 1] >= target) {
      for (let i = prev; i < Math.min(step, n); i++) {
        steps.push({ array: [...array], currentIndex: i }); // Log each comparison
        if (array[i] === target) {
          steps.push({ array: [...array], currentIndex: i, found: true });
          return steps;
        }
      }
      break;
    }

    // Move to the next block
    prev = step;
    step += stepSize;

    // Prevent infinite loop by checking bounds
    if (prev >= n) break;
  }

  // Target not found
  steps.push({ currentIndex: null, found: false });
  return steps;
}
