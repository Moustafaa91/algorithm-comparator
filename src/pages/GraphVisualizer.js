import React, { useState, useEffect, useRef } from "react";
import { useNodesState, useEdgesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Grid,
  Paper,
  Chip,
  LinearProgress,
  Alert,
  Tooltip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  Network,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Info,
  Target,
  Route,
} from "lucide-react";
import { motion } from "framer-motion";
import Graph from "../components/Graph";
import { graphGenerators } from "../utils/graphGenerator";
import AlgorithmSelector from "../components/selectors/AlgorithmSelector";
import { graphAlgorithms } from "../algorithms";
import toast from "react-hot-toast";

const GraphVisualizer = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [steps, setSteps] = useState([]);
  const [shortestPaths, setShortestPaths] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [selectedGraphGenerator, setSelectedGraphGenerator] = useState("");
  const [source, setSource] = useState("");
  const [sourceNeeded, setSourceNeeded] = useState(false);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const togglePause = () => setIsPaused((prev) => !prev);

  const startVisualize = () => {
    if (selectedAlgorithms.length === 0) {
      toast.error("Please select an algorithm to start");
      return;
    }

    let result;
    if (selectedAlgorithms[0] === "Dijkstra") {
      if (!source) {
        toast.error("Please select a source node to run the algorithm");
        return;
      }
      if (!graphGenerators[selectedGraphGenerator].weighted) {
        toast.error("This algorithm requires a weighted graph to run");
        return;
      }
      result = graphAlgorithms[selectedAlgorithms[0]].id(source, nodes, edges);
    } else {
      result = graphAlgorithms[selectedAlgorithms[0]].id(nodes, edges);
    }
    setSteps(result.steps);
    if (result.shortestPaths) setShortestPaths(result.shortestPaths);
    setIsRunning(true);
    toast.success("Graph algorithm started!");

    animateSteps(result.steps);
  };

  const animateSteps = (steps) => {
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (isPausedRef.current) return;

      if (stepIndex >= steps.length) {
        clearInterval(interval);
        setIsRunning(false);
        toast.success("Algorithm completed!");
        return;
      }

      const { visitedNodes, visitedEdges } = steps[stepIndex];

      setNodes((prevNodes) =>
        prevNodes.map((node) => ({
          ...node,
          style: visitedNodes.includes(node.id)
            ? { ...node.style, backgroundColor: "#6366f1" }
            : node.style,
        }))
      );

      setEdges((prevEdges) =>
        prevEdges.map((edge) => ({
          ...edge,
          style: visitedEdges?.includes(edge.id)
            ? { stroke: "#6366f1", strokeWidth: 3 }
            : edge.style,
        }))
      );

      stepIndex++;
    }, 1000);
  };

  const generateGraph = () => {
    if (!selectedGraphGenerator) {
      toast.error("Please select a graph type to generate.");
      return;
    }

    const graph = graphGenerators[selectedGraphGenerator].generate().graph;
    setNodes(graph.nodes);
    setEdges(graph.edges);
    toast.success("Graph generated successfully!");
  };

  const handleRefresh = () => {
    setSelectedAlgorithms([]);
    setSelectedGraphGenerator("");
    setIsRunning(false);
    setIsPaused(false);
    setNodes([]);
    setEdges([]);
    setSteps([]);
    setShortestPaths([]);
    setSource("");
    setSourceNeeded(false);
    toast.success("Visualization reset!");
  };

  useEffect(() => {
    setSourceNeeded(selectedAlgorithms[0] === "Dijkstra");
  }, [selectedAlgorithms]);

  const getAlgorithmColor = (algorithm) => {
    const colors = {
      "BFS": "#ef4444",
      "DFS": "#22c55e",
      "Dijkstra": "#3b82f6",
    };
    return colors[algorithm] || "#6366f1";
  };

  return (
    <Box sx={{ maxWidth: 1600, mx: "auto" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            mb: 4,
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            color: "white",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <CardContent sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: "rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Network size={24} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Graph Algorithm Visualization
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Explore graph traversal algorithms with interactive visualizations
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <AlgorithmSelector
                  selectedAlgorithms={selectedAlgorithms}
                  onSelect={setSelectedAlgorithms}
                  isVisual={true}
                  disabled={isRunning}
                  algorithmsType="graph"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Graph Type</InputLabel>
                  <Select
                    value={selectedGraphGenerator}
                    onChange={(e) => setSelectedGraphGenerator(e.target.value)}
                    label="Graph Type"
                    disabled={selectedAlgorithms.length === 0}
                  >
                    {Object.keys(graphGenerators).map((key) => (
                      <MenuItem 
                        key={key} 
                        value={key} 
                        disabled={graphAlgorithms[selectedAlgorithms[0]]?.requireWeight && !graphGenerators[key].weighted}
                      >
                        {graphGenerators[key].id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    onClick={generateGraph}
                    disabled={isRunning}
                    startIcon={<Network size={16} />}
                    sx={{
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    }}
                  >
                    Generate Graph
                  </Button>
                  <Button
                    variant="contained"
                    onClick={startVisualize}
                    disabled={isRunning || nodes.length === 0 || edges.length === 0}
                    startIcon={<Play size={16} />}
                    sx={{
                      background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                    }}
                  >
                    Start Algorithm
                  </Button>
                  <Tooltip title={isPaused ? "Resume" : "Pause"}>
                    <IconButton
                      onClick={togglePause}
                      disabled={!isRunning}
                      sx={{
                        background: isPaused ? "#10b981" : "#f59e0b",
                        color: "white",
                      }}
                    >
                      {isPaused ? <Play size={16} /> : <Pause size={16} />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reset">
                    <IconButton
                      onClick={handleRefresh}
                      sx={{
                        background: "#ef4444",
                        color: "white",
                      }}
                    >
                      <RotateCcw size={16} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                {sourceNeeded && (
                  <FormControl fullWidth>
                    <InputLabel>Source Node</InputLabel>
                    <Select
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      label="Source Node"
                    >
                      {nodes.map((node) => (
                        <MenuItem key={node.id} value={node.id}>
                          {node.id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Grid>
            </Grid>

            {/* Progress */}
            {isRunning && (
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Zap size={20} color="#6366f1" />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Running {selectedAlgorithms[0]} algorithm...
                  </Typography>
                </Box>
                <LinearProgress
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    background: "rgba(99, 102, 241, 0.1)",
                    "& .MuiLinearProgress-bar": {
                      background: `linear-gradient(135deg, ${getAlgorithmColor(selectedAlgorithms[0])} 0%, #6366f1 100%)`,
                    },
                  }}
                />
              </Box>
            )}

            {/* Algorithm Info */}
            {selectedAlgorithms.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Alert severity="info" icon={<Info size={20} />} sx={{ borderRadius: 2 }}>
                  <Typography variant="body2">
                    <strong>{selectedAlgorithms[0]}</strong> - {selectedAlgorithms[0] === "BFS" && "Explores nodes level by level, visiting all neighbors before moving to the next level."}
                    {selectedAlgorithms[0] === "DFS" && "Explores as far as possible along one branch before backtracking."}
                    {selectedAlgorithms[0] === "Dijkstra" && "Finds the shortest path from a source node to all other nodes in a weighted graph."}
                  </Typography>
                </Alert>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Shortest Paths Display */}
      {shortestPaths.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Route size={24} color="#6366f1" />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Shortest Paths
                </Typography>
              </Box>
              <Grid container spacing={2}>
                {shortestPaths.map(({ node, path, distance }) => (
                  <Grid item xs={12} sm={6} md={4} key={node}>
                    <Paper
                      sx={{
                        p: 2,
                        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                        border: "1px solid rgba(99, 102, 241, 0.1)",
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        To node {node}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                        Path: {path.map((p, index) => (
                          <span key={p}>
                            <span style={{ color: "#6366f1", fontWeight: "bold" }}>
                              {p}
                            </span>
                            {index < path.length - 1 && " → "}
                          </span>
                        ))}
                      </Typography>
                      <Chip
                        label={`Distance: ${distance}`}
                        size="small"
                        sx={{
                          background: "#6366f1",
                          color: "white",
                          fontWeight: 500,
                        }}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Graph Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Target size={24} color="#6366f1" />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Interactive Graph
              </Typography>
              {selectedAlgorithms.length > 0 && (
                <Chip
                  label={selectedAlgorithms[0]}
                  size="small"
                  sx={{
                    background: getAlgorithmColor(selectedAlgorithms[0]),
                    color: "white",
                    fontWeight: 500,
                  }}
                />
              )}
            </Box>
            
            <Paper
              sx={{
                height: 600,
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid rgba(99, 102, 241, 0.1)",
              }}
            >
              {nodes.length > 0 ? (
                <Graph
                  initialNodes={nodes}
                  initialEdges={edges}
                  setEdges={setEdges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                />
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    color: "text.secondary",
                  }}
                >
                  <Network size={64} />
                  <Typography variant="h6">No graph generated</Typography>
                  <Typography variant="body2">
                    Click "Generate Graph" to create a new graph for visualization
                  </Typography>
                </Box>
              )}
            </Paper>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default GraphVisualizer;
