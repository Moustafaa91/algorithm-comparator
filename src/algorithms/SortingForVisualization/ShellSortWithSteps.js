export function shellSortWithSteps(array) {
    const steps = [];
    const arr = [...array];
    const n = arr.length;
    let gap = Math.floor(n / 2);
  
    while (gap > 0) {
      for (let i = gap; i < n; i++) {
        const temp = arr[i];
        let j = i;
  
        while (j >= gap && arr[j - gap] > temp) {
          steps.push({ array: [...arr], compared: [j, j - gap] });
          arr[j] = arr[j - gap];
          steps.push({ array: [...arr], compared: [j, j - gap] });
          j -= gap;
        }
  
        arr[j] = temp;
        steps.push({ array: [...arr], compared: [j] });
      }
  
      gap = Math.floor(gap / 2);
    }
  
    steps.push({ array: [...arr], compared: [] }); // Final sorted state
    return steps;
  }
  