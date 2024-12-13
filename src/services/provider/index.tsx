import axiosInstance from '../api';

const ProviderDetails =async () => {
  try{
    const response=await axiosInstance.get('/Provider/getallproviders')
    if(response&&response.data&&response.data.result){
      console.log(response.data.result)
    }
  return null;
  }
  catch(error){
    throw error
  }
       
}

export default ProviderDetails