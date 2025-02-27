import React from 'react';
import { Box, Typography } from '@mui/material';

interface CardProps {
  icon: React.ReactNode;
  number: number;
  text: string;
}

const Card: React.FC<CardProps> = ({ icon, number, text }) => {
  return (
    // card
    <Box
      sx={{
        width: '300px',
        height:"130px",
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 2px  10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
      }}
    >
     
      <Box
        sx={{
          backgroundColor: '#d5f5d3',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '60px',
          height: '60px',
        }}
      >
        {icon}  
      </Box>

      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          {number}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#666',
            fontSize: '16px',
          }}
        >
          {text}
        </Typography>
        
      </Box>
    </Box>
  );
};

export default Card;

