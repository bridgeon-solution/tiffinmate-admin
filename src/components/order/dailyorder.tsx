import React from 'react'
import { Box,Grid,Typography } from '@mui/material'
import { StyledTable } from '../../atoms/table'
import { StyledSearchBar } from '../../atoms/search'
import { StyledInputBase } from '../../atoms/search'
import { StyledSearchButton } from '../../atoms/search'
import FilterBox from "../../atoms/filtrer";
import SearchIcon from "@mui/icons-material/Search";





const Dailyorder:React.FC = () => {
    const handleSearchChange=(()=>{

    })
    const handleChange=(()=>{

    })
    const options = [
        { value: "true", label: "Blocked" },
        { value: "false", label: "Active" },
        { value: "all", label: "All Providers" },
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
                </Grid>
              </Grid>
            </th>
          </tr>

          <tr>
            <th>Customer Name</th>
            <th>Total Price</th>
            <th>Phone no</th>
            <th>Place</th>
            <th>Status</th>
          </tr>
        </thead>
        </StyledTable>
        </Box>
  )
}

export default Dailyorder
