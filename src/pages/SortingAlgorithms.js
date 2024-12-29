import React, { useState } from 'react';
import AlgorithmSelector from '../components/AlgorithmSelector';
import InputSizeSelector from '../components/InputSizeSelector';
import ArrayDisplay from '../components/ArrayDisplay';
import SortingTypes from '../components/SortingTypes';
import Chart from '../components/Chart';
import {
  generateRandomArray,
  generateSortedArray,
  generateReverseSortedArray,
} from '../utils/dataGenerator';
import { algorithms } from '../algorithms';
import { ClipLoader } from 'react-spinners';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { PlayCircle } from "@mui/icons-material";

function SortingAlgorithms() {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [selectedSize, setSelectedSize] = useState(10);
  const [inputType, setInputType] = useState('random'); 
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generationTime, setGenerationTime] = useState(0);
  const [generatedArray, setGeneratedArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]); // Store the sorted array

  const generateInputArray = () => {
    switch (inputType) {
      case 'sorted':
        return generateSortedArray(selectedSize);
      case 'reverse-sorted':
        return generateReverseSortedArray(selectedSize);
      default:
        return generateRandomArray(selectedSize);
    }
  };

  const handleRun = () => {
    if (selectedAlgorithms.length === 0) {
      alert('Please select at least one algorithm.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const { array, portions, generationTime } = generateInputArray(selectedSize);
      setGeneratedArray(array);

      // Restructure data to consolidate all algorithms
      const newResults = Array.from({ length: portions.length }, (_, index) => ({
        inputSize: (index + 1) * (selectedSize / 10),
      }));

      selectedAlgorithms.forEach((algorithm) => {
        const { sortedArray, times } = algorithms[algorithm](portions);

        times.forEach((time, index) => {
          newResults[index][algorithm] = time; // Add algorithm times as separate keys
        });

        setSortedArray(sortedArray); // Save the final sorted array for the last algorithm
      });

      setResults(newResults);
      setGenerationTime(generationTime); // Store generation time separately
      setLoading(false);
    }, 100);
  };

return (
    <Box sx={{ width: '90%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'black' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', alignItems: 'center' }}>
            <AlgorithmSelector selectedAlgorithms={selectedAlgorithms} onSelect={setSelectedAlgorithms} />
            <InputSizeSelector selectedSize={selectedSize} onSelect={setSelectedSize} />
            <SortingTypes inputType={inputType} onSelect={setInputType} />
            
            <Button startIcon={<PlayCircle />} variant="contained" onClick={handleRun} disabled={loading} style={{ height: '50px' }}>
                    {loading ? 'Running...' : 'Run'}
            </Button >
            </div>
            </Box>
       
        {loading ? (
            <ClipLoader size={50} color="#8884d8" />
        ) : (
            <>
                <Chart data={results} generationTime={generationTime} />
                <div style={{ display: 'flex', gap: '20px' }}>
                    <ArrayDisplay title="Generated Array" array={generatedArray} />
                    <ArrayDisplay title="Sorted Array" array={sortedArray} />
                </div>
            </>
        )}
    
    </Box>
);
}

export default SortingAlgorithms;
