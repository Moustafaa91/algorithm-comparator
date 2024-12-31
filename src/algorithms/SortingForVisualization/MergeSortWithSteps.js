export function mergeSortWithSteps(array) {
    const steps = [];
    const arr = [...array];
  
    function mergeSort(arr, start, end) {
      if (start >= end) return;
  
      const mid = Math.floor((start + end) / 2);
      mergeSort(arr, start, mid);
      mergeSort(arr, mid + 1, end);
      merge(arr, start, mid, end);
    }
  
    function merge(arr, start, mid, end) {
      const left = arr.slice(start, mid + 1);
      const right = arr.slice(mid + 1, end + 1);
      let i = 0, j = 0, k = start;
  
      while (i < left.length && j < right.length) {
        steps.push({ array: [...arr], compared: [k, mid + 1 + j] });
        if (left[i] <= right[j]) {
          arr[k++] = left[i++];
        } else {
          arr[k++] = right[j++];
        }
        steps.push({ array: [...arr], compared: [] });
      }
  
      while (i < left.length) {
        steps.push({ array: [...arr], compared: [k] });
        arr[k++] = left[i++];
        steps.push({ array: [...arr], compared: [] });
      }
  
      while (j < right.length) {
        steps.push({ array: [...arr], compared: [k] });
        arr[k++] = right[j++];
        steps.push({ array: [...arr], compared: [] });
      }
    }
  
    mergeSort(arr, 0, arr.length - 1);
    steps.push({ array: [...arr], compared: [] }); // Final sorted state
    return steps;
  }
  