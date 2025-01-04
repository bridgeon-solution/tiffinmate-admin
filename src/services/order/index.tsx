import axiosInstance from "../api";

export const GetOrders = async (page:number,pagesize:number,search:string,filter:string) => {
  try {
    const response = await axiosInstance.post(
      `/Order?page=${page}&pageSize=${pagesize}&search=${search}&filter=${filter}`
    );
    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};