import axiosInstance from "../api"

export const GetAdminNotification=async ()=>{
    try{
        const responce=await axiosInstance.get(`/Notification/notification?recipienttype=Admin`)
        if(responce && responce.data && responce.data.result){
            return responce.data.result
        }
        return null;
    }
    catch(error){
        throw error;
    }
}