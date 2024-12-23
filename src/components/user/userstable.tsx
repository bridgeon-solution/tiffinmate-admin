import React, { useState } from "react";
import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { StyledTable } from "../../atoms/table";
import FilterBox from "../../atoms/filtrer";
import {
  StyledSearchBar,
  StyledInputBase,
  StyledSearchButton,
} from "../../atoms/search";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PaginationRounded from "../../atoms/pagination";

interface User {
  email: string;
  name: string;
  is_blocked: boolean;
  id: string;
}

interface UserTableProps {
  user: User[];
  handleBlockUnblock: (id: string) => void;
  handlePageChange: (page: number) => void;
  setSearch: (search: string) => void;
  setFilter: (filter: string) => void;
  handleDetails: (id: string) => void;
  totalProviders:number
}

const Usertable: React.FC<UserTableProps> = ({
  user,
  handleBlockUnblock,
  handlePageChange,
  setSearch,
  setFilter,
  handleDetails,
  totalProviders
}) => {
  const [status, setStatus] = useState<string>("");
  const [_, setSearchQuery] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    setFilter(newStatus);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    setSearch(newSearchQuery);
  };

  let totalPage=5
 if(totalProviders%3==0){
   totalPage=totalProviders/3

 }
 else{
  totalPage=Math.ceil(totalProviders/3)

 }


  const options = [
    { value: "true", label: "Blocked" },
    { value: "false", label: "Active" },
    { value: "all", label: "All Users" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: 4,
        borderRadius: "20px",
        marginTop: 6,
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
                    User Management
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
                    mr: 8,
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
                      sx={{
                        width: "100%",
                        flexGrow: 1,
                        marginRight: "8px",
                      }}
                    />
                    <StyledSearchButton
                      type="button"
                      aria-label="search"
                      sx={{ minWidth: "auto", padding: "8px" }}
                    >
                      <SearchIcon />
                    </StyledSearchButton>
                  </StyledSearchBar>
                  <FilterBox
                    label="FilterBy"
                    value={status}
                    onChange={handleChange}
                    options={options}
                    fullWidth={true}
                  ></FilterBox>
                </Grid>
              </Grid>
            </th>
          </tr>
          <tr>
            <th>Name</th>
            <th>User Id</th>
            <th>Email Address</th>
            <th>User Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {user.length > 0 ? (
            user.map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.name}</td>
                <td>{vendor.id}</td>
                <td>{vendor.email}</td>
                <td>
                  <button
                    onClick={() => handleBlockUnblock(vendor.id)}
                    style={{
                      color: vendor.is_blocked ? "red" : "green",
                      backgroundColor: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    {vendor.is_blocked ? (
                      <Typography fontWeight="bold">Blocked</Typography>
                    ) : (
                      <Typography fontWeight="bold">Active</Typography>
                    )}
                  </button>
                </td>
                <td>
                  <RemoveRedEyeOutlinedIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleDetails(vendor.id)} 
                  />
                </td>
              </tr>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No items found
            </Typography>
          )}
        </tbody>
      </StyledTable>
      <PaginationRounded totalPages={totalPage} onPageChange={handlePageChange} />
    </Box>
  );
};

export default Usertable;
