import React, { useState } from "react";
import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { StyledTable } from "../../Atoms/Table";
import FilterBox from "../../Atoms/Filtrer";
import {
  StyledSearchBar,
  StyledInputBase,
  StyledSearchButton,
} from "../../Atoms/Search";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PaginationRounded from "../../Atoms/Pagination";
import { Select, MenuItem } from "@mui/material";

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
  totalProviders: number;
  selectedValue: number;
  handleSelectChange: (event: SelectChangeEvent<number>) => void;
}

const Usertable: React.FC<UserTableProps> = ({
  user,
  handleBlockUnblock,
  handlePageChange,
  setSearch,
  setFilter,
  handleDetails,
  totalProviders,
  selectedValue,
  handleSelectChange,
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

  let totalPage;
  if (totalProviders % selectedValue == 0) {
    totalPage = totalProviders / selectedValue;
  } else {
    totalPage = Math.ceil(totalProviders / selectedValue);
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
            {Array.from({ length: totalProviders }, (_, index) => (
              <MenuItem key={index} value={index + 1}>
                {index + 1} rows
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </Box>
  );
};

export default Usertable;
