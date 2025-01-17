import React from "react";
import { FormGroup, FormLabel, Typography } from "@mui/material";
import SortingAlgorithmsSelector from "./SortingAlgorithmsSelector";
import SearchAlgorithmsSelector from "./SearchingAlgorithmsSelector";
import GraphAlgorithmsSelector from "./GraphAlgorithmsSelector";

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
          disabled={disabled}
        />
       ) : algorithmsType === "graph" ? (
          <GraphAlgorithmsSelector
            selectedAlgorithms={selectedAlgorithms}
            onSelect={onSelect}
            isVisual={isVisual}
            disabled={disabled}
          />
      ) : (
        <label>Invalid algorithm type</label>
      )}
    </FormGroup>
  );
}

export default AlgorithmSelector;
