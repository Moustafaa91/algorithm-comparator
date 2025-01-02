import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
  
  const handleChange = (e) => {
    const { value, checked } = e.target;
    onSelect((prev) =>
      checked
        ? [...prev, value]
        : prev.filter((algorithm) => algorithm !== value)
    );
  };

  return (
    <FormGroup row sx={{ marginRight: "-100px" }}>
      <RadioGroup
          name="controlled-radio-buttons-group"
          value={selectedAlgorithms[0] || ""}
          onChange={(e) => onSelect([e.target.value])}
          row
          sx={{ marginLeft: "20px", marginTop: "-20px", marginBottom: "-20px" }}
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
    </FormGroup>
  );
}


export default SearchingAlgorithmsSelector;