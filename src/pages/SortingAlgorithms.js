import React, { useState } from "react";
import AlgorithmSelector from "../components/AlgorithmSelector";
import InputSizeSelector from "../components/InputSizeSelector";
import ArrayDisplay from "../components/ArrayDisplay";
import SortingTypes from "../components/SortingTypes";
import Chart from "../components/Chart";
import {
  generateRandomArray,
  generateSortedArray,
  generateReverseSortedArray,
} from "../utils/dataGenerator";
import { sortingAlgorithms } from "../algorithms";
import { ClipLoader } from "react-spinners";
import { Box ,Button,Checkbox,FormControlLabel,Typography,Snackbar } from "@mui/material";
import { PlayCircle, WarningAmber } from "@mui/icons-material";

function SortingAlgorithms() {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [selectedSize, setSelectedSize] = useState(10);
  const [inputType, setInputType] = useState("random");
  const [onlyOneSorting, setOnlyOneSorting] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generationTime, setGenerationTime] = useState(0);
  const [generatedArray, setGeneratedArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]); // Store the sorted array
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

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

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleRun = async () => {
    if (selectedAlgorithms.length === 0) {
      setSnackbarMessage("Please select at least one algorithm.");
      setOpenSnackbar(true);
      return;
    }

    // Clean up memory from previous run
    setResults([]);
    setGeneratedArray([]);
    setSortedArray([]);
    setGenerationTime(0);

    setLoading(true);

    setTimeout(async () => {
      try {
        const { array, generationTime } = generateInputArray(selectedSize);
        let portions = generateInputArray(selectedSize).portions;
        if (onlyOneSorting) {
          portions = [portions[portions.length - 1]];
        }
        setGeneratedArray(array);

        // Restructure data to consolidate all algorithms
        const newResults = Array.from(
          { length: portions.length },
          (_, index) => ({
            inputSize: (index + 1) * (selectedSize / 10),
          })
        );

        // Run sorting algorithms in parallel
        const sortingPromises = selectedAlgorithms.map((algorithm) =>
          new Promise((resolve) => {
            const { sortedArray, times } = sortingAlgorithms[algorithm](portions);
            resolve({ algorithm, sortedArray, times });
          })
        );

        const sortingResults = await Promise.all(sortingPromises);

        sortingResults.forEach(({ algorithm, sortedArray, times }) => {
          times.forEach((time, index) => {
            newResults[index][algorithm] = time; // Add algorithm times as separate keys
          });

          setSortedArray(sortedArray); // Save the final sorted array for the last algorithm
        });

        setResults(newResults);
        setGenerationTime(generationTime); // Store generation time separately
      } catch (error) {
        if (error instanceof RangeError && error.message.includes("Maximum call stack size exceeded")) {
          setSnackbarMessage("Maximum call stack size exceeded. Please try a smaller input size.");
          setOpenSnackbar(true);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }, 100);
  };

  return (
    <Box sx={{ width: "90%" }}>
      <Typography color="warning" variant="caption">
        <WarningAmber /> 
        The application hangs out when running over large input, probably above 500k, and mainly using algorithms with O(n^2) running time. 
        an optimization to run all algorithms on a backend service will be implemented soon.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <AlgorithmSelector
            selectedAlgorithms={selectedAlgorithms}
            onSelect={setSelectedAlgorithms}
            isVisual={false}
            disabled={false}
            algorithmsType="sorting"
          />
          <InputSizeSelector
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
          />
          <SortingTypes inputType={inputType} onSelect={setInputType} />
          <Button
            startIcon={<PlayCircle />}
            variant="contained"
            onClick={handleRun}
            disabled={loading}
            style={{ width: "200px", height: "50px" }}
          >
            {loading ? "Running..." : "Run"}
          </Button>
          <FormControlLabel
            control={<Checkbox checked={onlyOneSorting} onChange={() => setOnlyOneSorting(!onlyOneSorting)} />}
            label="Show running time over only array size"
          />
          <Snackbar
            open={openSnackbar}
            autoHideDuration={800}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
        </div>
      </Box>
      
      
      {loading ? (
        <ClipLoader size={50} color="#8884d8" />
      ) : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "black" }}>
            <Chart data={results} generationTime={generationTime} onlyOneSorting={onlyOneSorting} />
          </Box>
          <div style={{ display: "flex", gap: "20px" }}>
            <ArrayDisplay title="Generated Array" array={generatedArray} />
            <ArrayDisplay title="Sorted Array" array={sortedArray} />
          </div>
        </>
      )}
    </Box>
  );
}

export default SortingAlgorithms;