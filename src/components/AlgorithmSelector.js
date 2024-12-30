import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';

function AlgorithmSelector({ selectedAlgorithms, onSelect }) {
  const algorithms = ['BubbleSort', 'QuickSort', 'MergeSort', 'SelectionSort', 'InsertionSort', 'HeapSort', 'CycleSort'];

  const handleChange = (e) => {
    const { value, checked } = e.target;
    onSelect((prev) =>
      checked ? [...prev, value] : prev.filter((algorithm) => algorithm !== value)
    );
  };

  return (
    <FormGroup >
      <FormLabel component="legend">Select Algorithm(s)</FormLabel>
      <FormGroup row style={{ marginRight: '-100px' }}>
        {algorithms.map((algo, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox />}
              label={algo}
              value={algo}
              checked={selectedAlgorithms.includes(algo)}
              onChange={handleChange}
            />
        ))}
      </FormGroup>
    </FormGroup>
  );
}

export default AlgorithmSelector;
