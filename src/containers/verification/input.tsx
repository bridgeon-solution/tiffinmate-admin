import React, { useEffect, useState } from "react";
import {
  PaginationVerification,
  ProviderDetails,
} from "../../services/provider";
import Verificationtable from "../../components/provider/verificationtable";
import { toast } from "react-toastify";
import {
  VerificationApprove,
  VerificationRejected,
} from "../../services/provider";

interface Provider {
  id: string;
  certificate: string;
  email: string;
  username: string;
  verification_status: string;
}

const ProviderContainer: React.FC = () => {
  const [providerData, setProviderData] = useState<Provider[] | null>(null);
  const [_, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const FetchUser = async (page: number, search: string) => {
    try {
      const response = await PaginationVerification(page, search);

      setProviderData(response.result);
    } catch (error) {
      toast.error("Failed to fetch pagination data");
    }
  };

  const ApproveVerification = async (id: string) => {
    try {
      const response = await VerificationApprove(id);
      if (response.status == "success") {
        toast.success(response.result);
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
      if (response.status == "success") {
        toast.success(response.result);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    FetchUser(page, search);
  };

  useEffect(() => {
    FetchUser(1, search);
  }, [search]);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const response = await ProviderDetails();
        setProviderData(response);
      } catch (error) {
        toast.error("something went wrong");
      }
    };
    fetchProvider();
  }, [ApproveVerification, RejectVerification]);

  return (
    <div>
      {providerData ? (
        <Verificationtable
          provider={providerData}
          RejectVerification={RejectVerification}
          ApproveVerification={ApproveVerification}
          setSearch={setSearch}
          handlePageChange={handlePageChange}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProviderContainer;
