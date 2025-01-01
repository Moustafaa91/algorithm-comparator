export function binarySearch(array, target){
  const steps = [];
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push({ array: [...array], currentIndex: mid });
    if (array[mid] === target) {
      steps.push({ array: [...array], currentIndex: mid, found: true });
      break;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (!steps[steps.length - 1]?.found) {
    steps.push({ currentIndex: null, found: false });
  }
  return steps;
  };
  