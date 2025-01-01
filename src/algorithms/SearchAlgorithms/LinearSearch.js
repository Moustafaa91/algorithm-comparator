export const linearSearch = async (array, target, setCurrentIndex, setFound, speed) => {
    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      await new Promise((resolve) => setTimeout(resolve, speed));
      if (array[i] === target) {
        setFound(true);
        return;
      }
    }
    setFound(false); // If no match is found
  };
  