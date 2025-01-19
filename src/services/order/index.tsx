import { toast } from "react-toastify";
import api from "../api";



export const GetOrders = async (page:number,selectedValue:number,search:string,filter:string) => {
  try {
    
    const response = await api.get(
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
   
    const response = await api.get(
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
    const response = await api.get(
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


 export const GetAllFoodItems = async (menuId:string,categoryId:string) => {
    try {
      const response = await api.post(
        `FoodItem/menu-category?menuId=${menuId}`,categoryId
      );
      
      if (response && response.data && response.data.result) {
        return response.data;
      }
      return null;
    } catch {
      toast.error("Error fetching foodItem")
    }
  };


  export const GetAllOrders = async () => {
    try {
      
      const response = await api.get(
        '/Order'
      );
     
      if (response && response.data && response.data.result) {
        return response.data.result.totalCount;
      }
      return null;
    } catch (error) {
      toast.error("error fetching total orders")
    }
  };


  export const GetTotalRevenue = async (totalOrder:number) => {
    try {
      
      const response = await api.get(
        `/Order?page=${1}&pageSize=${totalOrder}`
      );
     
      if (response && response.data && response.data.result) {
        const allDetails = response.data.result.allDetails;
        const totalRevenue = allDetails.reduce((sum: number, order: { total_price: number }) => {
          return sum + order.total_price
        }, 0);
        return totalRevenue;
        
        
      }
      return null;
    } catch (error) {
      throw error;
    }
  };


  export const GetTotalRevenueSubscription = async () => {
    try {
      
      const response = await api.get(
        `/Subscription?page=${1}&pageSize=${10}`
      );
      if (response && response.data && response.data.result) {
        const allDetails = response.data.result.allDetails;
        const totalRevenue = allDetails.reduce((sum: number, order: { total_price: number }) => {
          return sum + order.total_price
          
        }, 0);
        return totalRevenue;

        
        
      }
      return null;
    } catch (error) {
      throw error;
    }
  };