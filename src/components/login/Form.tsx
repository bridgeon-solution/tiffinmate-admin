import React from 'react'
import { Box, Typography } from '@mui/material'
import {CustomeButton} from '../../atoms/button'
import Input from '../../atoms/Input'

interface LoginFormData{
    formData:{
        email:string,
        password:string
    } 
    handleChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
    handleSubmit:(e:React.FormEvent<HTMLFormElement>)=>void
    errors:{
      password?:string,
      email?:string
    }
    
}

const LoginFormComponent:React.FC <LoginFormData>= ({formData,handleChange,handleSubmit,errors}) => {
  return (
    <Box
         >
        <Typography variant='h5'>Admin Login</Typography><br></br>
        <Typography variant='body2' color='textSecondary'> If you are already a member, log in with your email address and password.</Typography><br></br>
        <form onSubmit={handleSubmit}>
            <Input label='Email Address' name='email' value={formData.email} onChange={handleChange} type='email' fullWidth  ></Input>
            <Typography variant='body2' color='error'>{errors.email}</Typography>
            <Input label='Password' name='password' value={formData.password} onChange={handleChange} type='password' fullWidth ></Input>
            <Typography  variant="body2" color="error">
              {errors.password}
            </Typography>

            <CustomeButton variant='contained'  fullWidth type='submit'>Login</CustomeButton>
        </form>
    </Box>
  )
}

export default LoginFormComponent
