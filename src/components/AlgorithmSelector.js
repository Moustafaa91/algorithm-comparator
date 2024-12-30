import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

function AlgorithmSelector({ selectedAlgorithms, onSelect, isVisual }) {
  const algorithms = [
    { label: 'Bubble Sort', key: 'BubbleSort' },
    { label: 'Quick Sort', key: 'QuickSort' },
    { label: 'Merge Sort', key: 'MergeSort' },
    { label: 'Selection Sort', key: 'SelectionSort' },
    { label: 'Insertion Sort', key: 'InsertionSort' },
    { label: 'Heap Sort', key: 'HeapSort' },
    { label: 'Cycle Sort', key: 'CycleSort' }
  ];
  const algorithmsVisual = [
    { label: 'Bubble Sort', key: 'BubbleSortWithSteps' }, 
    { label: 'Quick Sort', key: 'QuickSortWithSteps' },
    { label: 'Merge Sort', key: 'MergeSortWithSteps' }
  ];

  const handleChange = (e) => {
    const { value, checked } = e.target;
    onSelect((prev) =>
      checked ? [...prev, value] : prev.filter((algorithm) => algorithm !== value)
    );
  };

  return (
    <FormGroup>
      {!isVisual ? (
        <FormLabel component="legend">Select algorithm(s)</FormLabel>
      ) : (
      <FormLabel component="legend">Select one algorithm</FormLabel>
      )}
      <FormGroup row style={{ marginRight: '-100px' }}>
        {!isVisual ? (
          algorithms.map((algo, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox />}
              label={algo.label}
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
                control={<Radio />}
                label={<span style={{ fontSize: '0.875rem' }}>{algo.label}</span>}
              />
            ))}
          </RadioGroup>
        )}
      </FormGroup>
    </FormGroup>
  );
}

export default AlgorithmSelector;
