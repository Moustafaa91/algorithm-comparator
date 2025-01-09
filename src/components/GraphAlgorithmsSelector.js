import React from "react";
import  { Box, Radio,FormControlLabel,RadioGroup,Typography } from "@mui/material";


function GraphAlgorithmsSelector({
  selectedAlgorithms,
  onSelect,
  disabled,
}) {

    

  const graphAlgorithms = [
    { label: "Breadth First Search", key: "BFS" },
    { label: "Depth First Search", key: "DFS" },
  ];

  const algorithmDescriptions = {
    BFS: "Description of BFS.",
    DFS: "Description of DFS.",
  };

  const getCaptionText = () => {
    if (!selectedAlgorithms.length) {
      return "No algorithm selected.";
    }
    return selectedAlgorithms
      .map((algo) => algorithmDescriptions[algo.replace("WithSteps", "")])
      .join(" ");
  };
  
  
  return (
    <Box>
      <RadioGroup
          name="controlled-radio-buttons-group"
          value={selectedAlgorithms[0] || ""}
          onChange={(e) => onSelect([e.target.value])}
          row
          sx={{ marginLeft: "20px", marginTop: "-20px", marginBottom: "10px" }}
        >
          {graphAlgorithms.map((algo, index) => (
            <FormControlLabel
              key={index}
              value={algo.key}
              control={<Radio size="small" disabled={disabled} />}
              label={<Typography variant="body2">{algo.label}</Typography>}
            />
          ))}
        </RadioGroup>
        <Typography color="warning" variant="caption" gutterBottom sx={{ marginTop: 1 }}>
            {getCaptionText()}
          </Typography>
    </Box>
  );
}


export default GraphAlgorithmsSelector;