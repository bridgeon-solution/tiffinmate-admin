import React, { useEffect, useState } from "react";
import { PaginationProvider } from "../../services/provider";
import Providertable from "../../components/provider/providertable";
import { toast } from "react-toastify";
import { BlockUnblockProvider } from "../../services/provider";

interface Provider {
  id: string;
  email: string;
  user_name: string;
  verification_status: string;
  is_blocked: boolean;
}
const VendorContainer: React.FC = () => {
  const [providerData, setProviderData] = useState<Provider[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [totalProviders, setTotalProviders] = useState<number>(1);
  const FetchUser = async (page: number, search: string, filter: string) => {
    try {
      const response = await PaginationProvider(page, search, filter);
      if (response && response.result) {
        setProviderData(response.result.providers);
        setTotalProviders(response.result.totalCount);
      }
    } catch (error) {
      toast.error("Failed to fetch pagination data");
    }
  };

  const handleBlockUnblock = async (id: string) => {
    try {
      await BlockUnblockProvider(id);
      FetchUser(currentPage, search, filter);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    FetchUser(page, search, filter);
  };

  useEffect(() => {
    FetchUser(1, search, filter);
  }, [filter, search]);

  return (
    <div>
      {providerData ? (
        <Providertable
          provider={providerData}
          setSearch={setSearch}
          setFilter={setFilter}
          handleBlockUnblock={handleBlockUnblock}
          handlePageChange={handlePageChange}
          totalProviders={totalProviders}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default VendorContainer;
