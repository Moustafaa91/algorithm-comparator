export const binarySearch = async (array, target, setCurrentIndex, setFound, speed) => {
    let left = 0;
    let right = array.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setCurrentIndex(mid);
      await new Promise((resolve) => setTimeout(resolve, speed));
  
      if (array[mid] === target) {
        setFound(true);
        return;
      } else if (array[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    setFound(false); // If no match is found
  };
  