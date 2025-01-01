import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ShowChart, Info, InsertChart, Troubleshoot } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import SortingAlgorithms from "./SortingAlgorithms";
import SortingVisualizer from "./SortingVisualizer";
import SearchVisualizer from "./SearchVisualizer";
import About from "./About";


function HomePage() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function tabProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          
        >
          <Tab
            icon={<ShowChart />}
            iconPosition="top"
            label="Sorting Algorithms Comparison"
            sx={{textTransform :"none"}}
            {...tabProps(0)}
          />
          <Tab
            icon={<InsertChart />}
            iconPosition="top"
            label="Sorting Algorithms Visualizing"
            sx={{textTransform :"none"}}
            {...tabProps(1)}
          />
          <Tab
            icon={<Troubleshoot />}
            iconPosition="top"
            label="Search Algorithms Visualizing"
            sx={{textTransform :"none"}}
            {...tabProps(2)}
          />
          <Tab
            icon={<Info />}
            iconPosition="top"
            label="About"
            sx={{textTransform :"none"}}
            {...tabProps(3)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Paper sx={{ width: "90%", margin: "auto", marginTop: "20px" }}>
          <SortingAlgorithms />
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Paper sx={{ width: "90%", margin: "auto", marginTop: "20px" }}>
        <SortingVisualizer />
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <Paper sx={{ width: "90%", margin: "auto", marginTop: "20px" }}>
        <SearchVisualizer />
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <About />
      </CustomTabPanel>
    </Box>
  );
}

export default HomePage;
