import React from 'react'
import { Box } from '@mui/material'
import img from '../../assets/svg/imgFirst 1.webp'

const LoginImageComponent :React.FC= () => {
  return (
    <Box
    style={{
        height:"100%",
        backgroundImage:`url(${img})`,
        backgroundSize:"cover",

    }}
    >   
    </Box>
  )
}

export default LoginImageComponent
