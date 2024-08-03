import React from 'react';
import { Box, Typography, Switch } from '@mui/material';
import { styled } from '@mui/system';

const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#7b1fa2', // Thumb color when checked
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#f1e1f5', // Track color when checked
  },
  '& .MuiSwitch-switchBase': {
    color: '#d3d3d3', // Lighter grey for thumb when unchecked
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#e0e0e0', // Lighter grey for track when unchecked
  },
}));

const CategorySwitches = ({ categories, activeCategories, onCategoryChange }) => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center"
      sx={{ 
        width: '100%',
        overflowY: 'auto',
        marginTop: '90px',
        paddingBottom: '15px',
      }}
    >
      <Box 
        sx={{
          position: 'fixed',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1000,
          width: 'fit-content',
          textAlign: 'center',
          padding: '10px 20px',
          // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.02)',
          borderRadius: '16px',
          '&::after': {
            content: '""',
            display: 'block',
            width: '100%',
            height: '10px',
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))',
            position: 'absolute',
            bottom: 0,
            left: 0,
          }
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ fontFamily: 'Libre Baskerville !important', color: '#7b1fa2', padding: '18px 0 8px 0' }}
        >
          Additive Categories
        </Typography>
      </Box>
      {Object.keys(categories).map(category => (
        <Box
          key={category}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            backgroundColor: '#ffffff',
            color: '#333',
            margin: '5px',
            marginBottom: '3px',
            fontSize: '0.8rem',
            textTransform: 'none',
            width: '88%', // Ensure content is narrow enough to avoid horizontal scrolling
            maxWidth: '360px', // Further constrain the width
            height: '40px',
            borderRadius: '16px',
            padding: '0 16px',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{
              fontFamily: 'Roboto, sans-serif',
              lineHeight: '1', 
              marginLeft: '14px',
            }}
          >
            {category}
          </Typography>
          <CustomSwitch 
            checked={activeCategories.includes(category)}
            onChange={() => onCategoryChange(category)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CategorySwitches;
