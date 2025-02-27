import React, { useEffect, useState } from "react";
import { Typography, Grid, Box, Divider } from "@mui/material";
import { UserDetailsById } from "../../Services/UserService";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

interface User {
  email: string;
  phone: string;
  name: string;
  is_blocked: boolean;
  address: string;
  city: string;
  image: string;
  subscription_status: boolean;
  created_at: Date | any;
}

interface UserDetailsProps {
  userId: string;
  handleClose: () => void;
}

const Userdetails: React.FC<UserDetailsProps> = ({ userId, handleClose }) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await UserDetailsById(userId);
        if (response && response.result) {
          setUserDetails(response.result);
        }
      } catch (error) {
        toast.error("error fetching details of users");
      }
    };
    fetchUserDetails();
  }, [userId]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        {/* image section */}

        <Box>
          <img></img>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Your Name
            </Typography>
            <Typography variant="body2" color="#6B7280  ">
              <strong> {userDetails?.email}</strong>
            </Typography>
          </Box>
        </Box>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
      </Box>
      <Divider />

      {/* personal information */}

      <Grid container spacing={2} mt={2} display="flex" direction="column">
        <Grid item xs={12} sm={6} marginBottom={5}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Personal Information:
          </Typography>
          <Grid display="flex" direction="row" justifyContent="space-between">
            <Typography variant="body2" mb={2} color="#6B7280">
              Name:
              <br />
              <strong>{userDetails?.name}</strong>
            </Typography>
            <Typography variant="body2" color="#6B7280">
              Email:
              <br />
              <strong> {userDetails?.email}</strong>
            </Typography>
            <Typography variant="body2" color="#6B7280">
              Phone No:
              <br />
              <strong>+91 {userDetails?.phone}</strong>
            </Typography>
          </Grid>
          <Typography variant="body2" color="#6B7280">
            Address:
            <br />
            <strong>{userDetails?.address}</strong>
          </Typography>
        </Grid>
        <Divider />

        {/* Account information */}

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Account Information:
          </Typography>
          <Grid display="flex" justifyContent="space-between">
            <Typography variant="body2" mb={2} color="#6B7280">
              Account Status:
              <br />
              <span>
                <strong>
                  {userDetails?.is_blocked ? (
                    <span style={{ color: "red" }}>In Active</span>
                  ) : (
                    <span style={{ color: "green" }}>Active</span>
                  )}
                </strong>
              </span>
            </Typography>
            <Typography variant="body2" color="#6B7280">
              Last Login:
              <br />
              <span style={{ color: "red" }}>
                <strong>10 min</strong>
              </span>
            </Typography>
            <Typography variant="body2" color="#6B7280">
              Subscription Status:
              <br />
              <span>
                <strong>
                  {userDetails?.subscription_status ? (
                    <span style={{ color: "green" }}>Active</span>
                  ) : (
                    <span style={{ color: "red" }}>In Active</span>
                  )}
                </strong>
              </span>
            </Typography>
          </Grid>
          <Typography variant="body2" color="#6B7280" mb={2}>
            Registration Date:
            <br />
            <strong> {new Date(userDetails?.created_at).toLocaleDateString()}{" "}
            </strong>
          </Typography>
        </Grid>
        <Divider />

        {/* subscription information */}

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Current Subscription:
          </Typography>
          <Grid display="flex" direction="row" justifyContent="space-between">
            <Typography variant="body2" mb={2} color="#6B7280">
              Plan:
              <br />
              <strong>monthly</strong>
            </Typography>
            <Typography variant="body2" color="#6B7280">
              Start Date:
              <br />
              
              <strong> 10/01/2022</strong>
            </Typography>
            <Typography variant="body2" color="#6B7280">
              Remaining Days:
              <br />
              <strong style={{ color: "red" }}>23 days left</strong>
            </Typography>
          </Grid>
          <Typography variant="body2" color="#6B7280">
            Payment Status:
            <br />
            <strong>
              2000-<span style={{ color: "green" }}>paid</span>
            </strong>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Userdetails;
