import React from 'react';
import { FormControl,FormLabel,RadioGroup,FormControlLabel,Radio,Typography } from '@mui/material';

function SortingTypes({ inputType, onSelect }) {
  return (
    <FormControl style={{ width: 500, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <FormLabel id="demo-controlled-radio-buttons-group">
        <Typography variant="h6">Input type</Typography>
      </FormLabel>
      <RadioGroup
        name="controlled-radio-buttons-group"
        style={{ marginLeft: '10px' }}
      >
        <FormControlLabel
          onChange={(e) => onSelect(e.target.value)}
          checked={inputType === 'random'}
          value="random"
          control={<Radio size="small" />}
          label={<Typography variant="body2">Random - (Average case)</Typography>}
          sx={{marginTop: '-10px'}}
        />
        <FormControlLabel
          onChange={(e) => onSelect(e.target.value)}
          checked={inputType === 'sorted'}
          value="sorted"
          control={<Radio size="small" />}
          label={<Typography variant="body2">Sorted - (Best case)</Typography>}
          sx={{marginTop: '-10px'}}
        />
        <FormControlLabel
          onChange={(e) => onSelect(e.target.value)}
          checked={inputType === 'reverse-sorted'}
          value="reverse-sorted"
          control={<Radio size="small" />}
          label={<Typography variant="body2">Reverse Sorted - (Worst case)</Typography>}
          sx={{marginTop: '-10px'}}
        />
      </RadioGroup>
    </FormControl>
  );
}

export default SortingTypes;