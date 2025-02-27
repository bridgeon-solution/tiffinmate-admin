import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { StyledTable } from '../../Atoms/Table';
import { GetOrderDetails } from '../../Services/OrderService';
import { toast } from 'react-toastify';

interface OrderDetailsProps {
  orderId: string | null;
}

interface Details {
  foodItemName: string;
  foodItemImage: string;
  category: string;
}

interface OrderInfo {
  order_id: string;
  menu_id: string;
  provider_id: string;
  user_id: string;
  details: Details[];
}
const Orderdetails: React.FC<OrderDetailsProps> = ({ orderId }) => {

 const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return; 
      try {
        const res = await GetOrderDetails(orderId);
        if (res && res.result) {
          setOrderInfo({
            order_id: res.result.order_id,
            menu_id: res.result.menu_id,
            provider_id: res.result.provider_id,
            user_id: res.result.user_id,
            details: res.result.details || [],
          });
        }
      } catch (error) {
        toast.error('Error fetching order details');
      }
    };

    fetchOrderDetails();
  }, [orderId]);
  
  

  return (
    <>
      <Box>
      {orderInfo ? (
        <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 2,
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          borderLeft: '5px solid #1976d2', 
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" sx={{ color: '#333', marginBottom: 1 }}>
          Order Information
        </Typography>
        <Typography sx={{ fontSize: '14px', color: '#555' }}>
          <strong style={{ color: '#1976d2' }}>Order ID:</strong> {orderInfo.order_id}
        </Typography>
        <Typography sx={{ fontSize: '14px', color: '#555' }}>
          <strong style={{ color: '#1976d2' }}>Menu ID:</strong> {orderInfo.menu_id}
        </Typography>
        <Typography sx={{ fontSize: '14px', color: '#555' }}>
          <strong style={{ color: '#1976d2' }}>Provider ID:</strong> {orderInfo.provider_id}
        </Typography>
        <Typography sx={{ fontSize: '14px', color: '#555' }}>
          <strong style={{ color: '#1976d2' }}>User ID:</strong> {orderInfo.user_id}
        </Typography>
      </Paper>
      
      ) : (
        <Typography>Loading order information...</Typography>
      )}
         {orderInfo?.details.length ? (
          <StyledTable>
            <thead>
              <tr>
                <th>Food Item</th>
                <th>Food Name</th>
                <th>Category</th>
                
              </tr>
            </thead>
            <tbody>
            {orderInfo.details.map((detail, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={detail.foodItemImage}
                      alt={detail.foodItemName}
                      style={{ width: '50px', height: '50px' }}
                    />
                  </td>
                  <td>{detail.foodItemName}</td>
                  <td>{detail.category}</td>
                  
                </tr>
              ))}
            </tbody>
          </StyledTable>
        ) : (
          <Typography>Loading order details...</Typography>
        )}
      </Box>
    </>
  );
};

export default Orderdetails;
