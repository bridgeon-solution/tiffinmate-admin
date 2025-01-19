import api from "../api";

export const BlockUnblockUser = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found. Please log in again.");
    }
    const response = await api.patch(`/User/block?id=${id}`);

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
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found. Please log in again.");
    }
    const response = await api.get(
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
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found. Please log in again.");
    }
    const response = await api.get(`/User/id?id=${id}`);

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
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found. Please log in again.");
    }
    const response = await api.get("/User");

    if (response && response.data && response.data.result) {
      return response.data.result.totalCount;
    }
    return null;
  } catch (error) {
    throw error;
  }
};
