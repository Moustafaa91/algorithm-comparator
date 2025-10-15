import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Chip,
  Grid,
  Paper,
  LinearProgress,
  Alert,
} from "@mui/material";
import {
  Play,
  TrendingUp,
  Clock,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import AlgorithmSelector from "../components/selectors/AlgorithmSelector";
import InputSizeSelector from "../components/selectors/InputSizeSelector";
import ArrayDisplay from "../components/ArrayDisplay";
import SortingTypes from "../components/selectors/SortingTypes";
import Chart from "../components/Chart";
import {
  generateRandomArray,
  generateSortedArray,
  generateReverseSortedArray,
} from "../utils/dataGenerator";
import { sortingAlgorithms } from "../algorithms";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

// Helper function to get algorithm display name
const getAlgorithmDisplayName = (key) => {
  const algorithmNames = {
    "BubbleSort": "Bubble Sort",
    "QuickSort": "Quick Sort", 
    "MergeSort": "Merge Sort",
    "SelectionSort": "Selection Sort",
    "InsertionSort": "Insertion Sort",
    "HeapSort": "Heap Sort",
    "CycleSort": "Cycle Sort",
    "ShellSort": "Shell Sort",
    "RadixSort": "Radix Sort",
    "BucketSort": "Bucket Sort"
  };
  return algorithmNames[key] || key;
};

const SortingAlgorithms = () => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [selectedSize, setSelectedSize] = useState(10);
  const [inputType, setInputType] = useState("random");
  const [onlyOneSorting, setOnlyOneSorting] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generationTime, setGenerationTime] = useState(0);
  const [generatedArray, setGeneratedArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);

  // Handle algorithm selection
  const handleAlgorithmSelection = (algorithms) => {
    setSelectedAlgorithms(algorithms);
  };

  const generateInputArray = () => {
    switch (inputType) {
      case "sorted":
        return generateSortedArray(selectedSize);
      case "reverse-sorted":
        return generateReverseSortedArray(selectedSize);
      default:
        return generateRandomArray(selectedSize);
    }
  };

  const handleRun = async () => {
    if (selectedAlgorithms.length === 0) {
      toast.error("Please select at least one algorithm.");
      return;
    }

    setResults([]);
    setGeneratedArray([]);
    setSortedArray([]);
    setGenerationTime(0);

    setLoading(true);
    toast.loading("Running algorithms...", { id: "running" });

    setTimeout(async () => {
      try {
        const inputData = generateInputArray();
        const { array, generationTime, portions } = inputData;
        
        let finalPortions = portions;
        if (onlyOneSorting) {
          finalPortions = [portions[portions.length - 1]];
        }
        setGeneratedArray(array);

        const newResults = Array.from(
          { length: finalPortions.length },
          (_, index) => ({
            inputSize: (index + 1) * (selectedSize / 10),
          })
        );

        const sortingPromises = selectedAlgorithms.map((algorithm) =>
          new Promise((resolve) => {
            const { sortedArray, times } = sortingAlgorithms[algorithm](finalPortions);
            resolve({ algorithm, sortedArray, times });
          })
        );

        const sortingResults = await Promise.all(sortingPromises);

        sortingResults.forEach(({ algorithm, sortedArray, times }) => {
          times.forEach((time, index) => {
            newResults[index][algorithm] = time;
          });
          setSortedArray(sortedArray);
        });

        setResults(newResults);
        setGenerationTime(generationTime);
        toast.success("Algorithms completed successfully!", { id: "running" });
      } catch (error) {
        if (error instanceof RangeError && error.message.includes("Maximum call stack size exceeded")) {
          toast.error("Maximum call stack size exceeded. Please try a smaller input size.");
        } else {
          console.error(error);
          toast.error("An error occurred while running algorithms.");
        }
        toast.dismiss("running");
      } finally {
        setLoading(false);
      }
    }, 100);
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
            background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
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
                <BarChart3 size={24} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Sorting Algorithm Comparison
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Compare the performance of different sorting algorithms
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
                  onSelect={handleAlgorithmSelection}
                  isVisual={false}
                  disabled={loading}
                  algorithmsType="sorting"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <InputSizeSelector
                  selectedSize={selectedSize}
                  onSelect={setSelectedSize}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <SortingTypes inputType={inputType} onSelect={setInputType} />
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleRun}
                    disabled={loading}
                    startIcon={loading ? <ClipLoader size={16} color="white" /> : <Play />}
                    sx={{
                      background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    {loading ? "Running..." : "Run Comparison"}
                  </Button>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={onlyOneSorting}
                        onChange={() => setOnlyOneSorting(!onlyOneSorting)}
                        color="primary"
                      />
                    }
                    label="Single array size"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {selectedAlgorithms.map((algo, index) => (
                    <Chip
                      key={`${algo}-${index}`}
                      label={getAlgorithmDisplayName(algo)}
                      size="small"
                      color="primary"
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      {/* Warning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Alert severity="warning" sx={{ mb: 4, borderRadius: 2 }}>
          <Typography variant="body2">
            <strong>Performance Notice:</strong> The application may hang with large inputs (above 500k) 
            when using O(n²) algorithms. Backend optimization coming soon!
          </Typography>
        </Alert>
      </motion.div>

      {/* Results */}
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent sx={{ textAlign: "center", py: 8 }}>
              <Box sx={{ mb: 3 }}>
                <ClipLoader size={50} color="#6366f1" />
              </Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Running Algorithms...
              </Typography>
              <LinearProgress sx={{ maxWidth: 400, mx: "auto" }} />
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <TrendingUp size={24} color="#6366f1" />
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      Performance Comparison
                    </Typography>
                    <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
                      <Chip
                        icon={<Clock size={16} />}
                        label={`${generationTime.toFixed(2)}ms`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                  <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
                    <Chart
                      data={results}
                      generationTime={generationTime}
                      onlyOneSorting={onlyOneSorting}
                    />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {(generatedArray.length > 0 || sortedArray.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ArrayDisplay title="Generated Array" array={generatedArray} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ArrayDisplay title="Sorted Array" array={sortedArray} />
                </Grid>
              </Grid>
            </motion.div>
          )}
        </>
      )}
    </Box>
  );
};

export default SortingAlgorithms;
