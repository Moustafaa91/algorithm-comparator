import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  useTheme,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { motion } from "framer-motion";

function AlgorithmSelector({
  selectedAlgorithms,
  onSelect,
  isVisual,
  disabled,
  algorithmsType,
}) {
  const theme = useTheme();

  const getAlgorithms = () => {
    switch (algorithmsType) {
      case "sorting":
        return isVisual
          ? [
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
            ]
          : [
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
      case "searching":
        return [
          { label: "Linear Search", key: "LinearSearch" },
          { label: "Binary Search", key: "BinarySearch" },
          { label: "Jump Search", key: "JumpSearch" },
          { label: "Exponential Search", key: "ExponentialSearch" },
          { label: "Ternary Search", key: "TernarySearch" },
        ];
      case "graph":
        return [
          { label: "BFS", key: "BFS" },
          { label: "DFS", key: "DFS" },
          { label: "Dijkstra", key: "Dijkstra" },
        ];
      default:
        return [];
    }
  };

  const algorithms = getAlgorithms();

  const handleChange = (event) => {
    if (isVisual) {
      onSelect([event.target.value]);
    } else {
      // For multiple selection, Material-UI passes the entire array of selected values
      const newSelection = event.target.value;
      
      // Remove duplicates using Set to ensure no duplicates
      const uniqueSelection = [...new Set(newSelection)];
      
      onSelect(uniqueSelection);
    }
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel>
          {isVisual ? "Select Algorithm" : "Select Algorithm(s)"}
        </InputLabel>
        <Select
          multiple={!isVisual}
          value={isVisual ? selectedAlgorithms[0] || "" : selectedAlgorithms}
          onChange={handleChange}
          disabled={disabled}
          input={<OutlinedInput label={isVisual ? "Select Algorithm" : "Select Algorithm(s)"} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {isVisual ? (
                <Chip
                  label={algorithms.find((algo) => algo.key === selected)?.label || ""}
                  size="small"
                  color="primary"
                />
              ) : (
                selected.map((value) => (
                  <Chip
                    key={value}
                    label={algorithms.find((algo) => algo.key === value)?.label || ""}
                    size="small"
                    color="primary"
                  />
                ))
              )}
            </Box>
          )}
        >
          {algorithms.map((algo) => {
            const isSelected = selectedAlgorithms.includes(algo.key);
            return (
              <MenuItem 
                key={algo.key} 
                value={algo.key}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  
                  if (isVisual) {
                    onSelect([algo.key]);
                  } else {
                    if (isSelected) {
                      // Remove if already selected
                      onSelect(selectedAlgorithms.filter(item => item !== algo.key));
                    } else {
                      // Add if not selected
                      onSelect([...selectedAlgorithms, algo.key]);
                    }
                  }
                }}
                sx={{
                  backgroundColor: isSelected ? 'primary.light' : 'transparent',
                  '&:hover': {
                    backgroundColor: isSelected ? 'primary.light' : 'action.hover',
                  }
                }}
              >
                <Checkbox
                  checked={isSelected}
                  color="primary"
                />
                <ListItemText primary={algo.label} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default AlgorithmSelector;
