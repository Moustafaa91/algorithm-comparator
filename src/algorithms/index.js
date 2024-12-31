import { quickSort } from './SortingForComparison/QuickSort';
import { bubbleSort } from './SortingForComparison/BubbleSort';
import { mergeSort } from './SortingForComparison/MergeSort';
import { selectionSort } from './SortingForComparison/SelectionSort';
import { insertionSort } from './SortingForComparison/InsertionSort';
import { heapSort } from './SortingForComparison/HeapSort';
import { cycleSort } from './SortingForComparison/CycleSort';
import { shellSort } from './SortingForComparison/ShellSort';
import { radixSort } from './SortingForComparison/RadixSort';
import { bucketSort } from './SortingForComparison/BucketSort';

import { bubbleSortWithSteps } from './SortingForVisualization/BubbleSortWithSteps';
import { mergeSortWithSteps } from './SortingForVisualization/MergeSortWithSteps';
import { quickSortWithSteps } from './SortingForVisualization/QuickSortWithSteps';
import { heapSortWithSteps } from './SortingForVisualization/HeapSortWithSteps';
import { insertionSortWithSteps } from './SortingForVisualization/InsertionSortWithSteps';
import { selectionSortWithSteps } from './SortingForVisualization/SelectionSortWithSteps';
import { cycleSortWithSteps } from './SortingForVisualization/CycleSortWithSteps';
import { shellSortWithSteps } from './SortingForVisualization/ShellSortWithSteps';
import { radixSortWithSteps } from './SortingForVisualization/RadixSortWithSteps';
import { bucketSortWithSteps } from './SortingForVisualization/BucketSortWithSteps';


export const algorithms = {
  QuickSort: quickSort,
  BubbleSort: bubbleSort,
  MergeSort: mergeSort,
  SelectionSort: selectionSort,
  InsertionSort: insertionSort,
  HeapSort: heapSort,
  CycleSort: cycleSort,
  ShellSort: shellSort,
  RadixSort: radixSort,
  BucketSort: bucketSort,
};

export const algorithmsVisual = {
  QuickSortWithSteps: quickSortWithSteps,
  BubbleSortWithSteps: bubbleSortWithSteps,
  MergeSortWithSteps: mergeSortWithSteps,
  SelectionSortWithSteps: selectionSortWithSteps,
  InsertionSortWithSteps: insertionSortWithSteps,
  HeapSortWithSteps: heapSortWithSteps,
  CycleSortWithSteps: cycleSortWithSteps,
  ShellSortWithSteps: shellSortWithSteps,
  RadixSortWithSteps: radixSortWithSteps,
  BucketSortWithSteps: bucketSortWithSteps,
};
