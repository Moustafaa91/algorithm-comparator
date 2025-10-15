import React, { useState, useEffect } from "react";
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
  Play,
  Pause,
  RotateCcw,
  BarChart3,
  Zap,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";
import AlgorithmSelector from "../components/selectors/AlgorithmSelector";
import { sortingAlgorithmsVisual } from "../algorithms";
import "./SortingVisualizer.css";
import toast from "react-hot-toast";

const SortingVisualizer = () => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [size, setSize] = useState(10);
  const [isSorting, setIsSorting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const generateArray = () => {
    if (speed < 1 || speed > 1000) {
      toast.error("Speed must be between 1 and 1000 ms.");
      return;
    }
    if (size < 1 || size > 200) {
      toast.error("Array size must be between 1 and 200");
      return;
    }
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 200) + 1);
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setIsPaused(false);
    setIsSorting(false);
    toast.success("New array generated!");
  };

  const startSorting = () => {
    if (selectedAlgorithms.length === 0) {
      toast.error("Please select an algorithm to start sorting");
      return;
    }
    if (speed < 1 || speed > 1000) {
      toast.error("Speed must be between 1 and 1000 ms.");
      return;
    }
    if (size < 1 || size > 200) {
      toast.error("Array size must be between 1 and 200");
      return;
    }
    const sortingSteps = sortingAlgorithmsVisual[selectedAlgorithms[0]](array);
    setSteps(sortingSteps);
    setCurrentStep(0);
    setIsPaused(false);
    setIsSorting(true);
    setIsDisabled(true);
    toast.success("Sorting started!");
  };

  useEffect(() => {
    if (!isPaused && isSorting && currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }

    if (currentStep >= steps.length && steps.length > 0) {
      setArray(steps[steps.length - 1].array);
      setSteps([]);
      setIsSorting(false);
      setIsPaused(false);
      setIsDisabled(false);
      toast.success("Sorting completed!");
    }
  }, [currentStep, steps, speed, isPaused, isSorting]);

  const togglePause = () => setIsPaused((prev) => !prev);

  const handleRefresh = () => {
    setArray([]);
    setSteps([]);
    setIsSorting(false);
    setIsPaused(false);
    setIsDisabled(false);
    toast.success("Visualization reset!");
  };

  const currentArray = steps[currentStep]?.array || array;
  const comparedIndices = steps[currentStep]?.compared || [];

  const getAlgorithmColor = (algorithm) => {
    const colors = {
      "Bubble Sort": "#ef4444",
      "Selection Sort": "#f97316",
      "Insertion Sort": "#eab308",
      "Merge Sort": "#22c55e",
      "Quick Sort": "#3b82f6",
      "Heap Sort": "#8b5cf6",
      "Radix Sort": "#ec4899",
      "Bucket Sort": "#06b6d4",
      "Shell Sort": "#84cc16",
      "Cycle Sort": "#f59e0b",
    };
    return colors[algorithm] || "#6366f1";
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
            background: "linear-gradient(135deg, #ec4899 0%, #6366f1 100%)",
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
                <Play size={24} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Sorting Algorithm Visualization
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Watch algorithms sort arrays step by step
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
                  disabled={isDisabled}
                  algorithmsType="sorting"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  label="Array Size"
                  type="number"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  disabled={array.length !== 0}
                  helperText="1-200 elements"
                  inputProps={{ min: 1, max: 200 }}
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
                    disabled={isSorting && !isPaused}
                    sx={{ color: getAlgorithmColor(selectedAlgorithms[0]) }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    onClick={generateArray}
                    disabled={isSorting && array.length !== 0}
                    startIcon={<BarChart3 size={16} />}
                    sx={{
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    }}
                  >
                    Generate Array
                  </Button>
                  <Button
                    variant="contained"
                    onClick={startSorting}
                    disabled={array.length === 0 || isSorting}
                    startIcon={<Play size={16} />}
                    sx={{
                      background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                    }}
                  >
                    Start Sorting
                  </Button>
                  <Tooltip title={isPaused ? "Resume" : "Pause"}>
                    <IconButton
                      onClick={togglePause}
                      disabled={!isSorting || currentStep >= steps.length}
                      sx={{
                        background: isPaused ? "#10b981" : "#f59e0b",
                        color: "white",
                        borderRadius: 1,
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
                        borderRadius: 1,
                      }}
                    >
                      <RotateCcw size={16} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>

            {/* Progress */}
            {isSorting && (
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Zap size={20} color="#6366f1" />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Sorting in progress... Step {currentStep + 1} of {steps.length}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={((currentStep + 1) / steps.length) * 100}
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
                    <strong>{selectedAlgorithms[0]}</strong> - Watch how this algorithm works step by step.
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
              <BarChart3 size={24} color="#6366f1" />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Array Visualization
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
                p: 3,
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                borderRadius: 3,
                minHeight: 300,
                display: "flex",
                alignItems: "end",
                justifyContent: "center",
                gap: 1,
                overflow: "auto",
              }}
            >
              {currentArray.length > 0 ? (
                currentArray.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.01 }}
                    className={`array-bar ${comparedIndices.includes(index) ? "highlight" : ""}`}
                    style={{
                      height: `${Math.max(value * 1.5, 20)}px`,
                      width: `${Math.max(1000 / size, 4)}px`,
                      background: comparedIndices.includes(index)
                        ? getAlgorithmColor(selectedAlgorithms[0])
                        : `linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)`,
                      borderRadius: "4px 4px 0 0",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "10px",
                      fontWeight: "bold",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {size <= 50 && (
                      <span style={{ transform: "rotate(-90deg)", whiteSpace: "nowrap" }}>
                        {value}
                      </span>
                    )}
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
                  <BarChart3 size={48} />
                  <Typography variant="h6">No array generated</Typography>
                  <Typography variant="body2">
                    Click "Generate Array" to create a new array for visualization
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

export default SortingVisualizer;
