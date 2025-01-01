export const linearSearch = async (
  array,
  target,
  setCurrentIndex,
  setFound,
  speed,
  pausedRef
) => {
  for (let i = 0; i < array.length; i++) {
    while (pausedRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    setCurrentIndex(i);
    await new Promise((resolve) => setTimeout(resolve, speed));
    if (array[i] === target) {
      setFound(true);
      return;
    }
  }
  setFound(false);
};
