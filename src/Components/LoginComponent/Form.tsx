import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Input from "../../Atoms/Input";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { CustomeButton } from "../../Atoms/Button";

interface LoginFormData {
  formData: {
    email: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: {
    password?: string;
    email?: string;
  };
  loading: any;
}

const LoginFormComponent: React.FC<LoginFormData> = ({
  formData,
  handleChange,
  handleSubmit,
  errors,
  loading,
}) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <Box>
      <Typography variant="h5">Admin Login</Typography>
      <br></br>
      <Typography variant="body2" color="textSecondary">
        {" "}
        If you are already a member, log in with your email address and
        password.
      </Typography>
      <br></br>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          fullWidth
        ></Input>
        <Typography variant="body2" color="error">
          {errors.email}
        </Typography>
        <Box sx={{ position: "relative" }}>
        <Input
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type={passwordVisible ? "text" : "password"}
          fullWidth
        >
          
        </Input>
        <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </Box>
                </Box>

       
        <Typography variant="body2" color="error">
          {errors.password}
        </Typography>

        <CustomeButton
          variant="contained"
          fullWidth
          type="submit"
          disabled={loading}
        >
          {loading ? "loading" : "login"}
        </CustomeButton>
      </form>

    </Box>
  );
};

export default LoginFormComponent;
