import React from "react";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";

function SearchingAlgorithmsSelector({
  selectedAlgorithms,
  onSelect,
  disabled,
}) {
  const searchingAlgorithms = [
    { label: "Linear Search", key: "LinearSearch" },
    { label: "Binary Search", key: "BinarySearch" },
    { label: "Jump Search", key: "JumpSearch" },
    { label: "Exponential Search", key: "ExponentialSearch" },
    { label: "Ternary Search", key: "TernarySearch" },
  ];

  const algorithmDescriptions = {
    LinearSearch: "Linear Search: O(n) - Simple and effective for small or unsorted datasets but inefficient for large collections due to sequential checks.",
    BinarySearch: "Binary Search: O(log n) - Highly efficient for large sorted datasets, but requires preprocessing (sorting) and struggles with unsorted data.",
    JumpSearch: "Jump Search: O(√n) - Faster than Linear Search on sorted datasets with a good jump size, but inefficient for unsorted data or improper jump sizes.",
    ExponentialSearch: "Exponential Search: O(log n) - Excellent for searching in sorted datasets where the target is likely near the start but less efficient without sorted data.",
    TernarySearch: "Ternary Search: O(log n) - Works well on sorted datasets and is conceptually similar to Binary Search but less efficient in practice due to higher comparison overhead.",
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
          {searchingAlgorithms.map((algo, index) => (
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


export default SearchingAlgorithmsSelector;