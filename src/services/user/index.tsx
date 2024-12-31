import axiosInstance from "../api";

export const BlockUnblockUser = async (id: string) => {
  try {
    const response = await axiosInstance.patch(`/User/block?id=${id}`);

    if (response && response.data && response.data.result) {
      return response.data.result;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const PaginationUser = async (
  page: number,
  search: string,
  filter: string,
  selectedValue: number
) => {
  try {
    const response = await axiosInstance.get(
      `/User?pageSize=${selectedValue}&page=${page}&search=${search}&filter=${filter}`
    );

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const UserDetailsById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/User/id?id=${id}`);

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const TotalUsers = async () => {
  try {
    const response = await axiosInstance.get("/User");

    if (response && response.data && response.data.result) {
      return response.data.result.totalCount;
    }
    return null;
  } catch (error) {
    throw error;
  }
};
