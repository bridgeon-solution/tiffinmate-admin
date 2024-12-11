
import { Box } from '@mui/material'
import { StyledHead, StyledTable, StyledTd } from '../../atoms/table'
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';

const Verificationtable = () => {
  return (
    <Box>
        <StyledTable>
            <thead>
            <tr>
                <StyledHead>vendor_name</StyledHead>
                <StyledHead>Vendor_id</StyledHead>
                <StyledHead>Email</StyledHead>
                <StyledHead>location</StyledHead>
                <StyledHead>health certificate</StyledHead>
                <StyledHead>action</StyledHead>
                
            </tr>
            </thead>
            <tbody>
            <tr>
           <StyledTd>manoj</StyledTd>
           <StyledTd>manoj</StyledTd>
           <StyledTd>manoj</StyledTd>
           <StyledTd>manoj</StyledTd>
           <StyledTd><VisibilityIcon/></StyledTd>
           <StyledTd><CheckCircleOutlineIcon/><DangerousOutlinedIcon /></StyledTd>
           
            </tr>
            </tbody>
           
    </StyledTable>
      
   </Box>
  )
}

export default Verificationtable
