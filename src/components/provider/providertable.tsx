import React from 'react';
import { Box } from '@mui/material';
import { StyledHead, StyledTable, StyledTd } from '../../atoms/table';
import VisibilityIcon from '@mui/icons-material/Visibility';


interface Provider {
  email:string;
  username: string;
  id:string
}

interface ProviderTableProps {
  provider: Provider[];
}

const Providertable: React.FC<ProviderTableProps> = ({ provider }) => {
  
  return (
    <Box>
      <StyledTable>
        <thead>
          <tr>
            <StyledHead>vendor_name</StyledHead>
            <StyledHead>Vendor_id</StyledHead>
            <StyledHead>Email</StyledHead>
            <StyledHead>Rating</StyledHead>
            <StyledHead>Details</StyledHead>
          </tr>
        </thead>
        <tbody>
          {provider.map((vendor) => (
            <tr >
              <StyledTd>{vendor.username}</StyledTd>
              <StyledTd>{vendor.id}</StyledTd>
              <StyledTd>{vendor.email}</StyledTd>
              <StyledTd>5.5</StyledTd>
              <StyledTd>
               <VisibilityIcon/>
              </StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Box>
  );
};

export default Providertable;
