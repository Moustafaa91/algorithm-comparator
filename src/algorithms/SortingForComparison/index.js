import { quickSort } from './QuickSort';
import { bubbleSort } from './BubbleSort';
import { mergeSort } from './MergeSort';
import { selectionSort } from './SelectionSort';
import { insertionSort } from './InsertionSort';
import { heapSort } from './HeapSort';
import { cycleSort } from './CycleSort';
import { bubbleSortWithSteps } from '../SortingForVisualization/BubbleSortWithSteps';
import { mergeSortWithSteps } from '../SortingForVisualization/MergeSortWithSteps';
import { quickSortWithSteps } from '../SortingForVisualization/QuickSortWithSteps';

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
