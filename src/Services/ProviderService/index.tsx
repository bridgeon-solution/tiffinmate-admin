import api from "../api";

export const VerificationApprove = async (id: string) => {
  try {
   
    const response = await api.post(
      `Verification/send-password/${id}`
    );
    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const VerificationRejected = async (id: string) => {
  try {
  
    const response = await api.post(
      `/Verification/removeprovider?providerId=${id}`
    );

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const BlockUnblockProvider = async (id: string) => {
  try {
    
    const response = await api.patch(`/Provider/block?id=${id}`);

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const SearchedProvider = async () => {
  try {
   
    const response = await api.patch(
      `/Provider/search?search=${name}`
    );

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const PaginationProvider = async (
  page: number,
  search: string,
  filter: string,
  selectedValue: number
) => {
  try {
    

    const response = await api.get(
      `/Provider?pageSize=${selectedValue}&page=${page}&search=${search}&filter=${filter}&verifystatus=approved`
    );

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const PaginationVerification = async (
  page: number,
  search: string,
  selectedValue: number
) => {
  try {
   

    const response = await api.get(
      `/Provider?pageSize=${selectedValue}&page=${page}&search=${search}&verifystatus=pending`
    );

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const FetchProviderDetails = async (id: string) => {
  try {
   
    const response = await api.get(`/Provider/${id}/details`);

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const FetchProviderReviews = async (id: string) => {
  try {
   
    const response = await api.get(`/Provider/${id}/reviews`);
    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const FetchProviderMenus = async (id: string) => {
  try {
   
    const response = await api.get(`/FoodItem/providerid/${id}`);
    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const TotalProvider = async () => {
  try {
   
    const response = await api.get("/Provider");
    if (response && response.data && response.data.result) {
      return response.data.result.totalCount;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const FetchTransaction=async(id:string)=>{
  try {  
    const response = await api.get(`/Provider/Payment/${id}?pageSize=12`);
    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
}
