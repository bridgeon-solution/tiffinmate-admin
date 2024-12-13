import axiosInstance from '../api';

export const UserDetails =async () => {
  try{
    const response=await axiosInstance.get('/Auth/get_users')
    if(response && response.data&&response.data.result){
      return response.data.result;
    }
    return null;
  }catch(error){
    throw error;
    
  }
   
    
}

export const BlockUnblockUser =async (id:string) => {
  try{
    const response=await axiosInstance.put(`/Auth/block_unblock?id=${id}`)
    if(response && response.data&&response.data.result){
      return response.data.result;
    }
    return null;
  }catch(error){
    throw error;

  }
  

  
}






