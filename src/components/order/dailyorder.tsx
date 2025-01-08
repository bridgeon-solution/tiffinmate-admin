import React from 'react'
import { Box,Grid,MenuItem,Typography } from '@mui/material'
import { StyledTable } from '../../atoms/table'
import { StyledSearchBar } from '../../atoms/search'
import { StyledInputBase } from '../../atoms/search'
import { StyledSearchButton } from '../../atoms/search'
import FilterBox from "../../atoms/filtrer";
import SearchIcon from "@mui/icons-material/Search";
import { SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import PaginationRounded from '../../atoms/pagination'
import {Tooltip,IconButton,Select} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";




interface Order {
  
  city: string;
  user: string;
  provider: string;
  total_price: boolean;
  start_date:string;
  order_id:string;
}
interface OrderTableProps {
  order: Order[];
  handlePageChange: (page: number) => void;
  handleSelectChange: (event: SelectChangeEvent<number>) => void;
  exportToExcel:()=>void;
  setSearch: (search: string) => void;
  setFilter: (filter: string) => void;
  totalOrders: number;
  selectedValue: number;
  onOpenModal: (orderId: string) => void;
}



const Dailyorder:React.FC<OrderTableProps> = ({
  order,
  handlePageChange,
  setFilter,
  setSearch,
  totalOrders,
  handleSelectChange,
  exportToExcel,
  onOpenModal,
  selectedValue}) => {

 const [status, setStatus] = useState<string>("");
  const [_, setSearchQuery] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    setFilter(newStatus);
  };

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const newSearch = e.target.value;
       setSearch(newSearch);
       setSearchQuery(newSearch);
     };
    

    const options = [
        { value: "newest", label: "Newest" },
        { value: "oldest", label: "Oldest" },
      ];

      let totalPage = 0;
  if (totalOrders % selectedValue == 0) {
    totalPage = totalOrders / selectedValue;
  } else {
    totalPage = Math.ceil(totalOrders / selectedValue);
  }
 

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: { xs: 2, sm: 4 },
        marginTop: { xs: 4, sm: 6 },
        boxShadow: 2,
        borderRadius: "20px",
        overflowX: "auto",
      }}
    >
        <StyledTable>
        <thead>
          <tr>
            <th colSpan={5}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                sx={{ flexWrap: "wrap", padding: "10px 0" }}
                marginBottom={4}
              >
                <Grid item xs={12} sm="auto">
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "#FF9431",
                      marginBottom: { xs: 2, sm: 0 },
                    }}
                  >
                    Daily Orders
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm="auto"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  <StyledSearchBar
                    sx={{
                      mr: 4,
                      px: 6,
                      borderRadius: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <StyledInputBase
                      placeholder="Search "
                      inputProps={{ "aria-label": "search" }}
                      onChange={handleSearchChange}
                    />
                    <StyledSearchButton type="button" aria-label="search">
                      <SearchIcon />
                    </StyledSearchButton>
                  </StyledSearchBar>

                  <FilterBox
                    label="Short By"
                    value={status}
                    onChange={handleChange}
                    options={options}
                    fullWidth={true}
                  ></FilterBox>
                  <Tooltip title="Download">
                  <IconButton color="primary" onClick={exportToExcel}>
                    <DownloadIcon/>
                  </IconButton>
                </Tooltip>
                </Grid>
              </Grid>
            </th>
          </tr>

          <tr>
            <th>Customer Name</th>
            <th>Total Price</th>
            <th>Provider name</th>
            <th>Status</th>
            <th>details</th>
          </tr>
        </thead>
        <tbody>
          {order.length > 0 ? (
            order.map((od) => (
              <tr>
                <td>{od.user}</td>
                <td>{od.total_price}</td>
                <td>{od.provider}</td>
                <td><span style={{color:"red"}}>Proccesing</span></td>
                <td><RemoveRedEyeOutlinedIcon sx={{cursor:"pointer"}} onClick={() => onOpenModal(od.order_id)}/></td>
                
              </tr>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No items found
            </Typography>
          )}
        </tbody>
        </StyledTable>

        <Box display="flex" gap={4} alignItems="center" mt={2}>
        <PaginationRounded
          totalPages={totalPage}
          onPageChange={handlePageChange}
        />
        <Box display="flex" alignItems="center" gap={1}>
          <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
            Show:
          </Typography>
          <Select
            value={selectedValue}
            onChange={handleSelectChange}
            displayEmpty
            sx={{
              width: "150px",
              height: "35px",
              backgroundColor: "#f9f9f9",
              border: "1px solid #ccc",
              borderRadius: "8px",
              textAlign: "center",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <MenuItem value="" disabled>
              Select Rows
            </MenuItem>
            {Array.from({ length: totalOrders }, (_, index) => (
              <MenuItem key={index} value={index + 1}>
                {index + 1} rows
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
        </Box>
  )
}

export default Dailyorder
