import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Snackbar from "@mui/material/Snackbar";
import { PlayArrow, Pause, Refresh } from "@mui/icons-material";
import { searchingAlgorithms } from "../algorithms";
import AlgorithmSelector from "../components/AlgorithmSelector";
import "./SearchVisualizer.css"; // Import CSS file for styling

const SearchVisualizer = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [speed, setSpeed] = useState(500); // Default speed: 500ms
  const [found, setFound] = useState(false);
  const [size, setSize] = useState(10); // Default array size
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [isPaused, setIsPaused] = useState(false); // Pause state
  const stepIndexRef = useRef(0);
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState([]);

  const sortingRequiredAlgorithms = ["BinarySearch", "JumpSearch", 'ExponentialSearch', 'TernarySearch'];

  // Generate a random or sorted array
  const generateArray = () => {
    const newArray = sortingRequiredAlgorithms.includes(selectedAlgorithms[0])
      ? Array.from({ length: size }, (_, i) => i + 1) // Sorted array
      : Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
    setArray(newArray);
    setCurrentIndex(null);
    setFound(false);
    setSteps([]);
  };

  // Pause/Resume functionality
  const togglePause = () => setIsPaused((prev) => !prev);

  const startVisualization = () => {
    if (selectedAlgorithms.length === 0) {
      setOpenSnackbar(true);
      setAlertMessage("Please select an algorithm to start sorting");
      return;
    }
    if (array?.length === 0) {
      setOpenSnackbar(true);
      setAlertMessage("Please generate an array to start sorting");
      return;
    }
    const steps = searchingAlgorithms[selectedAlgorithms](array, target);
    setSteps(steps);
    setIsRunning(true);
    setIsPaused(false);
    setIsSearching(true);
    setFound(false);
    stepIndexRef.current = 0;
  };

  useEffect(() => {
    if (isRunning && steps.length > 0 && !isPaused) {
      const interval = setInterval(() => {
        const step = steps[stepIndexRef.current];
        setCurrentIndex(step.currentIndex);
        setFound(step.found || found); // Maintain found state
  
        if (stepIndexRef.current === steps.length - 1) {
          clearInterval(interval);
          setIsRunning(false);
          setIsSearching(false);
          if (step.found) {
            setFound(true); // Ensure highlight remains if found
          }
        } else {
          stepIndexRef.current += 1;
        }
      }, speed);
  
      return () => clearInterval(interval);
    }
  }, [isRunning, steps, speed, isPaused, found]);
  

  // Effect to sort the array if selectedAlgorithm requires sorting
  useEffect(() => {
    if (sortingRequiredAlgorithms.includes(selectedAlgorithms[0])) {
      setArray((prevArray) => [...prevArray].sort((a, b) => a - b));
    }
  }, [selectedAlgorithms, sortingRequiredAlgorithms]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleRefresh = () => {
    setArray([]);
    setSteps([]);
    setIsSearching(false);
    setIsPaused(false);
    setIsRunning(false); // Enable radio buttons
  };

  return (
    <Box sx={{ width: "90%",  }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
        }}
      >
        <AlgorithmSelector
          selectedAlgorithms={selectedAlgorithms}
          onSelect={setSelectedAlgorithms}
          isVisual={true}
          disabled={isSearching}
          algorithmsType="searching"
        />
        {sortingRequiredAlgorithms.includes(selectedAlgorithms[0]) && (
          <Typography color="warning"  variant="caption" gutterBottom>
            This algorithm requires a sorted array
          </Typography>
        )}
        
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
            marginTop: "40px",
            marginBottom: "40px",
          }}
        >
          <TextField
            id="outlined-number"
            label="Array Size"
            type="number"
            value={size}
            helperText="min 1, max 1000"
            onChange={(e) => {
              const newSize = Math.max(
                1,
                Math.min(1000, Number(e.target.value))
              );
              setSize(newSize);
            }}
            inputProps={{
              min: 1,
              max: 1000,
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <TextField
            id="outlined-number"
            label="Target Value"
            type="number"
            value={target}
            helperText="Value to search"
            onChange={(e) => setTarget(Number(e.target.value))}
            sx={{ width: "150px" }}
          />

          <Typography variant="caption" id="input-slider" gutterBottom>
            Speed (ms)
          </Typography>
          <Slider
            value={speed}
            onChange={(e, newValue) => setSpeed(newValue)}
            min={1}
            max={1000}
            valueLabelDisplay="auto"
            sx={{ width: "200px" }}
          />
          <Button
            onClick={generateArray}
            disabled={isSearching}
            sx={{ textTransform: "none", height: "50px", width: "150px" }}
          >
            Generate Array
          </Button>
          <Button
            onClick={startVisualization}
            disabled={isSearching || array.length === 0}
            sx={{ textTransform: "none", height: "50px", width: "150px" }}
          >
            Start
          </Button>
          <IconButton color="primary" onClick={togglePause} disabled={!isSearching}>
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

      <Box 
      sx={{
        display: "flex",
        flexDirection: "row",      
        marginTop: array.length < 100 ? "0%" : array.length < 500 ? "2%" : array.length < 700 ? '8%' : array.length < 900 ? '12%' : "15%",
        marginBottom: array.length < 100 ? "0%" : array.length < 500 ? "4%" : array.length < 800 ? "12%" : "16%",
        marginRight: "-130px",
        alignContent: "center",
        gap: "5px",
        flexWrap: "wrap",
        
      }}
      className="array-container">
        {array.map((value, index) => (
          <Box
            key={index}
            className={`array-element ${
              index === currentIndex ? (found ? "found" : "current") : ""
            }`}
          >
            {value}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SearchVisualizer;