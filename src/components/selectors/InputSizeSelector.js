import React from 'react';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from '@mui/material';

function InputSizeSelector({ selectedSize, onSelect }) {
  const sizes = [
    { value: 10, label: '10' },
    { value: 1000, label: '1K' },
    { value: 10000, label: '10K' },
    { value: 50000, label: '50K' },
    { value: 100000, label: '100K' },
    { value: 500000, label: '500K' },
    { value: 1000000, label: '1M' },
    { value: 5000000, label: '5M' },
    { value: 10000000, label: '10M' },
  ];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Input Size</InputLabel>
        <Select
          value={selectedSize}
          label="Input Size"
          onChange={(e) => onSelect(Number(e.target.value))}
        >
          {sizes.map((size) => (
            <MenuItem key={size.value} value={size.value}>
              {size.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default InputSizeSelector;
