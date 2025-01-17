import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useState } from 'react'
import { GetAdminNotification } from '../../services/Notification';
import { toast } from 'react-toastify';
import AdminNotifications from '../../components/notification';


interface Notification {
    title:string;
    message:string;
    isRead:boolean;
}
const AdminNotificationContainer  = () => {
    const [connection,setConnection]=useState<HubConnection | null>(null)
    const [Notification,setNotifications]=useState<Notification[]>([])

    const loadNotification=async()=>{
        try{
       const data=await GetAdminNotification();
       setNotifications(data)

        }
        catch(err){
            throw err;
        }
    }

    useEffect(()=>{
        loadNotification();
        const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7009/adminHub', {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
    },[]);

    useEffect(() => {
        if (connection) {
          connection
            .start()
            .then(() => {
              
    
             
              connection.on('ReceiveMessage', (title: string, message: string) => {
                
                
                setNotifications((prevNotifications: Notification[]) => [
                    ...prevNotifications,
                    { title, message,isRead:false },
                  ]);;
    
               
                toast.info(`${message}`);
              });
            })
            .catch((err : Error) =>{
                throw new Error(err.message);
            }
            );
        }
    
        return () => {
            if (connection) {
              connection.stop().catch(err => console.error('Error stopping connection:', err));
            }
          };
      }, [connection]);

  return (
    <AdminNotifications notifications={Notification}/>
  )
}

export default AdminNotificationContainer;
