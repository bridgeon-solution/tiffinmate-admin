import { Box, CircularProgress, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { GetSubscrition } from "../../services/order";
import Subscriptionorders from "../../components/subscription/subscriptionorders";

interface Subscription {
  city: string;
  user: string;
  provider: string;
  total_price: boolean;
  date: string;
  order_id: string;
  cancelled_at:string;
  payment_status:boolean;
}

const SubscriptionContainer: React.FC = () => {
  const [orderData, setOrderData] = useState<Subscription[] | null>(null);
  const [_, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [totalProviders, setTotalProviders] = useState<number>(1);
  const [selectedValue, setSelectedValue] = useState<number>(10);

  const FetchOrder = async (
    page: number,
    search: string,
    filter: string,
    selectedValue: number
  ) => {
    try {
      const response = await GetSubscrition(page, selectedValue, search, filter);
      if (response && response.result) {
        setOrderData(response.result.allDetails);
        setTotalProviders(response.result.totalCount);
      }
    } catch (error) {
      toast.error("Failed to fetch pagination data");
    }
  };
  const handleSelectChange = (event: SelectChangeEvent<number | string>) => {
    setSelectedValue(Number(event.target.value));
  };
  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    FetchOrder(page, search, filter, selectedValue);
  };
  const exportToExcel = () => {
    if (!orderData || orderData.length === 0) {
      toast.error("No data available to export!");
      return;
    }
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(orderData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "Users.xlsx");
  };

   useEffect(() => {
              FetchOrder(1, search, filter, selectedValue);
            }, [filter, search, selectedValue]);
  return (
    <>
   {orderData ? (
        <Subscriptionorders
          order={orderData}
          setSearch={setSearch}
          setFilter={setFilter}
          handlePageChange={handlePageChange}
          totalOrders={totalProviders}
          handleSelectChange={handleSelectChange}
          selectedValue={selectedValue}
          exportToExcel={exportToExcel}
          
        />
      ) : (
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>

      )}
  
  
  </>
  )
  
};

export default SubscriptionContainer;
