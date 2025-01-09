import React, { useState, useEffect, useRef } from "react";
import { useNodesState, useEdgesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Graph from "../components/Graph";
import { graphGenerators } from "../utils/graphGenerator";
import AlgorithmSelector from "../components/AlgorithmSelector";
import { graphAlgorithms } from "../algorithms";
import { Box, Button, IconButton, Typography, Slider, Snackbar, Select, MenuItem, InputLabel, FormControl} from "@mui/material";
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
  const [selectedGraphGenerator, setSelectedGraphGenerator] = useState("");
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
      const { visitedNodes, visitedEdges } = steps[stepIndex];
      console.log(visitedNodes, visitedEdges);

      // Update node styles
      setNodes((prevNodes) =>
        prevNodes.map((node) => ({
          ...node,
          style: visitedNodes.includes(node.id)
            ? { ...node.style, backgroundColor: "#90caf9" } // Highlight visited nodes
            : node.style,
        }))
      );

      // Update edge styles
      setEdges((prevEdges) =>
        prevEdges.map((edge) => ({
          ...edge,
          style: visitedEdges?.includes(edge.id)
            ? { stroke: "#90caf9", strokeWidth: 2 } // Highlight visited edges
            : edge.style,
        }))
      );

      stepIndex++;
    }, 1000); // Change steps every 1 second
  };

  const generateGraph = () => {
    if (!selectedGraphGenerator) {
      setOpenSnackbar(true);
      setAlertMessage("Please select a graph type to generate.");
      return;
    }

    const graph = graphGenerators[selectedGraphGenerator]().graph;
    setNodes(graph.nodes);
    setEdges(graph.edges);
  };

  const handleRefresh = () => {
    setSelectedAlgorithms([]);
    setSelectedGraphGenerator("");
    setIsRunning(false);
    setIsPaused(false);
    setNodes([]);
    setEdges([]);
    setSteps([]);
    clearInterval();
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
          marginTop: "-50px",
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
            marginTop: "-20px",
          }}
        >
          <FormControl sx={{ m:1, minWidth: 200}}>
          <InputLabel  id="graph-generator-label">Graph type</InputLabel>
          <Select
            labelId="graph-generator-label"
            value={selectedGraphGenerator}
            onChange={(e) => setSelectedGraphGenerator(e.target.value)}
            label="Graph Generator"
          >
            {Object.keys(graphGenerators).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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