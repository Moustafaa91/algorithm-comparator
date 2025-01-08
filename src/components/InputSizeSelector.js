import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function InputSizeSelector({ selectedSize, onSelect }) {
  const sizes = [
    { value: 10, label: '10' },
    { value: 1000, label: '1k' },
    { value: 10000, label: '10k' },
    { value: 50000, label: '50k' },
    { value: 100000, label: '100k' },
    { value: 500000, label: '500k' },
    { value: 1000000, label: '1m' },
    { value: 5000000, label: '5m' },
    { value: 10000000, label: '10m' },
  ];

  return (
    <Box sx={{ minWidth: 140 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Input Size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSize}
          label="Input size"
          onChange={(e) => onSelect(Number(e.target.value))}
        >
           {sizes.map((size) => (
            <MenuItem key={size.value} value={size.value}> {size.label} </MenuItem>
            ))}

        </Select>
      </FormControl>
    </Box>

    
  );
}

export default InputSizeSelector;
