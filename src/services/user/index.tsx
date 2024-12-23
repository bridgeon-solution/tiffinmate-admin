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
  filter: string
) => {
  try {
    const response = await axiosInstance.get(
      `/User?pageSize=3&page=${page}&search=${search}&filter=${filter}`
    );

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};


export const UserDetailsById = async (id:string) => {
  try {
    const response = await axiosInstance.get(
      `/User/id?id=${id}`
    );

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};
