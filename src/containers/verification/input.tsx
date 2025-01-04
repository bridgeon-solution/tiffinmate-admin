import React, { useEffect, useState } from "react";
import { PaginationVerification } from "../../services/provider";
import Verificationtable from "../../components/provider/verificationtable";
import { toast } from "react-toastify";
import {
  VerificationApprove,
  VerificationRejected,
} from "../../services/provider";
import { Box, CircularProgress, SelectChangeEvent } from "@mui/material";

interface Provider {
  id: string;
  certificate: string;
  email: string;
  user_name: string;
  verification_status: string;
}

const ProviderContainer: React.FC = () => {
  const [providerData, setProviderData] = useState<Provider[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [totalProviders, setTotalProviders] = useState<number>(1);
  const [selectedValue, setSelectedValue] = useState<number>(5);

  const FetchUser = async (
    page: number,
    search: string,
    selectedValue: number
  ) => {
    try {
      const response = await PaginationVerification(
        page,
        search,
        selectedValue
      );
      if (response && response.result) {
        setProviderData(response.result.providers);
        setTotalProviders(response.result.totalCount);
      }
    } catch (error) {
      toast.error("Failed to fetch pagination data");
    } finally {
      setLoading(false);
    }
  };

  const ApproveVerification = async (id: string) => {
    try {
      const response = await VerificationApprove(id);
      FetchUser(currentPage, search, selectedValue);
      if (response.status == "success") {
        toast.success("Password sended succesfully.");
      } else {
        toast.warning(response.error_message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const RejectVerification = async (id: string) => {
    try {
      const response = await VerificationRejected(id);
      FetchUser(currentPage, search, selectedValue);
      if (response.status == "success") {
        toast.success(response.result);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const handleSelectChange = (event: SelectChangeEvent<number | string>) => {
    setSelectedValue(Number(event.target.value));
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    FetchUser(page, search, selectedValue);
  };

  const handleDownloadCertificate = async (
    certificate: string,
    name: string
  ) => {
    try {
      const response = await fetch(certificate);
      if (!response.ok) {
        throw new Error("failed to fetch image");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name}/certificate.webp`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("failed download image");
    }
  };

  useEffect(() => {
    FetchUser(1, search, selectedValue);
  }, [search, selectedValue]);

  return (
    <div>
      {providerData ? (
        <Verificationtable
          provider={providerData}
          RejectVerification={RejectVerification}
          ApproveVerification={ApproveVerification}
          setSearch={setSearch}
          handlePageChange={handlePageChange}
          handleDownloadCertificate={handleDownloadCertificate}
          totalProviders={totalProviders}
          handleSelectChange={handleSelectChange}
          selectedValue={selectedValue}
        />
      ) : (
        <div><Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
</div>
      )}
    </div>
  );
};

export default ProviderContainer;
