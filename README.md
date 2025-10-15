# 🚀 Algorithm Visualizer

An interactive single-page web application built with **React** that allows users to visualize, compare, and analyze the performance of popular algorithms. Whether you are exploring sorting/ searching or graph algorithms, this application offers an intuitive and engaging experience.

## Features

### **Sorting Algorithm Comparison**
- Compare popular sorting algorithms side by side.
- Analyze execution times across varying input sizes.
- Visualize the sorting process with detailed animations.

### **Sorting Algorithm Visualization**
- Select specific algorithms to visualize (e.g., Bubble Sort, Quick Sort, etc.).
- Customize array size and animation speed for a tailored experience.
- Automatically generates random input arrays for sorting.

### **Searching Algorithm Visualization**
- Select algorithms like Linear Search or Binary Search for visualization.
- Customize array size, target value, and animation speed.
- Observe how algorithms perform step-by-step to locate target values.

### **Graph Algorithm Visualization**
- Visualize graph algorithms, including:
  - **Breadth-First Search (BFS)**
  - **Depth-First Search (DFS)**
  - **Dijkstra's Algorithm**
- Use predefined graph structures for simplified exploration.
- Real-time highlighting of visited nodes and edges during traversal.

---

## How to Add an Algorithm

Expand the application by adding new algorithms with the following steps:

1. Add the algorithm file to the appropriate folder under **`algorithm/`**.
2. Import the algorithm in **`algorithms/index.js`**.
3. Integrate the new algorithm into one of the selectors:
   - **`SortingAlgorithmsSelector.js`**
   - **`SearchingAlgorithmsSelector.js`**
   - **`GraphAlgorithmsSelector.js`**

Ensure input parameters and return structures align with the existing algorithms for seamless integration.

---

## How to Add a Custom Graph

Customize graphs for visualization using **`utils/graphGenerator.js`**:

1. Define node levels using the `level` constant to specify positions (top to bottom).
2. Use the `connections` constant to establish edges. Format:
   ```javascript
   source: [connectedNode1, connectedNode2, ...]
   ```

Follow the existing structure for consistent graph generation and visualization.

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18**: Modern React with hooks and functional components
- **Material-UI v6**: Beautiful and accessible React components with custom theming
- **Framer Motion**: Smooth animations and micro-interactions
- **React Hot Toast**: Beautiful toast notifications
- **Lucide React**: Modern icon library with beautiful icons

### **Visualization**
- **Recharts**: Composable charting library for performance metrics
- **React Flow**: Interactive node-based graph visualizations
- **Custom CSS**: Tailored animations and glassmorphism effects

### **Styling**
- **CSS-in-JS**: Material-UI's styled components
- **Custom CSS**: Global styles with modern design patterns
- **Responsive Design**: Mobile-first approach with breakpoints

---

## Installation

### Prerequisites

Ensure the following are installed on your system:
- Node.js (v16 or later)
- Yarn (preferred package manager)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Moustafaa91/algorithm-comparator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd algorithm-comparator
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```
4. Start the development server:
   ```bash
   yarn start
   ```
5. Open your browser and navigate to `http://localhost:3000`.

---

## Usage

- Explore sorting, searching, and graph algorithms with intuitive visualizations.
- Use the controls to customize input size, animation speed, and algorithm selection.
- Compare execution performance or step through algorithm processes interactively.

---

## Contributing

We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch with your feature or fix.
3. Submit a pull request for review.

---

## Acknowledgments

A heartfelt thanks to:
- **[Material-UI (MUI)](https://mui.com/)** for their elegant UI components.
- **[React Flow](https://reactflow.dev/)** for simplifying graph visualization.

---

Enjoy exploring algorithms, and happy coding! 🚀
