import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";
import { GetAllOrders, GetMonthlyRevenue, GetMonthlySubscriptionRevenue } from "../../Services/OrderService";
import { useEffect, useState } from "react";


interface detailsProp{
  date:string;
  total_price:number;
}

export default function OrdersAndRevenueComparison() {
  const [ _,setMonthlyRevenue] = useState<Record<string, number>>({});
  const [subscriptionRevenueData, setSubscriptionRevenueData] = useState<number[]>([]);

  const [months, setMonths] = useState<string[]>([]); 
  const [revenueData, setRevenueData] = useState<number[]>([]);
  


  const FetchMonthlyDailyRevenue = async () => {
    const ress = await GetAllOrders();
    const totalOrders = ress; 
    
      const res = await GetMonthlyRevenue(totalOrders);

      if (!res) {
        return;
      }

      const monthlyRevenue: Record<string, number> = {};

      res.forEach((detail: detailsProp) => {
        const { date, total_price } = detail;
        const month = new Date(date).toLocaleString("default", { month: "short" }); 

        if (monthlyRevenue[month]) {
          monthlyRevenue[month] += total_price;
        } else {
          monthlyRevenue[month] = total_price;
        }
      });

      const sortedMonths = Object.keys(monthlyRevenue).sort(
        (a, b) => new Date(`01 ${a} 2000`).getMonth() - new Date(`01 ${b} 2000`).getMonth()
      );
      const revenueValues = sortedMonths.map((month) => monthlyRevenue[month]);

      setMonthlyRevenue(monthlyRevenue);
      setMonths(sortedMonths);
      setRevenueData(revenueValues);

      
    
  };


  const FetchMonthlySUbscriptionRevenue = async () => {
   
    const ress = await GetAllOrders();
   
    const totalOrders = ress; 
      const res = await GetMonthlySubscriptionRevenue(totalOrders);
      

      if (!res) {
        return;
      }
      const monthlyRevenue: Record<string, number> = {};

      res.forEach((detail: detailsProp) => {
        const { date, total_price } = detail;
        const month = new Date(date).toLocaleString("default", { month: "short" }); 

        if (monthlyRevenue[month]) {
          monthlyRevenue[month] += total_price;
        } else {
          monthlyRevenue[month] = total_price;
        }
      });

      const sortedMonths = Object.keys(monthlyRevenue).sort(
        (a, b) => new Date(`01 ${a} 2000`).getMonth() - new Date(`01 ${b} 2000`).getMonth()
      );
      const revenueValues = sortedMonths.map((month) => monthlyRevenue[month]);

      setMonthlyRevenue(monthlyRevenue);
      setMonths(sortedMonths);
      setSubscriptionRevenueData(revenueValues);
   
  };
  
  useEffect(()=>{
    FetchMonthlyDailyRevenue()
    FetchMonthlySUbscriptionRevenue()
  },[])



  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2,
       }}>
      <Card sx={{  boxShadow: 3,maxWidth: 900,"@media (max-width: 768px)": {
            maxWidth: "95%",
          }, }}>
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ mb: 2, color: "#e65100",textAlign: "center" }}
          >
            Orders vs Revenue (Monthly)
          </Typography>
          <Box sx={{
              overflowX: "auto", 
              width: "100%",
            }}>
          <LineChart
            width={500}
            height={300}
            series={[
              {
                data: subscriptionRevenueData,
                label: "Subscription Revenue",
                color: "#ffa726",
              },
              {
                data: revenueData,
                label: "Daily Order Revenue",
                color: "red",
              },
            ]}
            xAxis={[{ scaleType: "point", data: months }]}
          />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
