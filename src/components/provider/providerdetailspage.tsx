import React from 'react'
import { Box, Grid, Typography } from '@mui/material';
import { StyledTable } from '../../atoms/table';
import { useEffect ,useState} from 'react';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';
import { ProviderDetails } from '../../services/provider';
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";



interface ProviderDetails{
    username:string,
    email:string,
    address:string,
    phone_no:string,
    image:string,
    resturent_name:string
}

const Providerdetailspage:React.FC= () => {
    const location=useLocation();
    const provider=location.state;
    const [userDetails, setUserDetails] = useState<ProviderDetails | null>(null);
    const {id}=useParams();
    if(!provider){
      return<div>No provider details available</div>
    }

useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await ProviderDetails(id||"");
        
        if(response&&response.result){
          setUserDetails(response.result);
        }  
      } catch (error) {
        toast.error("error fetching details of users")
      }
    };
    fetchUserDetails();
  }, [id]);
  const handleViewCertificate=(certificate:string)=>{
    window.open(certificate,"_self")
  }

  return (
   <Box sx={{ padding: 4, minHeight: "100vh" ,}}mt={3}>
    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#FF9431"}}>
        Vendor Management
    </Typography><br/>
    <Box sx={{
        
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          {provider.user_name}:
        </Typography>
        <Grid container spacing={3} >
            <Grid item xs={12} sm={2}>
          <img src={userDetails?.image} alt="profile" style={{width:"80%",height:"80%",borderRadius:"50%"}}/>
            </Grid>
            <Grid item xs={12} sm={10}>
                <Box sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                padding: 2}}>
                  <Typography variant="h6" >
                <strong>Personal information:</strong> 
              </Typography><br/>
                  <Grid display="flex" direction="row" justifyContent="space-between">
                    <Typography variant="body1" color='#808080'>
                <strong>Name:</strong><br/> {provider.user_name}
              </Typography>
              <Typography variant="body1" color='#808080'>
                <strong>Email:</strong> <br/>{provider.email}
              </Typography>
              <Typography variant="body1" color='#808080'>
                <strong>Phone No:</strong><br/> +91 {userDetails?.phone_no}
              </Typography>
              </Grid><br/>
              <Grid display="flex" direction="row" justifyContent="space-between">
              <Typography variant="body1" color='#808080'>
                <strong>Address:</strong><br/> {userDetails?.address}
              </Typography>
              <Typography variant="body1" color='#808080'>
                <strong>Service Area:</strong> <br/> {userDetails?.address}
              </Typography>
              <Typography variant="body1" color='#808080'>
                <strong>Restaurant Name:</strong> <br/> {userDetails?.resturent_name}
              </Typography> 
              <Typography variant="body1" color='#808080'>
                <strong>Health Certification:</strong><br/>
              
                <RemoveRedEyeOutlinedIcon style={{ cursor: "pointer" }}
                  onClick={() => handleViewCertificate(provider.certificate)} sx={{color:"#6464FF"}}/>
              </Typography>
              </Grid>

                </Box>
            </Grid>

        </Grid>
</Box>

<Box  sx={{
          marginTop: 4,
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          height:"20"
        }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Menu:
        </Typography>
        <Box sx={{overflow:"auto"}}>
        <StyledTable >
            <thead>

            <th>ITEMS</th>
            <th>CATEGORY</th>
            <th>PRICE</th>
            <th>AVAILABILITY</th>
            <th>VEG/NON-VEG</th>
            </thead>
            <tbody>
                <tr>
                <td>hdgg</td>
                </tr>
                
                
            </tbody>
        </StyledTable>
        </Box>

</Box>
   </Box>
  )
}

export default Providerdetailspage
