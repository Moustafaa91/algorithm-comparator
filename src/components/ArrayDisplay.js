import React, { useState } from 'react';
import { NavigateNext, NavigateBefore } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function ArrayDisplay({ title, array }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20; // Number of items to display per page
  const totalPages = Math.ceil(array.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const currentPageItems = array.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <Box sx={{ marginBottom: 2, textAlign: 'center' }}>
      <Typography sx={{ textTransform: 'none'}} variant="body1" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {currentPageItems.map((item, index) => (
          <Paper key={index} sx={{ padding: 1, margin: 0.2, borderRadius: 1 }}>
            <Typography variant="overline" >{item}</Typography>
          </Paper>
        ))}
      </Box>
      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <IconButton
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          color="primary"
        >
          <NavigateBefore />
        </IconButton>
        <Typography variant="caption" sx={{ marginX: 2 }}>
          Page {currentPage + 1} of {totalPages}
        </Typography>
        <IconButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          color="primary"
        >
          <NavigateNext />
        </IconButton>
      </Box>
    </Box>
  );
}

export default ArrayDisplay;