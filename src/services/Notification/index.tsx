import api from "../api";


export const GetAdminNotification=async ()=>{
    try{
        const responce=await api.get(`/Notification/notification?recipienttype=Admin`)
        if(responce && responce.data && responce.data.result){
            return responce.data.result
        }
        return null;
    }
    catch(error){
        throw error;
    }
}

export const clearallnotification=async ()=>{
    try{
        const responce=await api.put(`/Notification/clear`)
        if(responce && responce.data && responce.data.result){
            return responce.data.result
        }
        return null;
    }
    catch(error){
        throw error;
    }
}