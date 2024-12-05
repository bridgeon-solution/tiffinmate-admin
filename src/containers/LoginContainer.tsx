import { Grid } from '@mui/material'
import LoginImageComponent from '../components/Login/Login/LoginImageComponent'
import LoginFormComponent from '../components/Login/Login/LoginFormComponent'
import PostAdminLogin from '../services/PostAdminLogin'
import React, { useState } from 'react'


interface LoginData{
    email:string
    password:string

}
const LoginContainer:React.FC = () => {
    const[FormData,setFormData]=useState<LoginData>({email:"",password:""})
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const{name,value}=e.target;
        setFormData((prev)=>({...prev,[name]:value}))
    }
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const response=await PostAdminLogin(FormData);
            console.log(response);
        }
        catch(error){
            console.error(error);
        }
    }
  return (
    <Grid container height="100vh">
        <Grid  md={6} xs={12}>
            <LoginImageComponent/>
        </Grid>
        <Grid   md={6} xs={12} display="flex" alignItems="center"  justifyContent="center">
        <LoginFormComponent
        formData={FormData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        />
        </Grid>


    </Grid>
  )
}

export default LoginContainer
