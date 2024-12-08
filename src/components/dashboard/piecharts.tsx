import React from 'react';
import { Box, Grid } from '@mui/material';
import PieChartComponent from '../../atoms/piechart/index.tsx';

const PieCharts: React.FC = () => {
  const chartData1 = [
    { label: 'Mobile', value: 80 },
    { label: 'Desktop', value: 20 },
  ];

  const chartData2 = [
    { label: 'iOS', value: 60 },
    { label: 'Android', value: 40 },
  ];

  return (
    <Box padding={2}>
      <Grid container spacing={2} justifyContent="center">
        {/* Chart 1 */}
        <Grid item xs={12} sm={6} md={5}>
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: 2,
              height: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PieChartComponent
              data={chartData1}
              innerRadius={20}
              height={200}
              text="Total Orders"
            />
          </Box>
        </Grid>
        {/* Chart 2 */}
        <Grid item xs={12} sm={6} md={5}>
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: 2,
              height: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PieChartComponent
              data={chartData2}
              innerRadius={20}
              height={200}
              text="Total Revenue"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PieCharts;
