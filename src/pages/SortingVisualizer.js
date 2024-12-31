import React, { useState, useEffect } from "react";
import AlgorithmSelector from '../components/AlgorithmSelector';
import { algorithmsVisual } from '../algorithms/SortingForComparison';
import "./SortingVisualizer.css";
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

const SortingVisualizer = () => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // Pause state
  const [speed, setSpeed] = useState(100); // Animation speed
  const [size, setSize] = useState(10); // Array size
  const [isSorting, setIsSorting] = useState(false); // Is sorting in progress
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState();
  // Generate a random array
  const generateArray = () => {
    if (speed < 0 || speed > 1000) {
      setOpenSnackbar(true);
      setAlertMessage("Speed must be between 0 and 1000 ms.");
      return;
    }
    if (size < 0 || size > 100) {
      setOpenSnackbar(true);
      setAlertMessage("Array size must be between 0 and 100");
      return;
    }
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setIsPaused(false);
    setIsSorting(false); // Sorting hasn't started yet
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  // Start sorting visualization
  const startSorting = () => {
    if (selectedAlgorithms.length === 0) {
      setOpenSnackbar(true);
      setAlertMessage("Please select an algorithm to start sorting");
      return;
    }
    if (speed < 0 || speed > 1000) {
      setOpenSnackbar(true);
      setAlertMessage("Speed must be between 0 and 1000 ms.");
      return;
    }
    if (size < 0 || size > 100) {
      setOpenSnackbar(true);
      setAlertMessage("Array size must be between 0 and 100");
      return;
    }
    const sortingSteps = algorithmsVisual[selectedAlgorithms[0]](array);
    setSteps(sortingSteps);
    setCurrentStep(0);
    setIsPaused(false);
    setIsSorting(true); // Sorting in progress
  };

  // Animate sorting steps
  useEffect(() => {
    if (!isPaused && isSorting && currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }

    // If sorting finishes, reset isSorting to false
    if (currentStep >= steps.length && steps.length > 0) {
      setArray(steps[steps.length - 1].array); // Set the final sorted state
      setIsSorting(false);
  }
  }, [currentStep, steps, speed, isPaused, isSorting]);

  // Pause/Resume functionality
  const togglePause = () => setIsPaused((prev) => !prev);

  const currentArray = steps[currentStep]?.array || array;
  const comparedIndices = steps[currentStep]?.compared || [];

  return (
    
    <Box sx={{ width: '90%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'black' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', alignItems: 'center' }}>
      <AlgorithmSelector selectedAlgorithms={selectedAlgorithms} onSelect={setSelectedAlgorithms} isVisual={true} />
        <label>
          Array Size:
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </label>
        <label>
          Speed (ms):
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </label>
        <button onClick={generateArray} disabled={array.length !== 0}>Generate Array</button>
        <button onClick={startSorting} disabled={array.length === 0 || isSorting}>
          Start Sorting
        </button>
        <button onClick={togglePause} disabled={!isSorting || currentStep >= steps.length}>
          {isPaused ? "Resume" : "Pause"}
        </button>
      <button onClick={() => { setArray([]); setSteps([]); setIsSorting(false); setIsPaused(false); }}>
        Refresh
      </button>
      <Snackbar
                    open={openSnackbar}
                    autoHideDuration={1000}
                    onClose={handleCloseSnackbar}
                    message={alertMessage}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
      </div>
      </Box>
      <div className="array-container">
        {currentArray.map((value, index) => (
          <div
            key={index}
            className={`array-bar ${comparedIndices.includes(index) ? "highlight" : ""}`}
            style={{ height: `${value}px`, width: `${800 / size}px` }}
          ></div>
        ))}
      </div>
      </Box>
    
  );
};

export default SortingVisualizer;
