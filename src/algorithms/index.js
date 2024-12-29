import { quickSort } from './QuickSort';
import { bubbleSort } from './BubbleSort';
import { mergeSort } from './MergeSort';
import { selectionSort } from './SelectionSort';
import { insertionSort } from './InsertionSort';
import { heapSort } from './HeapSort';
import { cycleSort } from './CycleSort';

export const algorithms = {
  QuickSort: quickSort,
  BubbleSort: bubbleSort,
  MergeSort: mergeSort,
  SelectionSort: selectionSort,
  InsertionSort: insertionSort,
  HeapSort: heapSort,
  CycleSort: cycleSort,
};
