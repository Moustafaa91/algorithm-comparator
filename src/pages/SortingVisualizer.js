import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";

const SortingVisualizer = ({ algorithm }) => {
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // Pause state
  const [speed, setSpeed] = useState(100); // Animation speed
  const [size, setSize] = useState(10); // Array size
  const [isSorting, setIsSorting] = useState(false); // Is sorting in progress

  // Generate a random array
  const generateArray = () => {
    if (speed < 0 || speed > 1000 || size < 0 || size > 100) {
      alert("Speed must be between 0 and 1000 ms. and Array size must be between 0 and 100");
      return;
    }
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setIsPaused(false);
    setIsSorting(false); // Sorting hasn't started yet
  };

  // Start sorting visualization
  const startSorting = () => {
    if (speed < 0 || speed > 1000 || size < 0 || size > 100) {
      alert("Speed must be between 0 and 1000 ms. and Array size must be between 0 and 100");
      return;
    }
    const sortingSteps = algorithm(array);
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
    <div className="sorting-visualizer">
      <div className="controls">
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
      </div>
      <div className="array-container">
        {currentArray.map((value, index) => (
          <div
            key={index}
            className={`array-bar ${comparedIndices.includes(index) ? "highlight" : ""}`}
            style={{ height: `${value}px`, width: `${800 / size}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
