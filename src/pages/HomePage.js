import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDemoRouter } from '@toolpad/core/internal';
import {
  PageContainer,
  PageHeader,
  PageHeaderToolbar,
} from '@toolpad/core/PageContainer';
import { AppProvider } from '@toolpad/core/AppProvider';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Sort,Info,FindReplace } from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SortingAlgorithms from './SortingAlgorithms';

function HomePage() {

  const NAVIGATION = [
    { segment: '', title: 'Home' },
    { segment: 'orders', title: 'Orders' },
  ];
  const router = useDemoRouter();
  const theme = useTheme();
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
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab icon={<Sort />} iconPosition="start" label="Sorting Algorithms" {...a11yProps(0)} />
          <Tab icon={<FindReplace />} iconPosition="start" label="Searching Algorithms" {...a11yProps(1)} />
          <Tab icon={<Info />} iconPosition="start" label="About" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <Paper sx={{ width: '90%', margin: 'auto', marginTop: '20px' }}>
            <SortingAlgorithms />
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
        
        </Box>
    
  );
}

export default HomePage;
