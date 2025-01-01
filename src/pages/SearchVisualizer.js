import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Snackbar from '@mui/material/Snackbar';
import { PlayArrow, Pause, Refresh } from "@mui/icons-material";
import { searchingAlgorithms } from "../algorithms";
import AlgorithmSelector from '../components/AlgorithmSelector';

const SearchVisualizer = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(null);
  const [algorithm, setAlgorithm] = useState("LinearSearch");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [speed, setSpeed] = useState(500); // Default speed: 500ms
  const [found, setFound] = useState(false);
  const [size, setSize] = useState(10); // Default array size
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);

  // Generate a random or sorted array
  const generateArray = () => {
    if (size < 1 || size > 100) {
      setOpenSnackbar(true);
      setAlertMessage("Array size must be between 1 and 100");
      return;
    }
    const newArray = algorithm === "BinarySearch"
      ? Array.from({ length: size }, (_, i) => i + 1) // Sorted array
      : Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setCurrentIndex(null);
    setFound(false);
    setIsSearching(false);

    if (algorithm === "BinarySearch") {
      setOpenSnackbar(true);
      setAlertMessage("Binary Search requires a sorted array. A sorted array has been generated.");
    }
  };

  // Start Search
  const startSearch = async () => {
    if (target === null) {
      setOpenSnackbar(true);
      setAlertMessage("Please enter a target value to start searching");
      return;
    }
    setIsSearching(true);
    setFound(false);
    setCurrentIndex(null);

    await searchingAlgorithms[algorithm](array, target, setCurrentIndex, setFound, speed);

    setIsSearching(false);
  };

  // Pause Search (reset current index)
  const pauseSearch = () => {
    setIsSearching(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ width: '90%', margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Search Algorithm Visualization
      </Typography>
      <AlgorithmSelector selectedAlgorithms={selectedAlgorithms} onSelect={setSelectedAlgorithms} isVisual={true} disabled={true}  />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
          <TextField
            id="outlined-number"
            label="Array Size (1-100)"
            type="number"
            value={size}
            onChange={(e) => {
              const newSize = Math.max(1, Math.min(100, Number(e.target.value))); // Clamp to 1-100
              setSize(newSize);
            }}
            inputProps={{
              min: 1,
              max: 100,
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <Button onClick={generateArray} disabled={isSearching} sx={{ textTransform: 'none', height: '50px', width: '150px' }}>
            Generate Array
          </Button>
          <TextField
            id="target-value"
            label="Target Value"
            type="number"
            placeholder="Enter target"
            value={target || ""}
            onChange={(e) => setTarget(Number(e.target.value))}
            sx={{ width: '150px' }}
          />
          <TextField
            select
            label="Algorithm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            SelectProps={{
              native: true,
            }}
            sx={{ width: '150px' }}
          >
            <option value="LinearSearch">Linear Search</option>
            <option value="BinarySearch">Binary Search</option>
            <option value="JumpSearch">Jump Search</option>
          </TextField>
          <Button onClick={startSearch} disabled={isSearching || target === null} sx={{ textTransform: 'none', height: '50px', width: '150px' }}>
            Start
          </Button>
          <IconButton color="primary" onClick={pauseSearch} disabled={!isSearching}>
            <Pause />
          </IconButton>
          <IconButton color="primary" onClick={generateArray}>
            <Refresh />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
          <Typography variant="caption" id="input-slider" gutterBottom>
            Speed (ms)
          </Typography>
          <Slider
            value={speed}
            onChange={(e, newValue) => setSpeed(newValue)}
            min={100}
            max={2000}
            step={100}
            valueLabelDisplay="auto"
            sx={{ width: '200px' }}
          />
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={alertMessage}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {array.map((value, index) => (
          <Box
            key={index}
            sx={{
              width: '30px',
              height: '30px',
              margin: '5px',
              backgroundColor: index === currentIndex ? (found ? 'green' : 'yellow') : 'lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid black',
            }}
          >
            {value}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SearchVisualizer;