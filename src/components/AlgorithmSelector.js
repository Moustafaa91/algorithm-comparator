import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import SortingAlgorithmsSelector from './SortingAlgorithmsSelector';

function AlgorithmSelector({ selectedAlgorithms, onSelect, isVisual, disabled, algorithmsType}) {

  const SearchingAlgorithmsVisual = [
    { label: 'Linear Search', key: 'LinearSearch' }, 
    { label: 'Binary Search', key: 'BinarySearch' },
    { label: 'Jump Search', key: 'JumpSearch' },
  ];
  

  return (
    <FormGroup>
      <FormLabel component="legend">
        <Typography variant="h6">
          {!isVisual ? 'Select algorithm(s)' : 'Select one algorithm'}
        </Typography>
      </FormLabel>
      {algorithmsType === 'sorting' ? (
        <SortingAlgorithmsSelector 
          selectedAlgorithms={selectedAlgorithms} 
          onSelect={onSelect} 
          isVisual={isVisual} 
          disabled={disabled} 
        />
      ) : (
        <label>Search algorithm selector</label>
      )}
    </FormGroup>
  );
}

export default AlgorithmSelector;