export function ternarySearch(array, target) {
    const steps = [];
  
    const recursiveSearch = (left, right) => {
      if (left > right) {
        steps.push({ currentIndex: null, found: false });
        return;
      }
  
      const mid1 = left + Math.floor((right - left) / 3);
      const mid2 = right - Math.floor((right - left) / 3);
  
      steps.push({ array: [...array], currentIndex: mid1 });
      steps.push({ array: [...array], currentIndex: mid2 });
  
      if (array[mid1] === target) {
        steps.push({ array: [...array], currentIndex: mid1, found: true });
        return;
      }
      if (array[mid2] === target) {
        steps.push({ array: [...array], currentIndex: mid2, found: true });
        return;
      }
  
      if (target < array[mid1]) {
        recursiveSearch(left, mid1 - 1);
      } else if (target > array[mid2]) {
        recursiveSearch(mid2 + 1, right);
      } else {
        recursiveSearch(mid1 + 1, mid2 - 1);
      }
    };
  
    recursiveSearch(0, array.length - 1);
    return steps;
  }
  