import React from 'react';

function AlgorithmSelector({ selectedAlgorithms, onSelect }) {
  const algorithms = ['BubbleSort', 'QuickSort', 'MergeSort', 'SelectionSort', 'InsertionSort', 'HeapSort', 'CycleSort'];

  const handleChange = (e) => {
    const { value, checked } = e.target;
    onSelect((prev) =>
      checked ? [...prev, value] : prev.filter((algorithm) => algorithm !== value)
    );
  };

  return (
    <div>
      <h3>Select Algorithms</h3>
      {algorithms.map((algo) => (
        <label key={algo}>
          <input
            type="checkbox"
            value={algo}
            checked={selectedAlgorithms.includes(algo)}
            onChange={handleChange}
          />
          {algo}
        </label>
      ))}
    </div>
  );
}

export default AlgorithmSelector;
