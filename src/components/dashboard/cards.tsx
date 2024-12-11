import React from 'react';
import { Box, Grid } from '@mui/material';
import Card from '../../atoms/card';
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

const Cards: React.FC = () => {
  return (
    <Box padding={2}>
      <Grid container spacing={3}>
        {/* Card 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            icon={<FoodBankOutlinedIcon sx={{ fontSize: '40px', color: '#2196f3' }} />}
            number={50}
            text="Total Orders"
          />
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            icon={<ShoppingCartOutlinedIcon sx={{ fontSize: '40px', color: '#2196f3' }} />}
            number={50}
            text="Total Orders"
          />
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            icon={<PeopleAltOutlinedIcon sx={{ fontSize: '40px', color: '#2196f3' }} />}
            number={50}
            text="Total Orders"
          />
        </Grid>

        {/* Centered Row for Card 4 and Card 5 */}
        <Grid container item xs={12} justifyContent="center" spacing={3}>
          {/* Card 4 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              icon={<PeopleAltOutlinedIcon sx={{ fontSize: '40px', color: '#2196f3' }} />}
              number={50}
              text="Total Providers"
            />
          </Grid>

          {/* Card 5 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              icon={<PeopleAltOutlinedIcon sx={{ fontSize: '40px', color: '#2196f3' }} />}
              number={50}
              text="Total Providers"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cards;
