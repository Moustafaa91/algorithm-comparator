import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box } from "@mui/material";
import { ShowChart, Info, InsertChart, Troubleshoot, AccountTree } from "@mui/icons-material";
import SortingAlgorithms from "./SortingAlgorithms";
import SortingVisualizer from "./SortingVisualizer";
import SearchVisualizer from "./SearchVisualizer";
import GraphVisualizer from "./GraphVisualizer";
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
            sx={{ textTransform: "none" }}
            {...tabProps(0)}
          />
          <Tab
            icon={<InsertChart />}
            iconPosition="top"
            label="Sorting Algorithms Visualization"
            sx={{ textTransform: "none" }}
            {...tabProps(1)}
          />
          <Tab
            icon={<Troubleshoot />}
            iconPosition="top"
            label="Search Algorithms Visualization"
            sx={{ textTransform: "none" }}
            {...tabProps(2)}
          />
          <Tab
            icon={<AccountTree />}
            iconPosition="top"
            label="Graphs Visualization"
            sx={{ textTransform: "none" }}
            {...tabProps(3)}
          />
          <Tab
            icon={<Info />}
            iconPosition="top"
            label="About"
            sx={{ textTransform: "none" }}
            {...tabProps(4)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{ bgcolor: "white", width: "100%", margin: "auto", marginTop: "20px", boxShadow: 6, }} >
          <SortingAlgorithms />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box sx={{ bgcolor: "white", width: "100%", margin: "auto", marginTop: "20px", boxShadow: 6 }}>
          <SortingVisualizer />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box sx={{ bgcolor: "white", width: "100%", margin: "auto", marginTop: "20px", boxShadow: 6, paddingBottom: "20px" }} >
          <SearchVisualizer />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      <Box sx={{ bgcolor: "white", width: "1600px", height:"1300px", margin: "auto", marginTop: "20px", boxShadow: 6, paddingBottom: "20px" }} >
        <GraphVisualizer />
      </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <About />
      </CustomTabPanel>
    </Box>
  );
}

export default HomePage;
