import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function SortingTypes({ inputType, onSelect }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"

      >
        <FormControlLabel onChange={(e) => onSelect(e.target.value)} checked={inputType === 'random'} value="random" control={<Radio />} label="Random - (Average case)" />
        <FormControlLabel onChange={(e) => onSelect(e.target.value)} checked={inputType === 'sorted'} value="sorted" control={<Radio />} label="Sorted - (Best case)" />
        <FormControlLabel onChange={(e) => onSelect(e.target.value)} checked={inputType === 'reverse-sorted'} value="reverse-sorted" control={<Radio />} label="Reverse Sorted - (Worst case)" />
      </RadioGroup>
    </div>
  );
}

export default SortingTypes;