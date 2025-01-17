
import { Card, CardContent,  Grid, Typography } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';


interface Notification {
  title: string;
  message: string;
  isRead?: boolean;
}
interface NotificationListProps{
  notifications:Notification[];
}

const AdminNotifications:React.FC<NotificationListProps> = ({notifications}) => {
 
  return (
    <div style={{ padding: '20px' }}>
    <Typography variant="h4" gutterBottom style={{ textAlign: 'center',color:'#FF9431' }}>
      Notifications
    </Typography>
    <Grid container spacing={2} direction="column">
      {notifications.map((notification, index) => (
        <Grid item key={index}>
          <Card
            variant="outlined"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '5px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
            }}
          >
            <CardContent style={{ flex: '1' }}>
            <NotificationsActiveIcon/>
              <Typography variant="h5" color="#e6852c" gutterBottom>
                {notification.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {notification.message}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
  );
};

export default AdminNotifications;