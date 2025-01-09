// GraphVisualizer.js
import React, { useState, useEffect, useRef } from "react";
import { useNodesState, useEdgesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Graph from "../components/Graph";
import { generateBFSGraph, generateDFSGraph} from "../utils/graphGenerator";
import AlgorithmSelector from "../components/AlgorithmSelector";
import { graphAlgorithms } from "../algorithms";
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
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isPaused, setIsPaused] = useState(false); // Pause state
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const isPausedRef = useRef(isPaused);

  // Keep `isPausedRef` in sync with `isPaused`
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const togglePause = () => setIsPaused((prev) => !prev);

  const startVisualize = () => {
    if (selectedAlgorithms.length === 0) {
      setOpenSnackbar(true);
      setAlertMessage("Please select an algorithm to start");
      return;
    }

    // Generate steps using the selected algorithm
    const steps = graphAlgorithms[selectedAlgorithms[0]](nodes, edges);
    setSteps(steps);
    setIsRunning(true);

    // Start the animation
    animateSteps(steps);
  };

  const animateSteps = (steps) => {
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (isPausedRef.current) return; // Skip if paused

      if (stepIndex >= steps.length) {
        clearInterval(interval);
        setIsRunning(false); // Stop running when done
        return;
      }

      // Apply the current step
      const { visitedNodes } = steps[stepIndex];

      // Update node styles
      setNodes((prevNodes) =>
        prevNodes.map((node) => ({
          ...node,
          style: visitedNodes.includes(node.id)
            ? { ...node.style, backgroundColor: "#90caf9" } // Highlight visited nodes
            : node.style,
        }))
      );

      stepIndex++;
    }, 1000); // Change steps every 1 second
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
    } else if (selectedAlgorithms[0] === "DFS") {
      const graph = generateDFSGraph().graph;
      setNodes(graph.nodes);
      setEdges(graph.edges);
    } else {
      setNodes([]);
      setEdges([]);
    }
  };

  const handleRefresh = () => {
    setSelectedAlgorithms([]);
    setIsRunning(false);
    setIsPaused(false);
    setNodes([]);
    setEdges([]);
    setSteps([]);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ width: "90%", height: "70%" }}>
      <Box
        sx={{
          bgcolor: "white",
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          marginTop: "-40px",
        }}
      >
        <AlgorithmSelector
          selectedAlgorithms={selectedAlgorithms}
          onSelect={setSelectedAlgorithms}
          isVisual={true}
          disabled={isRunning}
          algorithmsType="graph"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
            marginTop: "-40px",
          }}
        >
          <Button
            onClick={generateGraph}
            disabled={isRunning}
            sx={{ textTransform: "none", height: "50px", width: "150px" }}
          >
            Generate Graph
          </Button>
          <Button
            onClick={startVisualize}
            disabled={isRunning || nodes.length === 0 || edges.length === 0}
            sx={{ textTransform: "none", height: "50px", width: "150px" }}
          >
            Start
          </Button>
          <IconButton color="primary" onClick={togglePause} disabled={!isRunning}>
            {isPaused ? <PlayArrow /> : <Pause />}
          </IconButton>
          <IconButton color="primary" onClick={handleRefresh}>
            <Refresh />
          </IconButton>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={alertMessage}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </Box>

      <Graph
        initialNodes={nodes}
        initialEdges={edges}
        setEdges={setEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      />
    </Box>
  );
};

export default GraphVisualizer;
