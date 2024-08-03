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
            backgroundColor: activeCategories.includes(category) ? '#ffffff' : '#ffffff',
            color: activeCategories.includes(category) ? '#333' : '#333',
            margin: '5px',
            marginBottom: '3px',
            fontSize: '0.8rem',
            textTransform: 'none',
            width: '95%',
            height: '40px',
            border: activeCategories.includes(category) ? '4px solid #f1e1f5' : '1 px solid #ffffff',
            borderRadius: '16px',            
          }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
};

export default CategorySwitches;
