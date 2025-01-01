export const jumpSearch = async (array, target, setCurrentIndex, setFound, speed) => {
    const n = array.length;
    const step = Math.floor(Math.sqrt(n));
  
    let prev = 0;
    while (array[Math.min(step, n) - 1] < target) {
      setCurrentIndex(Math.min(step, n) - 1);
      await new Promise((resolve) => setTimeout(resolve, speed));
      prev = step;
      if (prev >= n) {
        setFound(false);
        return;
      }
    }
  
    for (let i = prev; i < Math.min(step, n); i++) {
      setCurrentIndex(i);
      await new Promise((resolve) => setTimeout(resolve, speed));
      if (array[i] === target) {
        setFound(true);
        return;
      }
    }
  
    setFound(false);
  };
  