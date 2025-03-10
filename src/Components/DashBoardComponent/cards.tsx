import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import Card from "../../Atoms/Card";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PeopleIcon from "@mui/icons-material/People";
import PieChartIcon from "@mui/icons-material/PieChart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import { TotalProvider } from "../../Services/ProviderService";
import { TotalUsers } from "../../Services/UserService";
import { GetAllOrders, GetTotalRevenue, GetTotalRevenueSubscription } from "../../Services/OrderService";


const Cards: React.FC = () => {
  const [totalProvider,setTotalProvider]=useState(0);
  const [totalOrder,setTotalOrder]=useState(0);
  const [totalUsers,setTotalUsers]=useState(0);
  const [totalRevenue,setTotalRevenue]=useState(0);
  const [totalSubscriptionRevenue,setTotalSubscriptionRevenue]=useState(0);




const FetchProviders=async()=>{
  const totalProviders=await TotalProvider();
    setTotalProvider(totalProviders);

}

const FetchSubscriptionRevenue=async()=>{
  const total=await GetTotalRevenueSubscription(totalOrder);
    setTotalSubscriptionRevenue(total);

}

const FetchUsers=async()=>{
  const totalUsers=await TotalUsers();
    setTotalUsers(totalUsers);

}

const FetchOrdersAndRevenue = async () => {
  const totalOrder = await GetAllOrders();
  setTotalOrder(totalOrder);

  const Revenue = await GetTotalRevenue(totalOrder);
  setTotalRevenue(Revenue);
};

useEffect(() => {
  FetchProviders();
  FetchUsers();
  FetchOrdersAndRevenue(); 
  FetchSubscriptionRevenue()
}, []);
const revenue=totalSubscriptionRevenue+totalRevenue;
  
  return (
    <Grid
      container
      spacing={2}
      mt="10px"
      
    >
      {/* card-1 */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          icon={
            <InsertDriveFileIcon
              style={{ color: "#4caf50", fontSize: "30px" }}
            />
          }
          number={totalOrder}
          text="Total Orders"
        />
      </Grid>
      {/* card-2 */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          icon={<PeopleIcon style={{ color: "#3f51b5", fontSize: "30px" }} />}
          number={totalUsers}
          text="Total Users"
        />
      </Grid>
      {/* card-3 */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          icon={<PieChartIcon style={{ color: "#f50057", fontSize: "30px" }} />}
          number={revenue}
          text="Total Revenue"
        />
      </Grid>

      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Card
            icon={<StoreIcon style={{ color: "#ff9800", fontSize: "30px" }} />}
            number={totalProvider}
            text="Total Providers"
          />
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
    </Grid>
  );
};

export default Cards;
