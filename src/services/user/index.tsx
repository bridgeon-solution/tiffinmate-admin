import axiosInstance from '../api';

export const UserDetails =async () => {
    const response=await axiosInstance.get('/Auth/get_users')
  return response.data.result;
    
}

export const BlockUnblockUser =async (id:string) => {
  const response=await axiosInstance.put(`/Auth/block_unblock?id=${id}`)
return response.data.result;
  
}






