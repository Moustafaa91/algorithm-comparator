// GraphVisualizer.js
import React, { useState, useEffect } from "react";
import Graph from "../components/Graph";
import { useNodesState, useEdgesState } from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { generateBFSGraph } from "../utils/graphGenerator";
import AlgorithmSelector from "../components/AlgorithmSelector";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Snackbar from "@mui/material/Snackbar";
import { PlayArrow, Pause, Refresh } from "@mui/icons-material";

const GraphVisualizer = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isPaused, setIsPaused] = useState(false); // Pause state
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);

  // Pause/Resume functionality
  const togglePause = () => setIsPaused((prev) => !prev);

  const startVisualize = () => {
    if (selectedAlgorithms.length === 0) {
      setOpenSnackbar(true);
      setAlertMessage("Please select an algorithm to start");
      return;
    }
    
  };

  const generateGraph = () => {
    if (selectedAlgorithms.length === 0) {
      setOpenSnackbar(true);
      setAlertMessage("Please select an algorithm to generate");
      return;
    }
    if (selectedAlgorithms[0] === "BFS") {
      const graph = generateBFSGraph().graph;
      setNodes(graph.nodes);
      setEdges(graph.edges);
    } else {
      setNodes([]);
      setEdges([]);
    }
  };
  

  const handleRefresh = () => {
    setCurrentStepIndex(0);
    setSelectedAlgorithms([]);
    setIsRunning(false);
    setIsPaused(false);
    setNodes([]);
    setEdges([]);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

   


  return (
    <Box sx={{ width: "90%", height: "70%" }}>
      <Box sx={{ bgcolor: "white", display: "flex", flexDirection: "column", gap: "1px", marginTop: "-40px" }}>
        <AlgorithmSelector
          selectedAlgorithms={selectedAlgorithms}
          onSelect={setSelectedAlgorithms}
          isVisual={true}
          disabled={isRunning}
          algorithmsType="graph"
        />
        <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center", marginTop: "-40px" }}>
        <Button onClick={generateGraph} disabled={isRunning} sx={{ textTransform: "none", height: "50px", width: "150px" }}>
          Generate Graph
        </Button>
        <Button onClick={startVisualize} disabled={isRunning || nodes.length === 0 || edges.length === 0} sx={{ textTransform: "none", height: "50px", width: "150px" }} >
            Start
        </Button>
          <IconButton
            color="primary"
            onClick={togglePause}
            disabled={!isRunning}
          >
            {isPaused ? <PlayArrow /> : <Pause />}
          </IconButton>
          <IconButton color="primary" onClick={handleRefresh}>
            <Refresh />
          </IconButton>
        </Box>
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} message={alertMessage} anchorOrigin={{ vertical: "top", horizontal: "center" }} />
      </Box>

      <Graph initialNodes={nodes} initialEdges={edges} setEdges={setEdges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} />
    </Box>
  );
};

export default GraphVisualizer;