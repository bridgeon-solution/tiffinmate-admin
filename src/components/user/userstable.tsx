import { Box } from '@mui/material'
import { StyledHead, StyledTable, StyledTd } from '../../atoms/table'
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useEffect } from 'react';
import { BlockUnblockUser } from '../../services/user';

interface User {
  email:string;
  name: string;
  is_blocked: boolean;
  id:string
}
interface UserTableProps {
  user: User[];
}
const Usertable:React.FC<UserTableProps> = ({user}) => {
  
    const handleBlockUnblock=(id:string)=>{
      try{
    BlockUnblockUser(id);
      
  
  }
  catch(error){
    window.alert(error);
  }
  
  }
 

    return (
      <Box>
          <StyledTable>
              <thead>
              <tr>
                  <StyledHead>Name</StyledHead>
                  <StyledHead>User_id</StyledHead>
                  <StyledHead>Email_addres</StyledHead>
                  <StyledHead>User_status</StyledHead>
                    <StyledHead> details</StyledHead>
                  
              </tr>
              </thead>
              <tbody>
             {user.map((vendor) => (
            <tr >
              <StyledTd>{vendor.name}</StyledTd>
              <StyledTd>{vendor.id}</StyledTd>
              <StyledTd>{vendor.email}</StyledTd>
              <StyledTd><button onClick={()=>handleBlockUnblock(vendor.id)}
                style={{
                  backgroundColor:vendor.is_blocked?"green":"red",
                  color:"white",
                  border:"none",
                  padding:"5px 10px",
                  cursor:"pointer"
                }}>{vendor.is_blocked?"unblock":"block"}
                </button></StyledTd>
              <StyledTd><VisibilityIcon/></StyledTd>
              
            </tr>
          ))}
              </tbody>
             
      </StyledTable>
        
     </Box>
    )
  }
  
  export default Usertable
  