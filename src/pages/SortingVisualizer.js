import React, { useState, useEffect } from "react";
import AlgorithmSelector from '../components/AlgorithmSelector';
import { algorithmsVisual } from '../algorithms';
import "./SortingVisualizer.css";
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { PlayArrow,  Pause, Refresh } from "@mui/icons-material";

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
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '30px', alignItems: 'center', borderBottom: 1, borderColor: 'black' }}>
      
      <AlgorithmSelector selectedAlgorithms={selectedAlgorithms} onSelect={setSelectedAlgorithms} isVisual={true} />
      <TextField
          id="outlined-number"
          label="Array Size"
          type="number"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          disabled={array.length !== 0}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          id="outlined-number"
          label="Speed (ms)"
          type="number"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <Button  onClick={generateArray} disabled={array.length !== 0} style={{ height: '50px', width: '250px'  }}>
          Generate Array
        </Button>

        <Button  onClick={startSorting} disabled={array.length === 0 || isSorting} style={{ height: '50px', width: '250px' }}>
        Start Sorting
        </Button>
        
        <IconButton color="primary" onClick={togglePause} disabled={!isSorting || currentStep >= steps.length}>
          {isPaused ? <PlayArrow /> : <Pause />}
        </IconButton>
      <IconButton color="primary" onClick={() => { setArray([]); setSteps([]); setIsSorting(false); setIsPaused(false); }}>
        <Refresh />
      </IconButton >

      <Snackbar
                    open={openSnackbar}
                    autoHideDuration={1000}
                    onClose={handleCloseSnackbar}
                    message={alertMessage}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />

      </Box>
      <div className="array-container">
        {currentArray.map((value, index) => (
          <div
            key={index}
            className={`array-bar ${comparedIndices.includes(index) ? "highlight" : ""}`}
            style={{ height: `${value}px`, width: `${1000 / size}px` }}
          ></div>
        ))}
      </div>
      </Box>
    
  );
};

export default SortingVisualizer;
