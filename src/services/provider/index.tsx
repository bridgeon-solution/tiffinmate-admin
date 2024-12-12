import axiosInstance from '../api';

const ProviderDetails =async () => {
    const response=await axiosInstance.get('/Provider/getallproviders')
    console.log(response.data.result)
  return response.data.result;
    
}

export default ProviderDetails