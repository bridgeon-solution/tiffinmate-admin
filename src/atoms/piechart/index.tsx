import React from 'react';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';

interface PieChartData {
  label: string;
  value: number;
}

interface PieChartProps {
  data: PieChartData[]; 
  height?: number;      
  innerRadius?: number; 
  skipAnimation?: boolean; 
  text:string
}

const PieChartComponent: React.FC<PieChartProps> = ({
  data,
  height = 300,
  innerRadius =100 ,
  skipAnimation = false,
  text
  
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <PieChart
        height={height}
        series={[
          {
            data: data,
            innerRadius: innerRadius,
            // arcLabel: (params) => params.label ?? '',
            arcLabelMinAngle: 100,
          },
        ]}
        skipAnimation={skipAnimation}
      />
      <Typography sx={{marginLeft:"28%"}}>{text}</Typography>
    </Box>
  );
};

export default PieChartComponent;
