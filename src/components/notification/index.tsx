import { Card, CardContent, Grid, Typography } from '@mui/material';

interface Notification {
  title: string;
  message: string;
  isRead?: boolean;
}

interface NotificationListProps {
  notification?: Notification[];
  onClear: () => void;
}

const AdminNotifications: React.FC<NotificationListProps> = ({
  notification=[],
  onClear,
  
}) => {
  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ textAlign: 'center', color: '#FF9431' }}
      >
        Notifications
      </Typography>
      {notification.length > 0 && (
        <Typography
          onClick={onClear}
          style={{
            position: 'absolute',
            top: 50,
            right: 30,
            color: '#FF9431',
            textDecoration: 'none',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          Clear All
        </Typography>
      )}
      <Grid container spacing={2} direction="column">
        {notification.length > 0 ? (
          notification
            .slice()
            .reverse()
            .map((notification, index) => (
              <Grid item key={index}>
                <Card
                  variant="outlined"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
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
            ))
        ) : (
          <Typography
            variant="h6"
            style={{
              textAlign: 'center',
              color: '#777',
              marginTop: '20px',
              
            }}
          >
            No new notifications
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default AdminNotifications;
