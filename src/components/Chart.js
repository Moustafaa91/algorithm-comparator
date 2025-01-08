import React from 'react';
import Typography from '@mui/material/Typography';
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
  BarChart,
  Bar,
} from 'recharts';

function Chart({ data, generationTime, onlyOneSorting }) {
  if (!data.length) {
    return (
      <Typography variant="body2"> No data to display. Run an algorithm to see results.</Typography> 
    );
  }

  // Extract algorithm names dynamically
  const algorithms = Object.keys(data[0]).filter((key) => key !== 'inputSize');

  const colors = {
    BubbleSort: "#8884d8",
    QuickSort: "#82ca9d",
    MergeSort: "#ffc658",
    SelectionSort: "#ff7300",
    InsertionSort: "#a83279",
    HeapSort: "#17becf",
    CycleSort: "#bcbd22",
    ShellSort: "#d62728",
    BucketSort: "#9467bd",
    RadixSort: "#8c564b",
  };

  return (
    <>
      <Typography variant="body2"> Data Generation Time: 
        <strong>{generationTime.toFixed(2)} ms</strong>
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        {onlyOneSorting ? (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
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
              <Bar
                key={algorithm}
                dataKey={algorithm}
                fill={colors[algorithm] || "#000000"} // Default color for new algorithms
                name={algorithm}
              />
            ))}
          </BarChart>
        ) : (
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
                stroke={colors[algorithm] || "#000000"} // Default color for new algorithms
                name={algorithm}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>
    </>
  );
}

export default Chart;