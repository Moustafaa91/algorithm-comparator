import React, {  useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Snackbar from "@mui/material/Snackbar";
import { Pause, Refresh } from "@mui/icons-material";
import { searchingAlgorithms } from "../algorithms";
import AlgorithmSelector from "../components/AlgorithmSelector";
import "./SearchVisualizer.css"; // Import CSS file for styling

const SearchVisualizer = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(0);
  const [algorithm, setAlgorithm] = useState("LinearSearch");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [speed, setSpeed] = useState(500); // Default speed: 500ms
  const [found, setFound] = useState(false);
  const [size, setSize] = useState(10); // Default array size
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const pausedRef = useRef(false);

  // Generate a random or sorted array
  const generateArray = () => {
    if (size < 1 || size > 100) {
      setOpenSnackbar(true);
      setAlertMessage("Array size must be between 1 and 100");
      return;
    }
    const newArray =
      algorithm === "BinarySearch"
        ? Array.from({ length: size }, (_, i) => i + 1) // Sorted array
        : Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setCurrentIndex(null);
    setFound(false);
    setIsSearching(false);

    if (algorithm === "BinarySearch") {
      setOpenSnackbar(true);
      setAlertMessage(
        "Binary Search requires a sorted array. A sorted array has been generated."
      );
    }
  };

  // Start Search
  const startSearch = async () => {
    if (target === null || target === 0) {
      setOpenSnackbar(true);
      setAlertMessage("Please enter a target value to start searching");
      return;
    }
    setIsSearching(true);
    setFound(false);
    setCurrentIndex(null);

    pausedRef.current = false;

    await searchingAlgorithms[algorithm](
      array,
      target,
      setCurrentIndex,
      setFound,
      speed,
      pausedRef
    );

    setIsSearching(false);
  };

  // Pause Search
  const pauseSearch = () => {
    pausedRef.current = true;
    setIsSearching(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ width: "90%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          alignItems: "left",
        }}
      >
        <AlgorithmSelector
          selectedAlgorithms={selectedAlgorithms}
          onSelect={setSelectedAlgorithms}
          isVisual={true}
          disabled={true}
          algorithmsType="searching"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
            marginTop: "-50px",
            marginBottom: "10px",
          }}
        >
          <TextField
            id="outlined-number"
            label="Array Size"
            type="number"
            value={size}
            helperText="min 1, max 100"
            onChange={(e) => {
              const newSize = Math.max(
                1,
                Math.min(100, Number(e.target.value))
              ); // Clamp to 1-100
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
            onClick={startSearch}
            disabled={isSearching || target === 0}
            sx={{ textTransform: "none", height: "50px", width: "150px" }}
          >
            Start
          </Button>
          <IconButton
            color="primary"
            onClick={pauseSearch}
            disabled={!isSearching}
          >
            <Pause />
          </IconButton>
          <IconButton color="primary" onClick={generateArray}>
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
        marginTop: "-50px",
        marginBottom: "10px",
        alignContent: "center",
        gap: "10px",
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
