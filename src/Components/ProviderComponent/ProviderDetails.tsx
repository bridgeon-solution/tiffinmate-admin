import React from "react";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { StyledTable } from "../../Atoms/Table";
import { useParams } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import BasicModal from "../../Atoms/Modal";
import { ProviderDetails, ProviderMenu, Transaction } from "./type";
import Providerreview from "./providerreview";

interface ProviderDetailsComponentProps {
  providerDetails: ProviderDetails;
  providerMenu: ProviderMenu[];
  handleViewCertificate: (certificate: string) => void;
  handleReviews: () => void;
  handleTransactions: () => void;
  handleCloseModal: () => void;
  openModal: boolean;
  loading: boolean;
  transactions: Transaction[];
}
const ProviderDetailsComponent: React.FC<ProviderDetailsComponentProps> = ({
  providerDetails,
  providerMenu,
  handleViewCertificate,
  handleReviews,
  handleTransactions,
  handleCloseModal,
  openModal,
}) => {
  const { id } = useParams();
  const providerId = id || "";
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
          {providerDetails?.user_name}
        </Typography>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={4}
            md={2}
            display="flex"
            justifyContent="center"
          >
            <img
              src={providerDetails?.image}
              alt="profile"
              style={{ width: "80%", height: "70%", borderRadius: "50%" }}
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
                    <Typography
                      variant="body1"
                      color="#808080"
                      sx={{ marginBottom: 1 }}
                    >
                      <strong>Name:</strong>
                      <br /> {providerDetails?.user_name}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Typography
                      variant="body1"
                      color="#808080"
                      sx={{ marginBottom: 1 }}
                    >
                      <strong>Email:</strong>
                      <br />
                      <span style={{ wordWrap: "break-word" }}>
                        {providerDetails?.email}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body1" color="#808080">
                      <strong>Phone No:</strong>
                      <br /> +91 {providerDetails?.phone_no}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    display="flex"
                    flexDirection={"column"}
                  >
                    <Grid>
                      <Button
                        sx={{ cursor: "pointer" }}
                        onClick={handleReviews}
                      >
                        Reviews
                      </Button>
                    </Grid>
                    <Grid>
                      <Button
                        sx={{ cursor: "pointer" }}
                        onClick={handleTransactions}
                      >
                        Transactions
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
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
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  display="flex"
                  alignItems="center"
                >
                  <Typography variant="body1" color="#808080">
                    <strong>Health Certification:</strong>
                    <br />
                    <RemoveRedEyeOutlinedIcon
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleViewCertificate(providerDetails?.certificate)
                      }
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
                          sx={{
                            height: "50px",
                            width: "50px",
                            marginBottom: 3,
                          }}
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
      {openModal && (
        <BasicModal open={openModal} handleClose={handleCloseModal}>
          <Providerreview
            providerId={providerId}
            handleClose={handleCloseModal}
          />
        </BasicModal>
      )}
    </Box>
  );
};

export default ProviderDetailsComponent;
