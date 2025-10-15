import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
} from '@mui/material';

function SortingTypes({ inputType, onSelect }) {
  return (
    <FormControl>
      <FormLabel>
        <Typography variant="subtitle2">Input Type</Typography>
      </FormLabel>
      <RadioGroup
        value={inputType}
        onChange={(e) => onSelect(e.target.value)}
        row
      >
        <FormControlLabel
          value="random"
          control={<Radio size="small" />}
          label={<Typography variant="body2">Random</Typography>}
        />
        <FormControlLabel
          value="sorted"
          control={<Radio size="small" />}
          label={<Typography variant="body2">Sorted</Typography>}
        />
        <FormControlLabel
          value="reverse-sorted"
          control={<Radio size="small" />}
          label={<Typography variant="body2">Reverse</Typography>}
        />
      </RadioGroup>
    </FormControl>
  );
}

export default SortingTypes;
