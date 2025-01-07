import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { StyledTable } from '../../atoms/table';
import { GetOrderDetails } from '../../services/order';
import { toast } from 'react-toastify';

interface OrderDetailsProps {
  orderId: string | null;
}

interface Details {
  foodItemName: string;
  foodItemImage: string;
  category: string;
  date: string;
}

const Orderdetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  const [details, setDetails] = useState<Details[] | null>(null);
 

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return; 
      try {
        const res = await GetOrderDetails(orderId);
        if (res && res.result) {
          setDetails(res.result.details);
         
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
       
        {details ? (
          <StyledTable>
            <thead>
              <tr>
                <th>Food Item</th>
                <th>Food Name</th>
                <th>Category</th>
                
              </tr>
            </thead>
            <tbody>
              {details.map((detail, index) => (
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
