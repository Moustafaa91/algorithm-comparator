export function linearSearch( array, target) {
  const steps = [];
  for (let i = 0; i < array.length; i++) {
    steps.push({ array: [...array], currentIndex: i });
    if (array[i] === target) {
      steps.push({ array: [...array], currentIndex: i, found: true });
      break;
    }
  }
  if (!steps[steps.length - 1]?.found) {
    steps.push({ currentIndex: null, found: false });
  }
  return steps;
};
