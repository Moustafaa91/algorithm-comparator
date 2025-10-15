import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import MainLayout from './components/Layout/MainLayout';
import SortingAlgorithms from './pages/SortingAlgorithms';
import SortingVisualizer from './pages/SortingVisualizer';
import SearchVisualizer from './pages/SearchVisualizer';
import GraphVisualizer from './pages/GraphVisualizer';
import About from './pages/About';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <SortingAlgorithms />;
      case 1:
        return <SortingVisualizer />;
      case 2:
        return <SearchVisualizer />;
      case 3:
        return <GraphVisualizer />;
      case 4:
        return <About />;
      default:
        return <SortingAlgorithms />;
    }
  };

  return (
    <>
      <CssBaseline />
      <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderContent()}
      </MainLayout>
    </>
  );
}

export default App;
