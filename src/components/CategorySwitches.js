import React from 'react';
import { Button, Box } from '@mui/material';

const CategorySwitches = ({ categories, activeCategories, onCategoryChange }) => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      p={1}
    >
      {Object.keys(categories).map(category => (
        <Button
          key={category}
          variant="contained"
          onClick={() => onCategoryChange(category)}
          style={{
            backgroundColor: activeCategories.includes(category) ? '#f1e1f5' : '#FAF9F6',
            color: activeCategories.includes(category) ? '#333' : '#333',
            margin: '5px',
            marginBottom: '3px',
            fontSize: '0.8rem',
            textTransform: 'none',
            width: '95%',
            height: '40px',
            borderRadius: '10px',            
          }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
};

export default CategorySwitches;
