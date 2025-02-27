import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'

interface FilterBoxProps{
    label:string,
    value:string,
    onChange:(Event:SelectChangeEvent)=>void,
    options:{value:string|number,label:string}[],
    fullWidth:boolean
    
}

const FilterBox:React.FC<FilterBoxProps> = ({fullWidth=true,label,value,onChange,options}) => {
  return (
  <FormControl fullWidth={fullWidth}sx={{
    backgroundColor: "#F9FBFF", 
    borderRadius: '12px', 
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
    '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, 
    '& .MuiSelect-select': {
      padding: '12px 12px',
      fontSize: '16px',
      fontWeight: '500',
       textAlign: 'center'
    },
  }}>
    <InputLabel id={`${label}-label `}sx={{
      color:"#B5B7C0",
          textAlign: 'center',
          width: '100%',
        paddingBottom:"20px"
        }}>{label}</InputLabel>
    <Select
    labelId={`${label}-label`}
    id={`${label}-select`}
    value={value}
    onChange={onChange}
    label={label}
    sx={{borderRadius:"12px",'&:hover':{backgroundColor:'#f5f5f5', textAlign: 'center',}}}>
        {options.map((option)=>(
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
        

    </Select>

  </FormControl>
  )
}

export default FilterBox
