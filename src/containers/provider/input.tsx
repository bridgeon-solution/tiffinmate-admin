import React, { useEffect, useState } from "react";
import { FetchTransaction, PaginationProvider } from "../../services/provider";
import Providertable from "../../components/provider/providertable";
import { toast } from "react-toastify";
import { Box, CircularProgress, SelectChangeEvent } from "@mui/material";
import { BlockUnblockProvider } from "../../services/provider";
import Providerdetailspage from "../../components/provider/providerDetails";
import { Provider, Transaction } from "../../components/provider/type";
import TransactionHistory from "../../components/provider/transactionHistory";



const VendorContainer: React.FC = () => {
  const [providerData, setProviderData] = useState<Provider[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [totalProviders, setTotalProviders] = useState<number>(1);

  const [selectedValue, setSelectedValue] = useState<number>(10);


 

  const FetchUser = async (
    page: number,
    search: string,
    filter: string,
    selectedValue: number
  ) => {
    try {
      const response = await PaginationProvider(
        page,
        search,
        filter,
        selectedValue
      );
      if (response && response.result) {
        setProviderData(response.result.providers);
        setTotalProviders(response.result.totalCount);
      }
    } catch (error) {
      toast.error("Failed to fetch pagination data");
    }
  };
  const handleSelectChange = (event: SelectChangeEvent<number | string>) => {
    setSelectedValue(Number(event.target.value));
  };

  const handleBlockUnblock = async (id: string) => {
    try {
      await BlockUnblockProvider(id);
      FetchUser(currentPage, search, filter, selectedValue);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    FetchUser(page, search, filter, selectedValue);
  };

  useEffect(() => {
    FetchUser(1, search, filter, selectedValue);
  }, [filter, search, selectedValue]);
  useEffect(() => {
    console.log("Drawer open:", open);
  }, [open]);

  return (
    <>
      {providerData ? (
        <Providertable
          provider={providerData}
          setSearch={setSearch}
          setFilter={setFilter}
          handleBlockUnblock={handleBlockUnblock}
          handlePageChange={handlePageChange}
          totalProviders={totalProviders}
          handleSelectChange={handleSelectChange}
          selectedValue={selectedValue}
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
  );
};

export default VendorContainer;
