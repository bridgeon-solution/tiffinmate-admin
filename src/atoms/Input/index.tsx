import React from 'react'
import { TextField } from '@mui/material'

interface InputField{
    label:string
    name:string
    
    value:string
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    type:string
    fullWidth:boolean
}
const Input :React.FC<InputField>= ({name,value,onChange,type,fullWidth,label}) => {
  return (
    <TextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    fullWidth={fullWidth}
    type={type}
    margin='normal'
    sx={{
        "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "black", 
        },
        },
    }}
    >

    </TextField>
  )
}

export default Input
