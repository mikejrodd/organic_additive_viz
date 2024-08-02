import React from 'react';
import { Drawer as MuiDrawer, List } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CategorySwitches from './CategorySwitches';

const useStyles = makeStyles({
  drawerPaper: {
    width: 400,
    position: 'fixed',
    overflowY: 'scroll',
    backgroundColor: '#FAF9F6 !important', // Set the background color here
    '&::-webkit-scrollbar': {
      width: '0px',
    },
    scrollbarWidth: 'none', // For Firefox
    msOverflowStyle: 'none', // For Internet Explorer and Edge
  },
});

const Drawer = ({ additives, categories, activeCategories, onCategoryChange }) => {
  const classes = useStyles();

  return (
    <MuiDrawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List>
        <CategorySwitches 
          categories={categories} 
          activeCategories={activeCategories} 
          onCategoryChange={onCategoryChange} 
        />
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
