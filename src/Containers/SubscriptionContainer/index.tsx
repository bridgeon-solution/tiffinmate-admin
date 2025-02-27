import { Box, CircularProgress, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { GetSubscrition } from "../../Services/OrderService";
import BasicModal from "../../Atoms/Modal";
import Subscriptionorders from "../../Components/SubscriptionComponent/SubscriptionOrders";
import Subscriptiondetails from "../../Components/SubscriptionComponent/SubscriptionDetails";

interface FoodItem {
  food_name: string;
  price: number;
  description: string;
  day: string;
  image: string;
}

interface Category {
  category_name: string;
  food_Items: FoodItem[];
}

interface Subscription {
  user_name: string;
  provider_name: string;
  address: string | null;
  city: string | null;
  ph_no: string;
  category: Category[];
  menu_name: string;
  total_price: number;
  start_date: string;
  is_active: boolean;
}


const SubscriptionContainer: React.FC = () => {
  const [orderData, setOrderData] = useState<Subscription[] | null>(null);
  const [_, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [totalProviders, setTotalProviders] = useState<number>(1);
  const [selectedValue, setSelectedValue] = useState<number>(10);
      const [modalOpen, setModalOpen] = useState(false);
          const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
          const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

      
  

  const FetchOrder = async (
    page: number,
    search: string,
    filter: string,
    selectedValue: number
  ) => {
    try {
      const response = await GetSubscrition(page, selectedValue, search, filter);
      if (response && response.result) {
        setOrderData(response.result.allsubscription);
        setTotalProviders(response.result.totalCount);
      }
    } catch (error) {
      toast.error("Failed to fetch pagination data");
    }
  };
  const handleSelectChange = (event: SelectChangeEvent<number | string>) => {
    setSelectedValue(Number(event.target.value));
  };
  const handleOpenModal = (menuId: string,category_id:string) => {
    setSelectedMenuId(menuId);
    setSelectedCategoryId(category_id)
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMenuId(null);
    setSelectedCategoryId(null);
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
          onOpenModal={handleOpenModal}
          
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
      {modalOpen && (
        <BasicModal open={modalOpen} handleClose={handleCloseModal}>
          <Subscriptiondetails menuId={selectedMenuId} categoryId={selectedCategoryId} />
        </BasicModal>
      )}
  
  
  </>
  )
  
};

export default SubscriptionContainer;
