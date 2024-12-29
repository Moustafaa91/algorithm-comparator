import React from 'react';

function InputSizeSelector({ selectedSize, onSelect }) {
  const sizes = [
    { value: 10, label: '10' },
    { value: 1000, label: '1k' },
    { value: 10000, label: '10k' },
    { value: 50000, label: '50k' },
    { value: 100000, label: '100k' },
    { value: 500000, label: '500k' },
    { value: 1000000, label: '1m' },
    { value: 5000000, label: '5m' },
    { value: 10000000, label: '10m' },
    { value: 20000000, label: '20m' },
  ];

  return (
    <div>
      <p><strong>Select Input Size</strong></p>
      <select
        id="input-size"
        value={selectedSize}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        {sizes.map((size) => (
          <option key={size.value} value={size.value}>
            {size.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default InputSizeSelector;
