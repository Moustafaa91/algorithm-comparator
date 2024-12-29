export const cycleSort = (portions) => {
    const times = [];
    const finalSortedArray = [];
  
    portions.forEach((portion) => {
      const sortedArray = [...portion];
      const start = performance.now();
  
      for (let cycleStart = 0; cycleStart < sortedArray.length - 1; cycleStart++) {
        let item = sortedArray[cycleStart];
        let pos = cycleStart;
  
        // Find the correct position for item
        for (let i = cycleStart + 1; i < sortedArray.length; i++) {
          if (sortedArray[i] < item) {
            pos++;
          }
        }
  
        if (pos === cycleStart) continue;
  
        while (item === sortedArray[pos]) pos++;
  
        [sortedArray[pos], item] = [item, sortedArray[pos]];
  
        while (pos !== cycleStart) {
          pos = cycleStart;
  
          for (let i = cycleStart + 1; i < sortedArray.length; i++) {
            if (sortedArray[i] < item) {
              pos++;
            }
          }
  
          while (item === sortedArray[pos]) pos++;
  
          [sortedArray[pos], item] = [item, sortedArray[pos]];
        }
      }
  
      const end = performance.now();
      finalSortedArray.push(sortedArray);
      times.push(end - start);
    });
  
    return { sortedArray: finalSortedArray[finalSortedArray.length - 1], times };
  };
  