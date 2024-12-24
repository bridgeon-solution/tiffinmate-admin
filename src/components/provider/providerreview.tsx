import React from "react";
import { useState, useEffect } from "react";
import { ProviderReviews } from "../../services/provider";
import { toast } from "react-toastify";
import { Box, Grid, Typography, Avatar } from "@mui/material";
import { Card } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ProviderDetailsProps {
  providerId: string;
  handleClose: () => void;
}

interface Review {
  username: string;
  review: string;
  image: string;
  id: string;
  created_at: Date;
}

const Providerreview: React.FC<ProviderDetailsProps> = ({
  providerId,
  handleClose,
}) => {
  const [reviewDetails, setReviewDetails] = useState<Review[]>([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await ProviderReviews(providerId);
        if (response && response.result) {
          setReviewDetails(response.result);
        }
      } catch (error) {
        toast.error("error fetching reviews of users");
      }
    };
    fetchUserDetails();
  }, [providerId]);
  console.log(reviewDetails);

  return (
    <Grid container spacing={3}>
      <CloseIcon
        sx={{
          position: "absolute",
          top: 20,
          right: 30,
          fontSize: 25,
          cursor: "pointer",
        }}
        onClick={handleClose}
      />
      {reviewDetails.length > 0 ? (
        reviewDetails.map((reviews) => (
          <Grid item xs={12} sm={6} md={4} key={reviews.id}>
            <Card
              sx={{
                maxWidth: 350,
                boxShadow: 3,
                borderRadius: 2,
                padding: 2,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 8,
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={reviews.image}
                  alt={"user"}
                  sx={{
                    width: 80,
                    height: 80,
                    marginRight: 2,
                  }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {reviews.username}
                  </Typography>

                  {reviews.created_at && (
                    <Typography variant="body2" color="text.secondary">
                      {new Date(reviews.created_at).toLocaleDateString()}{" "}
                      {/* Formats the date */}
                    </Typography>
                  )}
                  <Typography variant="body2">"{reviews.review}"</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="body2">No reviews added</Typography>
      )}
    </Grid>
  );
};

export default Providerreview;
