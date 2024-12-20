import React from "react";
import { Box, Grid } from "@mui/material";
import PieChartComponent from "../../atoms/piechart/index.tsx";

const PieCharts: React.FC = () => {
  const chartData1 = [
    { label: "Orders", value: 80, color: "#e6852c" },
    { label: "", value: 20, color: "#D3D3D3" },
  ];

  const chartData2 = [
    { label: "Revenue", value: 60, color: "#e6852c" },
    { label: "", value: 40, color: "#D3D3D3" },
  ];

  return (
    <Box>
      <Grid container spacing={40}>
        {/* Chart 1 */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 350,
              height: 270,
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
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 350,
              height: 270,
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
