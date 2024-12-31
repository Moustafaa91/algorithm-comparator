import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';

function AlgorithmSelector({ selectedAlgorithms, onSelect, isVisual, disabled}) {
  const algorithms = [
    { label: 'Bubble Sort', key: 'BubbleSort' },
    { label: 'Quick Sort', key: 'QuickSort' },
    { label: 'Merge Sort', key: 'MergeSort' },
    { label: 'Selection Sort', key: 'SelectionSort' },
    { label: 'Insertion Sort', key: 'InsertionSort' },
    { label: 'Heap Sort', key: 'HeapSort' },
    { label: 'Cycle Sort', key: 'CycleSort' },
    { label: 'Shell Sort', key: 'ShellSort' },
    { label: 'Radix Sort', key: 'RadixSort' },
    { label: 'Bucket Sort', key: 'BucketSort' }
  ];
  const algorithmsVisual = [
    { label: 'Bubble Sort', key: 'BubbleSortWithSteps' }, 
    { label: 'Quick Sort', key: 'QuickSortWithSteps' },
    { label: 'Merge Sort', key: 'MergeSortWithSteps' },
    { label: 'Selection Sort', key: 'SelectionSortWithSteps' },
    { label: 'Insertion Sort', key: 'InsertionSortWithSteps' },
    { label: 'Heap Sort', key: 'HeapSortWithSteps' },
    { label: 'Cycle Sort', key: 'CycleSortWithSteps' },
    { label: 'Shell Sort', key: 'ShellSortWithSteps' },
    { label: 'Radix Sort', key: 'RadixSortWithSteps' },
    { label: 'Bucket Sort', key: 'BucketSortWithSteps' }
  ];

  const handleChange = (e) => {
    const { value, checked } = e.target;
    onSelect((prev) =>
      checked ? [...prev, value] : prev.filter((algorithm) => algorithm !== value)
    );
  };

  return (
    <FormGroup>
      <FormLabel component="legend">
        <Typography variant="h6">
          {!isVisual ? 'Select algorithm(s)' : 'Select one algorithm'}
        </Typography>
      </FormLabel>
      <FormGroup row style={{ marginRight: '-100px' }}>
        {!isVisual ? (
          algorithms.map((algo, index) => (
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
          <RadioGroup
            name="controlled-radio-buttons-group"
            value={selectedAlgorithms[0] || ''}
            onChange={(e) => onSelect([e.target.value])}
            row
            style={{ marginLeft: '20px' }}
          >
            {algorithmsVisual.map((algo, index) => (
              <FormControlLabel
                key={index}
                value={algo.key}
                control={<Radio size="small" disabled={disabled} />}
                label={<Typography variant="body2">{algo.label}</Typography>}
              />
            ))}
          </RadioGroup>
        )}
      </FormGroup>
    </FormGroup>
  );
}

export default AlgorithmSelector;