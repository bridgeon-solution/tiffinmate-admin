import React, { useEffect, useState } from "react";
import Usertable from "../../Components/UserComponent/userstable";
import { BlockUnblockUser, PaginationUser } from "../../Services/UserService";
import { toast } from "react-toastify";
import BasicModal from "../../Atoms/Modal";
import Userdetails from "../../Components/UserComponent/userdetails";
import { Box, CircularProgress, SelectChangeEvent } from "@mui/material";

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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [totalProviders, setTotalProviders] = useState<number>(1);
  const [selectedValue, setSelectedValue] = useState<number>(5);

  const FetchUser = async (
    page: number,
    search: string,
    filter: string,
    selectedValue: number
  ) => {
    try {
      const response = await PaginationUser(
        page,
        search,
        filter,
        selectedValue
      );
      if (response && response.result) {
        setUserData(response.result.users);
        setTotalProviders(response.result.totalCount);
      }
    } catch (error) {
      toast.error("Failed to fetch pagination data");
    } finally {
      setLoading(false);
    }
  };
  const handleSelectChange = (event: SelectChangeEvent<number | string>) => {
    setSelectedValue(Number(event.target.value));
  };

  const handleBlockUnblock = async (id: string) => {
    try {
      await BlockUnblockUser(id);
      FetchUser(currentPage, search, filter, selectedValue);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    FetchUser(page, search, filter, selectedValue);
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
    FetchUser(1, search, filter, selectedValue);
  }, [filter, search, selectedValue]);

  return (
    <>
      {userData ? (
        <Usertable
          user={userData}
          setSearch={setSearch}
          setFilter={setFilter}
          handleBlockUnblock={handleBlockUnblock}
          handlePageChange={handlePageChange}
          handleDetails={handleDetails}
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
      {openModal && selectedUserId && (
        <BasicModal open={openModal} handleClose={handleCloseModal}>
          <Userdetails userId={selectedUserId} handleClose={handleCloseModal} />
        </BasicModal>
      )}
    </>
  );
};

export default UserContainer;
