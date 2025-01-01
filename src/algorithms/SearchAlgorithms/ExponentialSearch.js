export function exponentialSearch(array, target) {
    const steps = [];
    const n = array.length;
  
    // Check if the target is the first element
    steps.push({ array: [...array], currentIndex: 0 });
    if (array[0] === target) {
      steps.push({ array: [...array], currentIndex: 0, found: true });
      return steps;
    }
  
    // Find range for binary search by exponential jumps
    let bound = 1;
    while (bound < n && array[bound] <= target) {
      steps.push({ array: [...array], currentIndex: bound }); // Log exponential jump
      bound *= 2;
    }
  
    // Perform binary search in the range [bound/2, min(bound, n)]
    let left = Math.floor(bound / 2);
    let right = Math.min(bound, n - 1);
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      steps.push({ array: [...array], currentIndex: mid }); // Log binary search step
      if (array[mid] === target) {
        steps.push({ array: [...array], currentIndex: mid, found: true });
        return steps;
      } else if (array[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  
    // Target not found
    steps.push({ currentIndex: null, found: false });
    return steps;
  }
  