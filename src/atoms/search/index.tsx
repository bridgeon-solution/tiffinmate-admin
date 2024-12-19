import { IconButton, InputBase,styled } from "@mui/material";

export const StyledSearchBar=styled("div")(()=>({
    display:"flex",
    alignItems:"center",
    backgroundColor:"#F9FBFF",
    borderRadius:"5px",
    padding:"5px 10px",
    width:"100%",
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 

}))

export const StyledInputBase=styled(InputBase)({
    flex:1
})


export const StyledSearchButton=styled(IconButton)({
    padding:"5px"
})