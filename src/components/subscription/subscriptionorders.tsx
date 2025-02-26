import React from "react";
import { Box, Grid, MenuItem, Paper, Table, TableBody,  Modal, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { StyledTable } from "../../atoms/table";
import { StyledSearchBar } from "../../atoms/search";
import { StyledInputBase } from "../../atoms/search";
import { StyledSearchButton } from "../../atoms/search";
import FilterBox from "../../atoms/filtrer";
import SearchIcon from "@mui/icons-material/Search";
import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import PaginationRounded from "../../atoms/pagination";
import { Tooltip, IconButton, Select } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { Visibility } from "@mui/icons-material";
// import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

// interface SubscriptionDetail {
//   category_id: string;
// }
interface FoodItem {
  food_name: string;
  price: number;
  description: string;
  day: string;
  image: string;
}

interface Category {
  category_name: string;
  food_Items: FoodItem[];
}

interface Subscription {
  user_name: string;
  address: string | null;
  city: string | null;
  ph_no: string;
  category?: Category[]; 
  menu_name: string;
  total_price: number;
  start_date: string;
  is_active: boolean;
}


interface SubscriptionTableProps {
  order: Subscription[];
  handlePageChange: (page: number) => void;
  handleSelectChange: (event: SelectChangeEvent<number>) => void;
  exportToExcel: () => void;
  setSearch: (search: string) => void;
  setFilter: (filter: string) => void;
  totalOrders: number;
  selectedValue: number;
  onOpenModal: (orderId: string,category_id:string) => void;
}

const Subscriptionorders: React.FC<SubscriptionTableProps> = ({
  order,
  handlePageChange,
  setFilter,
  setSearch,
  totalOrders,
  handleSelectChange,
  exportToExcel,
  selectedValue,
  // onOpenModal
}) => {
  const [status, setStatus] = useState<string>("");
  const [_, setSearchQuery] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    setFilter(newStatus);
  };

  
  const handleCloseModal = () => {
    setOpen(false);
    setSelectedCategories([]);
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
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);


 const handleOpenModal = (categories: Category[] | undefined) => {
    setSelectedCategories(categories ?? []); 
    setOpen(true);
  };
  return (
    <>
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
                      Subscription Orders
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
                        <DownloadIcon />
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
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {order.length > 0 ? (
              order.map((od) => (
                <tr>
                  <td>{od.user_name}</td>
                  <td>{od.total_price}</td>
                  {/* <td>{od.provider}</td> */}
                  <td>shamna</td>
                  <td>{new Date(od.start_date).toLocaleDateString()}</td>
                  <td>
                    {od.start_date
                      ? new Date(od.start_date).toLocaleDateString()
                      : "...."}
                  </td>
                  <td>
                    {od.start_date ? (
                      <span style={{ color: "red" }}>Expired</span>
                    ) : (
                      <span style={{ color: "green" }}>Active</span>
                    )}
                  </td>
                  <td>
                    <IconButton onClick={() => handleOpenModal(od.category)} color="primary">
                      <Visibility />
                    </IconButton>
                  </td>
                  {/* <td>
  {od.details && od.details.length > 0 && (
    <IconButton
      onClick={() =>
        onOpenModal(od.menu_id, od.details[0].category_id)
      }
    >
      <RemoveRedEyeOutlinedIcon sx={{ cursor: "pointer" }} />
    </IconButton>
  )}
</td> */}
                </tr>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary">
                No items found
              </Typography>
            )}
          </tbody>
        </StyledTable>
        <Modal open={open} onClose={handleCloseModal} aria-labelledby="food-modal-title">
        <Box
          sx={{
            p: 3,
            bgcolor: "white",
            width: "60%",
            maxHeight: "80vh",
            overflowY: "auto",
            margin: "auto",
            mt: 5,
            borderRadius: 2,
          }}
        >
          <Typography id="food-modal-title" variant="h6" gutterBottom>
            Food Items 
          </Typography>
          {selectedCategories.length > 0 ? (
            selectedCategories.map((category, idx) => (
              <Box key={idx} mb={3}>
                <Typography variant="h6" color="primary">
                  {category.category_name}
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: "400px", overflowY: "auto" }}>
                  <Table>
                    <TableHead sx={{ bgcolor: "lightgray" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "center", p: 2 }}>Day</TableCell>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "center", p: 2 }}>Food Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "center", p: 2 }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "center", p: 2 }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "center", p: 2 }}>Image</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {category.food_Items.map((food, foodIdx) => (
                        <TableRow key={foodIdx}>
                          <TableCell>{food.day}</TableCell>
                          <TableCell>{food.food_name}</TableCell>
                          <TableCell>${food.price.toFixed(2)}</TableCell>
                          <TableCell>{food.description}</TableCell>
                          <TableCell>
                            <img src={food.image} alt={food.food_name} width="50" height="50" style={{ borderRadius: "5px" }} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))
          ) : (
            <Typography>No Food Items Available</Typography>
          )}
        </Box>
      </Modal>

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
    </>
  );
};

export default Subscriptionorders;
