import React from "react";
import { FormGroup,FormControlLabel,Checkbox,Radio,RadioGroup,Typography,Box } from "@mui/material";

function SortingAlgorithmsSelector({
  selectedAlgorithms,
  onSelect,
  isVisual,
  disabled,
}) {
  const sortingAlgorithms = [
    { label: "Bubble Sort", key: "BubbleSort" },
    { label: "Quick Sort", key: "QuickSort" },
    { label: "Merge Sort", key: "MergeSort" },
    { label: "Selection Sort", key: "SelectionSort" },
    { label: "Insertion Sort", key: "InsertionSort" },
    { label: "Heap Sort", key: "HeapSort" },
    { label: "Cycle Sort", key: "CycleSort" },
    { label: "Shell Sort", key: "ShellSort" },
    { label: "Radix Sort", key: "RadixSort" },
    { label: "Bucket Sort", key: "BucketSort" },
  ];
  const sortingAlgorithmsVisual = [
    { label: "Bubble Sort", key: "BubbleSortWithSteps" },
    { label: "Quick Sort", key: "QuickSortWithSteps" },
    { label: "Merge Sort", key: "MergeSortWithSteps" },
    { label: "Selection Sort", key: "SelectionSortWithSteps" },
    { label: "Insertion Sort", key: "InsertionSortWithSteps" },
    { label: "Heap Sort", key: "HeapSortWithSteps" },
    { label: "Cycle Sort", key: "CycleSortWithSteps" },
    { label: "Shell Sort", key: "ShellSortWithSteps" },
    { label: "Radix Sort", key: "RadixSortWithSteps" },
    { label: "Bucket Sort", key: "BucketSortWithSteps" },
  ];
  
  const algorithmDescriptions = {
    BubbleSort: "Bubble Sort: O(n^2) - Best for learning sorting concepts, but highly inefficient for large datasets.",
    QuickSort: "Quick Sort: O(n log n) on average - Excellent for large datasets due to its divide-and-conquer approach, but struggles with stability and can degrade to O(n^2) for already sorted or nearly sorted data without proper pivot selection.",
    MergeSort: "Merge Sort: O(n log n) - Great for large datasets requiring stability, but requires additional memory for merging.",
    SelectionSort: "Selection Sort: O(n^2) - Simple and memory-efficient but too slow for large datasets.",
    InsertionSort: "Insertion Sort: O(n^2) - Performs well on small or nearly sorted datasets but is inefficient for large or random data.",
    HeapSort: "Heap Sort: O(n log n) - Suitable for large datasets with memory constraints, but not stable and has slower constant factors compared to Quick Sort.",
    CycleSort: "Cycle Sort: O(n^2) - Best for cases where minimal memory writes are needed, but impractical for general use due to inefficiency.",
    ShellSort: "Shell Sort: O(n^(3/2)) on average - Good for medium-sized datasets, but performance heavily depends on the gap sequence chosen.",
    RadixSort: "Radix Sort: O(nk) - Highly efficient for sorting integers with a small range, where k is the number of digits. Struggles with data requiring complex key transformations or non-integer data.",
    BucketSort: "Bucket Sort: O(n + k) - Ideal for uniformly distributed data, where k is the number of buckets, but can degrade with skewed distributions or inappropriate bucket sizes.",
  };
  

  const getCaptionText = () => {
    if (!selectedAlgorithms.length) {
      return "No algorithm selected.";
    }
    return selectedAlgorithms
      .map((algo) => algorithmDescriptions[algo.replace("WithSteps", "")])
      .join(" ");
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;
    onSelect((prev) =>
      checked
        ? [...prev, value]
        : prev.filter((algorithm) => algorithm !== value)
    );
  };

  return (
    <FormGroup row style={{ marginRight: "-100px", marginTop: "-5px" }}>
      {!isVisual ? (
        sortingAlgorithms.map((algo, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox size="small" />}
            label={<Typography variant="body2">{algo.label}</Typography>}
            value={algo.key}
            checked={selectedAlgorithms.includes(algo.key)}
            onChange={handleChange}
          />
        ))
      ) : (
        <Box>
          <RadioGroup
            name="controlled-radio-buttons-group"
            value={selectedAlgorithms[0] || ""}
            onChange={(e) => onSelect([e.target.value])}
            row
            style={{ marginLeft: "20px" }}
          >
            {sortingAlgorithmsVisual.map((algo, index) => (
              <FormControlLabel
                key={index}
                value={algo.key}
                control={<Radio size="small" disabled={disabled} />}
                label={<Typography variant="body2">{algo.label}</Typography>}
              />
            ))}
          </RadioGroup>
          <Typography color="warning" variant="caption" gutterBottom sx={{ marginTop: 1 }}>
            {getCaptionText()}
          </Typography>
        </Box>
      )}
    </FormGroup>
  );
}

export default SortingAlgorithmsSelector;
