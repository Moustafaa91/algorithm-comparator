import { quickSort } from './QuickSort';
import { bubbleSort } from './BubbleSort';
import { mergeSort } from './MergeSort';
import { selectionSort } from './SelectionSort';
import { insertionSort } from './InsertionSort';
import { heapSort } from './HeapSort';
import { cycleSort } from './CycleSort';
import { bubbleSortWithSteps } from './BubbleSortWithSteps';
import { mergeSortWithSteps } from './MergeSortWithSteps';
import { quickSortWithSteps } from './QuickSortWithSteps';

export const algorithms = {
  QuickSort: quickSort,
  QuickSortWithSteps: quickSortWithSteps,
  BubbleSort: bubbleSort,
  BubbleSortWithSteps: bubbleSortWithSteps,
  MergeSort: mergeSort,
  MergeSortWithSteps: mergeSortWithSteps,
  SelectionSort: selectionSort,
  InsertionSort: insertionSort,
  HeapSort: heapSort,
  CycleSort: cycleSort,
};
