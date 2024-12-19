import axiosInstance from "../api";

export const ProviderDetails = async () => {
  try {
    const response = await axiosInstance.get("/Provider");
    if (response && response.data && response.data.result) {
      return response.data.result;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const VerificationApprove = async (id: string) => {
  try {
    const response = await axiosInstance.post(
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
    const response = await axiosInstance.post(
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
    const response = await axiosInstance.patch(`/Provider/block?id=${id}`);

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
    const response = await axiosInstance.patch(
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
  filter: string
) => {
  try {
    const response = await axiosInstance.get(
      `/Provider?pageSize=${3}&page=${page}&search=${search}&filter=${filter}&verifystatus=approved`
    );

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const PaginationVerification = async (page: number, search: string) => {
  try {
    const response = await axiosInstance.get(
      `/Provider?pageSize=${3}&page=${page}&search=${search}&verifystatus=pending`
    );

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};
