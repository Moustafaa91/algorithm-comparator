import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import SortingAlgorithmsSelector from "./SortingAlgorithmsSelector";
import SearchAlgorithmsSelector from "./SearchingAlgorithmsSelector";

function AlgorithmSelector({
  selectedAlgorithms,
  onSelect,
  isVisual,
  disabled,
  algorithmsType,
}) {

  return (
    <FormGroup>
      <FormLabel component="legend">
        <Typography variant="h6">
          {!isVisual ? "Select algorithm(s)" : "Select one algorithm"}
        </Typography>
      </FormLabel>
      {algorithmsType === "sorting" ? (
        <SortingAlgorithmsSelector
          selectedAlgorithms={selectedAlgorithms}
          onSelect={onSelect}
          isVisual={isVisual}
          disabled={disabled}
        />
      ) : algorithmsType === "searching" ? (
        <SearchAlgorithmsSelector
          selectedAlgorithms={selectedAlgorithms}
          onSelect={onSelect}
          isVisual={isVisual}
          disabled={false}
        />
      ) : (
        <label>Invalid algorithm type</label>
      )}
    </FormGroup>
  );
}

export default AlgorithmSelector;
