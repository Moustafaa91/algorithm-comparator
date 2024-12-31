import { quickSort } from './SortingForComparison/QuickSort';
import { bubbleSort } from './SortingForComparison/BubbleSort';
import { mergeSort } from './SortingForComparison/MergeSort';
import { selectionSort } from './SortingForComparison/SelectionSort';
import { insertionSort } from './SortingForComparison/InsertionSort';
import { heapSort } from './SortingForComparison/HeapSort';
import { cycleSort } from './SortingForComparison/CycleSort';
import { bubbleSortWithSteps } from './SortingForVisualization/BubbleSortWithSteps';
import { mergeSortWithSteps } from './SortingForVisualization/MergeSortWithSteps';
import { quickSortWithSteps } from './SortingForVisualization/QuickSortWithSteps';

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
