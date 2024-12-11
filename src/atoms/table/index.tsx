import { styled } from "@mui/material/styles";


export const StyledTable=styled("table")`
    width:100%;
    border-collapse: collapse;
margin-top: 16px;

& th, & td{
border: 1px solid #ccc;
padding: 8px;
text-align: left;
}
& th{
    background-color:#f5f5f5;
    font-weight:bold;
}
    & tbody tr:nth-of-type(even) {
    background-color: #f9f9f9; 
  }
`;

export const StyledHead= styled("th")`
 ;`;    

 export const StyledTd=styled("td")`
 color:#333;`;