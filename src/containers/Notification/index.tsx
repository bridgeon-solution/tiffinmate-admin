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

const AdminNotificationContainer:React.FC =()  => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [Notifications,setNotifications]=useState<Notification[]>([]);

    const HUBURL= import.meta.env.VITE_HUB_URL;

    const loadNotification = async () => {
        try {
            const data = await GetAdminNotification();
            setNotifications(data);
        } catch (err) {
            throw err;
        }
    };

    const handleClearAll = async () => {
        try {
            await clearallnotification();
            setNotifications([]); 
        } catch (err) {
           throw err;
        }
    };

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
        <AdminNotifications notification={Notifications} onClear={handleClearAll} />
    );
};

export default AdminNotificationContainer;

