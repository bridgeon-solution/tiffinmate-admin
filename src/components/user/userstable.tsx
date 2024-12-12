import { Box } from '@mui/material'
import { StyledHead, StyledTable, StyledTd } from '../../atoms/table'
import VisibilityIcon from '@mui/icons-material/Visibility';


const Usertable = () => {
    return (
      <Box>
          <StyledTable>
              <thead>
              <tr>
                  <StyledHead>Name</StyledHead>
                  <StyledHead>User_id</StyledHead>
                  <StyledHead>Email_addres</StyledHead>
                  <StyledHead>Subscription_status</StyledHead>
                  <StyledHead>User_status</StyledHead>
                    <StyledHead> details</StyledHead>
                  
              </tr>
              </thead>
              <tbody>
              <tr>
             <StyledTd>manoj</StyledTd>
             <StyledTd>111</StyledTd>
             <StyledTd>manoj</StyledTd>
             <StyledTd>Active</StyledTd>
             <StyledTd>Bloked</StyledTd>
             <StyledTd><VisibilityIcon/></StyledTd>

            
             
              </tr>
              </tbody>
             
      </StyledTable>
        
     </Box>
    )
  }
  
  export default Usertable
  