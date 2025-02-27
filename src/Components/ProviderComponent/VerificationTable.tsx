import React from "react";
import { Box, CircularProgress, Grid, MenuItem, Typography } from "@mui/material";
import { StyledTable } from "../../Atoms/Table";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import PaginationRounded from "../../Atoms/Pagination";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Select, SelectChangeEvent } from "@mui/material";

import {
  StyledInputBase,
  StyledSearchBar,
  StyledSearchButton,
} from "../../Atoms/Search";
import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

interface Provider {
  email: string;
  certificate: string;
  user_name: string;
  verification_status: string;
  id: string;
}

interface VerificationtableProps {
  provider: Provider[];
  ApproveVerification: (id: string) => void;
  RejectVerification: (id: string) => void;
  handlePageChange: (page: number) => void;
  handleSelectChange: (event: SelectChangeEvent<number>) => void;
  setSearch: (search: string) => void;
  handleDownloadCertificate: (certificate: string, name: string) => void;
  totalProviders: number;
  selectedValue: number;
  loading:boolean;
}

const Verificationtable: React.FC<VerificationtableProps> = ({
  provider,
  ApproveVerification,
  RejectVerification,
  handlePageChange,
  setSearch,
  handleDownloadCertificate,
  totalProviders,
  handleSelectChange,
  selectedValue,
  loading
}) => {
  const [_, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    setSearchQuery(newSearch);
  };
  let totalPage = 5;
  if (totalProviders % 3 == 0) {
    totalPage = totalProviders / 3;
  } else {
    totalPage = Math.ceil(totalProviders / 3);
  }

  const handleViewCertificate = (certificate: string) => {
    window.open(certificate, "_self");
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
                    Vendor Verification
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
                  <StyledSearchBar>
                    <StyledInputBase
                      placeholder="Search"
                      inputProps={{ "aria-label": "search" }}
                      onChange={handleSearchChange}
                    />
                    <StyledSearchButton type="button" aria-label="search">
                      <SearchIcon />
                    </StyledSearchButton>
                  </StyledSearchBar>
                </Grid>
              </Grid>
            </th>
          </tr>
          <tr>
            <th>Vendor Name</th>
            <th>Vendor Id</th>
            <th>Email</th>
            <th>Health Certificate</th>
            <th>Action</th>
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
                  <RemoveRedEyeOutlinedIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => handleViewCertificate(vendor.certificate)}
                  />
                  <FileDownloadOutlinedIcon
                    color="primary"
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      handleDownloadCertificate(
                        vendor.certificate,
                        vendor.user_name
                      )
                    }
                  />
                </td>
                <td>{loading?(<CircularProgress size={20}/>):(
                  <>
                  <CheckCircleOutlineIcon
                    style={{ cursor: "pointer", color: "#008000" }}
                    onClick={() => ApproveVerification(vendor.id)}
                  />
                  <DangerousOutlinedIcon
                    style={{ cursor: "pointer", color: "#FF0000" }}
                    onClick={() => RejectVerification(vendor.id)}
                  /></>)}
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

export default Verificationtable;
