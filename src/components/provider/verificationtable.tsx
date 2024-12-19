import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { StyledTable } from "../../atoms/table";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import {
  StyledInputBase,
  StyledSearchBar,
  StyledSearchButton,
} from "../../atoms/search";
import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

interface Provider {
  email: string;
  certificate: string;
  username: string;
  verification_status: string;
  id: string;
}

interface VerificationtableProps {
  provider: Provider[];
  ApproveVerification: (id: string) => void;
  RejectVerification: (id: string) => void;
  handlePageChange: (page: number) => void;
  setSearch: (search: string) => void;
}

const Verificationtable: React.FC<VerificationtableProps> = ({
  provider,
  ApproveVerification,
  RejectVerification,
  setSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredData = provider.filter((item) => {
    const filterdPending = item.verification_status == "pending";
    const searchFilterd = item.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return filterdPending && searchFilterd;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    setSearchQuery(newSearch);
  };

  const handleViewCertificate = (certificate: string) => {
    window.open(certificate, "_self");
  };

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
          {filteredData.map((vendor) => (
            <tr>
              <td>{vendor.username}</td>
              <td>{vendor.id}</td>
              <td>{vendor.email}</td>
              <td>
                <RemoveRedEyeOutlinedIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleViewCertificate(vendor.certificate)}
                />
              </td>
              <td>
                <CheckCircleOutlineIcon
                  style={{ cursor: "pointer", color: "#008000" }}
                  onClick={() => ApproveVerification(vendor.id)}
                />
                <DangerousOutlinedIcon
                  style={{ cursor: "pointer", color: "#FF0000" }}
                  onClick={() => RejectVerification(vendor.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Box>
  );
};

export default Verificationtable;
