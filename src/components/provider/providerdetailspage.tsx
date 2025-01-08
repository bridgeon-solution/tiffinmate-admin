import React from "react";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { StyledTable } from "../../atoms/table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
import { ProviderDetails, ProviderMenus } from "../../services/provider";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import BasicModal from "../../atoms/modal";
import Providerreview from "./providerreview";

interface ProviderDetails {
  username: string;
  email: string;
  address: string;
  phone_no: string;
  image: string;
  resturent_name: string;
}
interface ProviderMenu {
  food_name: string;
  price: number;
  menu_name: string;
  category_name: string;
  image: string;
}

const Providerdetailspage: React.FC = () => {
  const location = useLocation();
  const provider = location.state;
  const [providerDetails, setProviderDetails] =
    useState<ProviderDetails | null>(null);
  const [providerMenu, setProviderMenu] = useState<ProviderMenu[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(
    null
  );
  const { id } = useParams();
  if (!provider) {
    return <div>No provider details available</div>;
  }

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const response = await ProviderDetails(id || "");

        if (response && response.result) {
          setProviderDetails(response.result);
        }
      } catch (error) {
        toast.error("error fetching details of users");
      }
    };
    fetchProviderDetails();
  }, [id]);

  useEffect(() => {
    const fetchMenuDetails = async () => {
      try {
        const response = await ProviderMenus(id || "");

        if (response && response.result) {
          setProviderMenu(response.result);
        }
      } catch (error) {
        toast.error("error fetching details of users");
      }
    };
    fetchMenuDetails();
  }, [id]);
  

  const handleViewCertificate = (certificate: string) => {
    window.open(certificate, "_self");
  };

  const handleDetails = (id: string) => {
    setSelectedProviderId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProviderId(null);
  };

  return (
    <Box sx={{ padding: 4, minHeight: "100vh" }} mt={3}>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#FF9431" }}>
        Vendor Management
      </Typography>
      <br />
      <Box
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          {provider.user_name}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={2} display="flex" justifyContent="center">
            <img
              src={providerDetails?.image}
              alt="profile"
              style={{ width: "80%",  height: "70%", borderRadius: "50%" }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={10}>
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                padding: 2,
              }}
            >
              <Typography variant="h6">
                <strong>Personal information:</strong>
              </Typography>
              <br />
              <Grid
                display="flex"
                direction="row"
                justifyContent="space-between"
              >
                <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" color="#808080" sx={{ marginBottom: 1 }}>
                <strong>Name:</strong>
                <br /> {provider.user_name}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" color="#808080" sx={{ marginBottom: 1 }}>
                <strong>Email:</strong>
                <br />
                <span style={{ wordWrap: "break-word" }}>{provider.email}</span>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body1" color="#808080">
                <strong>Phone No:</strong>
                <br /> +91 {providerDetails?.phone_no}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} display="flex" alignItems="center">
              <Button
                sx={{ cursor: "pointer" }}
                onClick={() => handleDetails(id || "")}
              >
                Reviews
              </Button>
            </Grid>
            </Grid>
              </Grid>
              <br />
              
               <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body1" color="#808080">
                <strong>Address:</strong>
                <br /> {providerDetails?.address}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body1" color="#808080">
                <strong>Service Area:</strong>
                <br /> {providerDetails?.address}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body1" color="#808080">
                <strong>Restaurant Name:</strong>
                <br /> {providerDetails?.resturent_name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} display="flex" alignItems="center">
              <Typography variant="body1" color="#808080">
                <strong>Health Certification:</strong>
                <br />
                <RemoveRedEyeOutlinedIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleViewCertificate(provider.certificate)}
                  sx={{ color: "#6464FF" }}
                />
              </Typography>
            </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          marginTop: 4,
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          height: "20",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Menu:
        </Typography>
        <Box sx={{ overflow: "auto" }}>
          <StyledTable>
            <thead>
              <th>ITEMS</th>
              <th>CATEGORY</th>
              <th>PRICE</th>

              <th>VEG/NON-VEG</th>
            </thead>
            <tbody>
              {providerMenu.length > 0
                ? providerMenu.map((item) => (
                    <tr>
                      <td>
                        {item.food_name}
                        <Avatar
                          src={item.image}
                          sx={{ height: "50px", width: "50px", marginBottom: 3 }}
                        ></Avatar>
                      </td>
                      <td>{item.category_name}</td>
                      <td>{item.price}</td>
                      <td>{item.category_name}</td>
                    </tr>
                  ))
                : "No food item founded"}
            </tbody>
          </StyledTable>
        </Box>
      </Box>
      {openModal && selectedProviderId && (
        <BasicModal open={openModal} handleClose={handleCloseModal}>
          <Providerreview
            providerId={selectedProviderId}
            handleClose={handleCloseModal}
          />
        </BasicModal>
      )}
    </Box>
  );
};

export default Providerdetailspage;
