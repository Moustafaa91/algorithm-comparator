export function jumpSearch(array, target) {
  const steps = [];
  const n = array.length;
  const step = Math.floor(Math.sqrt(n)); // Optimal step size is √n
  let prev = 0;

  while (prev < n) {
    steps.push({ array: [...array], currentIndex: prev }); // Log step

    // If target is in the current block
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

    prev = step;
    if (prev >= n) break;
  }

  // Target not found
  steps.push({ currentIndex: null, found: false });
  return steps;
}
