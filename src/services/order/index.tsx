import axiosInstance from "../api";

export const GetOrders = async (page:number,selectedValue:number,search:string,filter:string) => {
  try {
    const response = await axiosInstance.get(
      `/Order?page=${page}&pageSize=${selectedValue}&search=${search}&filter=${filter}`
    );
    console.log(response)
    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};