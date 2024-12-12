import React from 'react';
import { Box } from '@mui/material';
import { StyledHead, StyledTable, StyledTd } from '../../atoms/table';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';

interface Provider {
  email:string;
  certificate:string;
  username: string;
  is_certificate_verified: boolean;
  id:string
}

interface VerificationtableProps {
  provider: Provider[];
}

const Verificationtable: React.FC<VerificationtableProps> = ({ provider }) => {
  const filteredData=provider.filter((item)=>!item.is_certificate_verified);
  const handleViewCertificate=(certificate:string)=>{
    window.open(certificate,"_self");
  }
  return (
    <Box>
      <StyledTable>
        <thead>
          <tr>
            <StyledHead>vendor_name</StyledHead>
            <StyledHead>Vendor_id</StyledHead>
            <StyledHead>Email</StyledHead>
            {/* <StyledHead>Location</StyledHead> */}
            <StyledHead>Health Certificate</StyledHead>
            <StyledHead>Action</StyledHead>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((vendor) => (
            <tr >
              <StyledTd>{vendor.username}</StyledTd>
              <StyledTd>{vendor.id}</StyledTd>
              <StyledTd>{vendor.email}</StyledTd>
              <StyledTd><VisibilityIcon 
              style={{cursor:'pointer'}}
              onClick={()=>handleViewCertificate(vendor.certificate)}
              /></StyledTd>
              <StyledTd>
                <CheckCircleOutlineIcon />
                <DangerousOutlinedIcon />
              </StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Box>
  );
};

export default Verificationtable;
