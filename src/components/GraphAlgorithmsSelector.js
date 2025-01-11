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
    { label: "Dijkstra", key: "Dijkstra" },
  ];

  const algorithmDescriptions = {
    BFS: "Breadth-First Search (BFS) explores all neighbors of a node before moving to the next depth level. It is commonly used for finding the shortest path in unweighted graphs. Complexity: Time O(V + E), Space O(V), where V is the number of vertices and E is the number of edges.",
    DFS: "Depth-First Search (DFS) explores as far as possible along one branch before backtracking. It is useful for tasks like detecting cycles and topological sorting. Complexity: Time O(V + E), Space O(V).",
    Dijkstra: "Dijkstra's algorithm finds the shortest path from a source node to all other nodes in a graph with non-negative edge weights. Complexity: Time O((V + E) log V) using a priority queue, Space O(V).",
};

  const getCaptionText = () => {
    if (!selectedAlgorithms.length) {
      return "No algorithm selected.";
    }
    return selectedAlgorithms
      .map((algo) => algorithmDescriptions[algo])
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