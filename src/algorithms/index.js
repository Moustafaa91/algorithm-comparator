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
  BubbleSort: bubbleSort,
  MergeSort: mergeSort,
  SelectionSort: selectionSort,
  InsertionSort: insertionSort,
  HeapSort: heapSort,
  CycleSort: cycleSort,
};

export const algorithmsVisual = {
  QuickSortWithSteps: quickSortWithSteps,
  BubbleSortWithSteps: bubbleSortWithSteps,
  MergeSortWithSteps: mergeSortWithSteps,
};
