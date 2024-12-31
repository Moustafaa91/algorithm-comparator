export function cycleSortWithSteps(array) {
    const steps = [];
    const arr = [...array];
  
    for (let start = 0; start < arr.length - 1; start++) {
      let item = arr[start];
      let pos = start;
  
      // Find the position for the current element
      for (let i = start + 1; i < arr.length; i++) {
        if (arr[i] < item) pos++;
      }
  
      if (pos === start) continue;
  
      while (item === arr[pos]) pos++;
      [arr[pos], item] = [item, arr[pos]];
      steps.push({ array: [...arr], compared: [start, pos] });
  
      while (pos !== start) {
        pos = start;
        for (let i = start + 1; i < arr.length; i++) {
          if (arr[i] < item) pos++;
        }
  
        while (item === arr[pos]) pos++;
        [arr[pos], item] = [item, arr[pos]];
        steps.push({ array: [...arr], compared: [start, pos] });
      }
    }
  
    steps.push({ array: [...arr], compared: [] }); // Final sorted state
    return steps;
  }
  