import React from "react";
import { Grid, Box } from "@mui/material";
import Card from "../../atoms/card";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PeopleIcon from "@mui/icons-material/People";
import PieChartIcon from "@mui/icons-material/PieChart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import PieCharts from "./piecharts";

const Cards: React.FC = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: "20px",
      }}
    >
      {/* card-1 */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          icon={
            <InsertDriveFileIcon
              style={{ color: "#4caf50", fontSize: "30px" }}
            />
          }
          number={75}
          text="Total Orders"
        />
      </Grid>
      {/* card-2 */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          icon={<PeopleIcon style={{ color: "#3f51b5", fontSize: "30px" }} />}
          number={60}
          text="Total Users"
        />
      </Grid>
      {/* card-3 */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          icon={<PieChartIcon style={{ color: "#f50057", fontSize: "30px" }} />}
          number={40}
          text="Total Revenue"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* card-4 */}
          <Card
            icon={<StoreIcon style={{ color: "#ff9800", fontSize: "30px" }} />}
            number={50}
            text="Total Providers"
          />
          {/* card-5 */}
          <Card
            icon={
              <LocalShippingIcon
                style={{ color: "#9c27b0", fontSize: "30px" }}
              />
            }
            number={85}
            text="Total Delivered"
          />
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <PieCharts />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Cards;
