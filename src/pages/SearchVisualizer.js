import React, { useState, useEffect } from "react";
import { searchingAlgorithms } from '../algorithms';

const SearchVisualizer = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(null);
  const [algorithm, setAlgorithm] = useState("LinearSearch");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [speed, setSpeed] = useState(500); // Default speed: 500ms
  const [found, setFound] = useState(false);

  // Generate a random array
  const generateArray = (size = 10) => {
    const newArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(newArray);
    setCurrentIndex(null);
    setFound(false);
    setIsSearching(false);
  };

  // Start Search
  const startSearch = async () => {
    setIsSearching(true);
    setFound(false);
    setCurrentIndex(null);

    if (algorithm === "LinearSearch") {
      await searchingAlgorithms[algorithm](array, target, setCurrentIndex, setFound, speed);
    } else if (algorithm === "BinarySearch") {
      const sortedArray = [...array].sort((a, b) => a - b); // Binary Search requires sorted input
      setArray(sortedArray); // Update visualized array to sorted
      await searchingAlgorithms[algorithm](sortedArray, target, setCurrentIndex, setFound, speed);
      
    }
    else if (algorithm === "JumpSearch") {
      await searchingAlgorithms[algorithm](array, target, setCurrentIndex, setFound, speed);
      
    }

    setIsSearching(false);
  };

  // Pause Search (reset current index)
  const pauseSearch = () => {
    setIsSearching(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Search Algorithm Visualization</h2>
      <div>
        <button onClick={() => generateArray(10)}>Generate Array</button>
        <input
          type="number"
          placeholder="Target"
          value={target || ""}
          onChange={(e) => setTarget(Number(e.target.value))}
        />
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="LinearSearch">Linear Search</option>
          <option value="BinarySearch">Binary Search</option>
          <option value="JumpSearch">Jump Search</option>
        </select>
        <button onClick={startSearch} disabled={isSearching || target === null}>
          Start
        </button>
        <button onClick={pauseSearch} disabled={!isSearching}>
          Pause
        </button>
      </div>
      <div>
        <label>Speed:</label>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        {array.map((value, index) => (
          <div
            key={index}
            style={{
              width: "30px",
              height: "30px",
              margin: "5px",
              backgroundColor:
                index === currentIndex
                  ? found
                    ? "green"
                    : "yellow"
                  : "lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid black",
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchVisualizer;
