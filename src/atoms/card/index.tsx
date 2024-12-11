import React from 'react';
import { Box, Typography } from '@mui/material';

interface CardProps {
  icon: React.ReactNode;
  number: number;
  text: string;
}

const Card: React.FC<CardProps> = ({ icon, number, text }) => {
  return (
    <Box
      height="30vh"
      width="60vh"
      sx={{
        borderRadius: "10px",
        backgroundColor: "white",
        margin: "10px", 
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{
          padding: "40px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#d5f5d3",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "60px",
            height: "60px",
          }}
        >
          {icon}
        </Box>
      </Box>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#e6852c" }}>
          {number}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            fontSize: "18px",
            textAlign: "center",
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default Card;
