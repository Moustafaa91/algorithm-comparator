import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Sort, Info, FindReplace } from "@mui/icons-material";
import dayjs from "dayjs";
import Paper from "@mui/material/Paper";
import SortingAlgorithms from "./SortingAlgorithms";
import SearchingAlgorithms from "./SearchingAlgorithms";
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
        >
          <Tab
            icon={<Sort />}
            iconPosition="start"
            label="Sorting Algorithms"
            {...tabProps(0)}
          />
          <Tab
            icon={<FindReplace />}
            iconPosition="start"
            label="Searching Algorithms"
            {...tabProps(1)}
          />
          <Tab
            icon={<Info />}
            iconPosition="start"
            label="About"
            {...tabProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Paper sx={{ width: "90%", margin: "auto", marginTop: "20px" }}>
          <SortingAlgorithms />
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SearchingAlgorithms />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <About />
      </CustomTabPanel>
    </Box>
  );
}

export default HomePage;
