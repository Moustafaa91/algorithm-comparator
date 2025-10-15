import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Slider,
  IconButton,
  Grid,
  Paper,
  Chip,
  LinearProgress,
  Alert,
  Tooltip,
} from "@mui/material";
import {
  Search,
  Play,
  Pause,
  RotateCcw,
  Target,
  Zap,
  Info,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import AlgorithmSelector from "../components/selectors/AlgorithmSelector";
import { searchingAlgorithms } from "../algorithms";
import "./SearchVisualizer.css";
import toast from "react-hot-toast";

const SearchVisualizer = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [found, setFound] = useState(false);
  const [size, setSize] = useState(10);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const stepIndexRef = useRef(0);
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState([]);

  const sortingRequiredAlgorithms = ["BinarySearch", "JumpSearch", "ExponentialSearch", "TernarySearch"];

  const generateArray = () => {
    if (speed < 1 || speed > 1000) {
      toast.error("Speed must be between 1 and 1000 ms.");
      return;
    }
    if (size < 1 || size > 1000) {
      toast.error("Array size must be between 1 and 1000");
      return;
    }
    const newArray = sortingRequiredAlgorithms.includes(selectedAlgorithms[0])
      ? Array.from({ length: size }, (_, i) => i + 1)
      : Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
    setArray(newArray);
    setCurrentIndex(null);
    setFound(false);
    setSteps([]);
    toast.success("New array generated!");
  };

  const togglePause = () => setIsPaused((prev) => !prev);

  const startVisualization = () => {
    if (selectedAlgorithms.length === 0) {
      toast.error("Please select an algorithm to start searching");
      return;
    }
    if (array?.length === 0) {
      toast.error("Please generate an array to start searching");
      return;
    }
    if (speed < 1 || speed > 1000) {
      toast.error("Speed must be between 1 and 1000 ms.");
      return;
    }
    if (size < 1 || size > 1000) {
      toast.error("Array size must be between 1 and 1000");
      return;
    }
    const steps = searchingAlgorithms[selectedAlgorithms](array, target);
    setSteps(steps);
    setIsRunning(true);
    setIsPaused(false);
    setIsSearching(true);
    setFound(false);
    stepIndexRef.current = 0;
    toast.success("Search started!");
  };

  useEffect(() => {
    if (isRunning && steps.length > 0 && !isPaused) {
      const interval = setInterval(() => {
        const step = steps[stepIndexRef.current];
        setCurrentIndex(step.currentIndex);
        setFound(step.found || found);

        if (stepIndexRef.current === steps.length - 1) {
          clearInterval(interval);
          setIsRunning(false);
          setIsSearching(false);
          if (step.found) {
            setFound(true);
            toast.success(`Target ${target} found at index ${step.currentIndex}!`);
          } else {
            toast.error(`Target ${target} not found in the array.`);
          }
        } else {
          stepIndexRef.current += 1;
        }
      }, speed);

      return () => clearInterval(interval);
    }
  }, [isRunning, steps, speed, isPaused, found, target]);

  useEffect(() => {
    if (sortingRequiredAlgorithms.includes(selectedAlgorithms[0])) {
      setArray((prevArray) => [...prevArray].sort((a, b) => a - b));
    }
  }, [selectedAlgorithms, sortingRequiredAlgorithms]);

  const handleRefresh = () => {
    setArray([]);
    setSteps([]);
    setIsSearching(false);
    setIsPaused(false);
    setIsRunning(false);
    toast.success("Visualization reset!");
  };

  const getElementColor = (index) => {
    if (index === currentIndex) {
      return found ? "#10b981" : "#f59e0b";
    }
    return "#6366f1";
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            mb: 4,
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
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
                <Search size={24} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Search Algorithm Visualization
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Explore how search algorithms find elements in arrays
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
                  disabled={isSearching}
                  algorithmsType="searching"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  label="Array Size"
                  type="number"
                  value={size}
                  onChange={(e) => {
                    const newSize = Math.max(1, Math.min(1000, Number(e.target.value)));
                    setSize(newSize);
                  }}
                  helperText="1-1000 elements"
                  inputProps={{ min: 1, max: 1000 }}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  label="Target Value"
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(Number(e.target.value))}
                  helperText="Value to search"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    Animation Speed: {speed}ms
                  </Typography>
                  <Slider
                    value={speed}
                    onChange={(e, newValue) => setSpeed(newValue)}
                    min={1}
                    max={1000}
                    step={10}
                    disabled={isSearching && !isPaused}
                    sx={{ color: "#10b981" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    onClick={generateArray}
                    disabled={isSearching}
                    startIcon={<BarChart3 size={16} />}
                    sx={{
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    }}
                  >
                    Generate Array
                  </Button>
                  <Button
                    variant="contained"
                    onClick={startVisualization}
                    disabled={isSearching || array.length === 0}
                    startIcon={<Search size={16} />}
                    sx={{
                      background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                    }}
                  >
                    Start Search
                  </Button>
                  <Tooltip title={isPaused ? "Resume" : "Pause"}>
                    <IconButton
                      onClick={togglePause}
                      disabled={!isSearching}
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
            </Grid>

            {/* Progress */}
            {isSearching && (
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Zap size={20} color="#6366f1" />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Searching for {target}... Step {stepIndexRef.current + 1} of {steps.length}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={((stepIndexRef.current + 1) / steps.length) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    background: "rgba(99, 102, 241, 0.1)",
                    "& .MuiLinearProgress-bar": {
                      background: "linear-gradient(135deg, #10b981 0%, #6366f1 100%)",
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
                    <strong>{selectedAlgorithms[0]}</strong> - Watch how this search algorithm works step by step.
                  </Typography>
                </Alert>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Target size={24} color="#6366f1" />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Array Visualization
              </Typography>
              {selectedAlgorithms.length > 0 && (
                <Chip
                  label={selectedAlgorithms[0]}
                  size="small"
                  sx={{
                    background: "#10b981",
                    color: "white",
                    fontWeight: 500,
                  }}
                />
              )}
              {found && (
                <Chip
                  label="Found!"
                  size="small"
                  sx={{
                    background: "#10b981",
                    color: "white",
                    fontWeight: 500,
                  }}
                />
              )}
            </Box>
            
            <Paper
              sx={{
                p: 3,
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                borderRadius: 3,
                minHeight: 300,
                display: "flex",
                alignItems: "end",
                justifyContent: "center",
                gap: 1,
                overflow: "auto",
                flexWrap: "wrap",
              }}
            >
              {array.length > 0 ? (
                array.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.01 }}
                    className={`array-element ${
                      index === currentIndex ? (found ? "found" : "current") : ""
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${getElementColor(index)} 0%, ${getElementColor(index)}80 100%)`,
                      color: "white",
                      padding: "8px 12px",
                      margin: "2px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      textAlign: "center",
                      minWidth: "40px",
                      transition: "all 0.3s ease",
                      boxShadow: index === currentIndex ? "0 4px 16px rgba(0, 0, 0, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
                      transform: index === currentIndex ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    {value}
                  </motion.div>
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    color: "text.secondary",
                  }}
                >
                  <Search size={48} />
                  <Typography variant="h6">No array generated</Typography>
                  <Typography variant="body2">
                    Click "Generate Array" to create a new array for searching
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

export default SearchVisualizer;
