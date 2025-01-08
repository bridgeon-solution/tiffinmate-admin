import axiosInstance from "../api";

export const GetOrders = async (page:number,selectedValue:number,search:string,filter:string) => {
  try {
    const response = await axiosInstance.get(
      `/Order?page=${page}&pageSize=${selectedValue}&search=${search}&filter=${filter}`
    );
   
    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};



export const GetOrderDetails = async (id:string) => {
  try {
    const response = await axiosInstance.get(
      `/Order/${id}`
    );
   
    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};




export const GetSubscrition = async (page:number,selectedValue:number,search:string,filter:string) => {
  try {
    const response = await axiosInstance.get(
      `/Subscription?page=${page}&pageSize=${selectedValue}&search=${search}&filter=${filter}`
    );
   
    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};
