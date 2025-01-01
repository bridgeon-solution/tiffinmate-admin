import React from "react";
import {
  Box,
  Grid,
  Typography,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { StyledTable } from "../../atoms/table";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import {
  StyledSearchBar,
  StyledInputBase,
  StyledSearchButton,
} from "../../atoms/search";
import SearchIcon from "@mui/icons-material/Search";
import FilterBox from "../../atoms/filtrer";
import PaginationRounded from "../../atoms/pagination";
import { useNavigate } from "react-router-dom";
import { Select } from "@mui/material";

interface Provider {
  email: string;
  user_name: string;
  id: string;
  verification_status: string;
  is_blocked: boolean;
}

interface ProviderTableProps {
  provider: Provider[];
  handleBlockUnblock: (id: string) => void;
  handlePageChange: (page: number) => void;
  handleSelectChange: (event: SelectChangeEvent<number>) => void;
  setSearch: (search: string) => void;
  setFilter: (filter: string) => void;
  totalProviders: number;
  selectedValue: number;
}

const Providertable: React.FC<ProviderTableProps> = ({
  provider,
  handleBlockUnblock,
  handlePageChange,
  setFilter,
  setSearch,
  totalProviders,
  handleSelectChange,
  selectedValue,
}) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("");
  const [_, setSearchQuery] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    setFilter(newStatus);
  };

  const options = [
    { value: "true", label: "Blocked" },
    { value: "false", label: "Active" },
    { value: "all", label: "All Providers" },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    setSearchQuery(newSearch);
  };
  let totalPage = 0;
  if (totalProviders % selectedValue == 0) {
    totalPage = totalProviders / selectedValue;
  } else {
    totalPage = Math.ceil(totalProviders / selectedValue);
  }
  const handleDetailsPage = (vendor: Provider) => {
    navigate(`/food-providers/details/${vendor.id}`, { state: vendor });
  };

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
                    Vendor Management
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
            <th>Vendor Name</th>
            <th>Vendor Id</th>
            <th>Email</th>
            <th>Status</th>
            <th>Rating</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {provider.length > 0 ? (
            provider.map((vendor) => (
              <tr>
                <td>{vendor.user_name}</td>
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
                    {" "}
                    {vendor.is_blocked ? (
                      <Typography fontWeight="bold">Blocked</Typography>
                    ) : (
                      <Typography fontWeight="bold">Active</Typography>
                    )}
                  </button>
                </td>
                <td>5.5</td>
                <td>
                  <RemoveRedEyeOutlinedIcon
                    onClick={() => handleDetailsPage(vendor)}
                    sx={{ cursor: "pointer" }}
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

export default Providertable;
