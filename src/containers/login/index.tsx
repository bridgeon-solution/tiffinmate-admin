import { Grid } from "@mui/material";
import LoginImageComponent from "../../components/login/Image";
import LoginFormComponent from "../../components/login/Form";
import PostAdminLogin from "../../services/Login";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginContainer: React.FC = () => {
  const [loading, setLoadnig] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("invalid email").required("email is required"),
      password: Yup.string()
        .min(6, "password must contain 6 letters")
        .required("password required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoadnig(true);
        const response = await PostAdminLogin(values);
        if (response.data.message == "Login Successfull") {
          navigate("dashboard");
          toast.success("Admin login succesfully");
          localStorage.setItem("id",response.data.result.id)
          localStorage.setItem("token",response.data.result.token)
          localStorage.setItem("name",response.data.result.name)
          localStorage.setItem("refresh_token",response.data.result.refresh_token)
         

        } else {
          toast.warning(response.data.error_message);
        }
      } catch (error) {
        toast.error("something went wrong");
      } finally {
        setLoadnig(false);
      }
    },
  });
  const errorDisplay = {
    email:
      formik.touched.email && formik.errors.email ? formik.errors.email : "",
    password:
      formik.touched.password && formik.errors.password
        ? formik.errors.password
        : "",
  };

  return (
    <Grid container height="100vh">
      <Grid md={6} xs={12}>
        <LoginImageComponent />
      </Grid>
      <Grid
        md={6}
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <LoginFormComponent
          formData={formik.values}
          handleChange={formik.handleChange}
          handleSubmit={formik.handleSubmit}
          errors={errorDisplay}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};

export default LoginContainer;
