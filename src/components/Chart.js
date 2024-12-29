import React from 'react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';

function Chart({ data, generationTime }) {
  if (!data.length) {
    return <p>No data to display. Run an algorithm to see results.</p>;
  }

  // Extract algorithm names dynamically
  const algorithms = Object.keys(data[0]).filter((key) => key !== 'inputSize');

  return (
    <>
      <p>Data Generation Time: <strong>{generationTime.toFixed(2)} ms</strong></p>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <XAxis dataKey="inputSize">
            <Label value="Input Size (Units)" offset={-40} position="insideBottom" />
          </XAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis>
            <Label
              value="Sort Time (ms)"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip formatter={(value) => `${value.toFixed(2)} ms`} />
          <Legend verticalAlign="bottom" align="center" />
          {algorithms.map((algorithm) => (
            <Line
              key={algorithm}
              type="monotone"
              dataKey={algorithm}
              stroke={
                {
                  BubbleSort: "#8884d8",
                  QuickSort: "#82ca9d",
                  MergeSort: "#ffc658",
                  SelectionSort: "#ff7300",
                  InsertionSort: "#a83279",
                  HeapSort: "#17becf",
                  CycleSort: "#bcbd22",
                }[algorithm] || "#000000" // Default color for new algorithms
              }
              name={algorithm}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default Chart;
