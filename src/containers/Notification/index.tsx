import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import { clearallnotification, GetAdminNotification } from '../../services/Notification';
import { toast } from 'react-toastify';
import AdminNotifications from '../../components/notification';

interface Notification {
    title: string;
    message: string;
    isRead: boolean;
}

const AdminNotificationContainer:React.FC<{setUnreadCount: React.Dispatch<React.SetStateAction<number>>; }> =({setUnreadCount })  => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [Notifications,setNotifications]=useState<Notification[]>([]);

    const HUBURL= import.meta.env.VITE_HUB_URL;

    const loadNotification = async () => {
        try {
            const data = await GetAdminNotification();
            setNotifications(data);
            const unread = data.filter((notif) => !notif.isRead).length;
            setUnreadCount(unread);
        } catch (err) {
            throw err;
        }
    };

    const handleClearAll = async () => {
        try {
            await clearallnotification();
            setNotifications([]); 
            setUnreadCount(0);
        } catch (err) {
           throw err;
        }
    };

    const handleIsReadNotication=(index:number)=>{
         const updatedNotification=[...Notifications];
         updatedNotification[index].isRead = true;
         setUnreadCount((prev) => Math.max(prev - 1, 0));
         setNotifications(updatedNotification);
    }

    useEffect(() => {
        loadNotification(); 
        if (!connection) {
            const newConnection = new HubConnectionBuilder()
                .withUrl(HUBURL, {
                    withCredentials: true,
                })
                .configureLogging(LogLevel.Information)  
                .withAutomaticReconnect()
                .build();

            setConnection(newConnection);  
            newConnection
                .start()
                .then(() => {
                    
                    newConnection.on('ReceiveMessage', (title: string, message: string) => {
                        setNotifications((prevNotifications: Notification[]) => [
                            ...prevNotifications,
                            { title, message, isRead: false },
                        ]);
                        setUnreadCount((prev) => prev + 1);
                        toast.info(`${message}`);
                    });
                })
                .catch((err: Error) => {
                   throw err
                    
                });

            return () => {
                
                newConnection.stop().catch((err: Error) => {throw err});
            };
        }
    }, []); 

    return (
        <AdminNotifications notification={Notifications} onClear={handleClearAll} setIsRead={handleIsReadNotication} />
    );
};

export default AdminNotificationContainer;

