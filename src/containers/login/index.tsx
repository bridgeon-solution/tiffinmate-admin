import { Grid } from '@mui/material'
import LoginImageComponent from '../../components/login/Image'
import LoginFormComponent from '../../components/login/Form'
import PostAdminLogin from '../../services/Login'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';


  
const LoginContainer:React.FC = () => {
    const formik=useFormik({
        initialValues:{
            email:"",
            password:""
        },
            validationSchema:Yup.object({
            email:Yup.string().email('invalid email').required('email is required'),
            password:Yup.string().min(6,'password must contain 6 letters').required('password required')
            }),
            onSubmit:async(values)=>{
                try{
                    await PostAdminLogin(values)
                    
                }catch(error){
                    
                }
            }
    });
    const errorDisplay={
        email:formik.touched.email&&formik.errors.email?formik.errors.email:"",
        password:formik.touched.password&&formik.errors.password?formik.errors.password:""
    }
    
   
   
  return (
    <Grid container height="100vh">
        <Grid  md={6} xs={12}>
            <LoginImageComponent/>
        </Grid>
        <Grid   md={6} xs={12} display="flex" alignItems="center"  justifyContent="center">
        <LoginFormComponent
        formData={formik.values}
        handleChange={formik.handleChange}
        handleSubmit={formik.handleSubmit}
        errors={errorDisplay}
        
        />
        </Grid>


    </Grid>
  )
}

export default LoginContainer
