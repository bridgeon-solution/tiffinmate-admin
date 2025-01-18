
import { Card, CardContent,  Grid, Typography } from '@mui/material';

interface Notification {
  title: string;
  message: string;
  isRead?: boolean;
}
interface NotificationListProps{
  notifications:Notification[];
  onClear:() =>void;
}

const AdminNotifications:React.FC<NotificationListProps> = ({notifications,onClear}) => {
 
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: '#FF9431' }}>
        Notifications
      </Typography>
      <Typography
        onClick={onClear}
        style={{
          position:'absolute',
          top:60,
          right:30,
          color: '#FF9431',
          textDecoration: 'none',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Clear All
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
                opacity: notification.isRead ? 0.6 : 1, 
              }}
            >
              <CardContent style={{ flex: '1' }}>
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