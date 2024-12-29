import React, { useState } from 'react';

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
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <h3>{title}</h3>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {currentPageItems.map((item, index) => (
          <div key={index} style={{ padding: '5px 10px', margin: '1px', border: '1px solid #ccc', borderRadius: '4px' }}>
            {item}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ArrayDisplay;
