import React, { useEffect, useState } from "react";
import Usertable from "../../components/user/userstable";
import { BlockUnblockUser, PaginationUser } from "../../services/user";
import { toast } from "react-toastify";
import BasicModal from "../../atoms/modal";
import Userdetails from "../../components/user/userdetails";

interface User {
  id: string;
  email: string;
  name: string;
  is_blocked: boolean;
}

const UserContainer: React.FC = () => {
  const [userData, setUserData] = useState<User[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [_, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [openModal,setOpenModal]=useState<boolean>(false);
  const [selectedUserId,setSelectedUserId]=useState<string|null>(null);
  const [totalProviders,setTotalProviders]=useState<number>(1);

  const FetchUser = async (page: number, search: string, filter: string) => {
    try {
      const response = await PaginationUser(page, search, filter);
      if(response&&response.result){
      setUserData(response.result.users);
      setTotalProviders(response.result.totalCount)
      }
    } catch (error) {
      toast.error("Failed to fetch pagination data");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUnblock = async (id: string) => {
    try {
      await BlockUnblockUser(id);
      FetchUser(currentPage, search, filter);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    FetchUser(page, search, filter);
  };
  const handleDetails = (id: string) => {
    setSelectedUserId(id); 
    setOpenModal(true); 
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUserId(null); 
  };

  useEffect(() => {
    FetchUser(1, search, filter);
  }, [filter, search]);

  return (
    <div>
      {userData ? (
        <Usertable
          user={userData}
          setSearch={setSearch}
          setFilter={setFilter}
          handleBlockUnblock={handleBlockUnblock}
          handlePageChange={handlePageChange}
          handleDetails={handleDetails}
          totalProviders={totalProviders}
        />
      ) : (
        <div>No users found</div>
      )}
    {openModal && selectedUserId && (
  <BasicModal open={openModal} handleClose={handleCloseModal}>
    <Userdetails userId={selectedUserId} handleClose={handleCloseModal} />
  </BasicModal>
)}

    </div>
  );
};

export default UserContainer;
