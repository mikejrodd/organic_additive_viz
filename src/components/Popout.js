import React from 'react';
import { Typography, Card, CardContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Popout = ({ additive, onClose }) => {
  if (!additive) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(250, 249, 246, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <Card 
        style={{
          width: '300px',
          padding: '16px',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <CardContent>
          <Typography variant="h5">{additive.name}</Typography>
          <Typography variant="body2" style={{ color: 'grey' }}>{additive.category}</Typography>
          <Typography variant="body2">{additive.description}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Popout;
