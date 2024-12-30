import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function SortingTypes({ inputType, onSelect }) {
  return (
    <FormControl style={{ width: 400, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <FormLabel id="demo-controlled-radio-buttons-group">Input type</FormLabel>
      <RadioGroup
        name="controlled-radio-buttons-group"
        style={{ marginLeft: '20px' }}
      >
        <FormControlLabel
          onChange={(e) => onSelect(e.target.value)}
          checked={inputType === 'random'}
          value="random"
          control={<Radio />}
          label={<span style={{ fontSize: '0.875rem' }}>Random - (Average case)</span>}
        />
        <FormControlLabel
          onChange={(e) => onSelect(e.target.value)}
          checked={inputType === 'sorted'}
          value="sorted"
          control={<Radio />}
          label={<span style={{ fontSize: '0.875rem' }}>Sorted - (Best case)</span>}
        />
        <FormControlLabel
          onChange={(e) => onSelect(e.target.value)}
          checked={inputType === 'reverse-sorted'}
          value="reverse-sorted"
          control={<Radio />}
          label={<span style={{ fontSize: '0.875rem' }}>Reverse Sorted - (Worst case)</span>}
        />
      </RadioGroup>
    </FormControl>
  );
}

export default SortingTypes;