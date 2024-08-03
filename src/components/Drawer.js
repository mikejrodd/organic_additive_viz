import React, { useRef } from 'react';
import { Drawer as MuiDrawer, List } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CategorySwitches from './CategorySwitches';

const useStyles = makeStyles({
  drawerPaper: {
    width: 400,
    position: 'fixed',
    overflowY: 'auto',
    backgroundColor: '#ffffff !important', // Set the background color here
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#f0e6f2', // Lighter color for the scrollbar thumb
      borderRadius: '6px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#ffffff', // Lighter color for the scrollbar track
    },
  },
});

const Drawer = ({ additives, categories, activeCategories, onCategoryChange }) => {
  const classes = useStyles();
  const drawerRef = useRef(null);

  return (
    <MuiDrawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div ref={drawerRef} style={{ height: '100%', width: '100%' }}>
        <List style={{ padding: 0 }}>
          <CategorySwitches 
            categories={categories} 
            activeCategories={activeCategories} 
            onCategoryChange={onCategoryChange} 
          />
        </List>
      </div>
    </MuiDrawer>
  );
};

export default Drawer;
