import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import { GetAllOrders, GetTotalRevenue, GetTotalRevenueSubscription } from "../../services/order";





const PieCard: React.FC = () => {

 const [totalOrder,setTotalOrder]=useState(0);
  const [totalRevenue,setTotalRevenue]=useState(0);
  const [totalSubscriptionRevenue,setTotalSubscriptionRevenue]=useState(0);

  const FetchSubscriptionRevenue=async()=>{
    const total=await GetTotalRevenueSubscription(totalOrder);
      setTotalSubscriptionRevenue(total);
  
  }

  const FetchOrdersAndRevenue = async () => {
    const totalOrder = await GetAllOrders();
    setTotalOrder(totalOrder);
  
    const Revenue = await GetTotalRevenue(totalOrder);
    setTotalRevenue(Revenue);
  };
  useEffect(() => {
   
    FetchOrdersAndRevenue(); 
    FetchSubscriptionRevenue()
  }, []);

  const revenue=totalSubscriptionRevenue+totalRevenue;
  const percentageOfRevenue=Math.ceil(revenue/100*10)
  const percentageOfOrder=Math.ceil(totalOrder/100*10)
  const balancedRevenue=100-percentageOfRevenue;
  const balancedOrder=100-percentageOfOrder;

  const ordersData = [
    { id: "Completed Orders", value: percentageOfOrder, label: "Completed", color: "#ffa726" },
    { id: "Pending Orders", value: balancedOrder, label: "Pending", color: "#ff7043" },
  ];
  const revenueData = [
    { id: "Revenue Generated", value: percentageOfRevenue, label: "Generated", color: "green" },
    { id: "Revenue Pending", value: balancedRevenue, label: "Pending", color: "#ff7043" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <Card sx={{  minWidth: 470,
          boxShadow: 3,
          overflowX: { xs: "auto", sm: "visible" },}}>
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ mb: 2, color: "#e65100" }}
          >
            Orders Summary
          </Typography>
          <PieChart
            height={200}
            series={[
              {
                data: ordersData.map((item) => ({
                  ...item,
                  label: `${item.label}: ${item.value}%`,
                })),
                innerRadius: 60,
                outerRadius: 100,
              },
            ]}
          />
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 470, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ mb: 2, color: "#e65100" }}
          >
            Revenue Summary
          </Typography>
          <PieChart
            height={200}
            series={[
              {
                data: revenueData.map((item) => ({
                  ...item,
                  label: `${item.label}: ${item.value}%`,
                })),
                innerRadius: 60,
                outerRadius: 100,
              },
            ]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default PieCard;
