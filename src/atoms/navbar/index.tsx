import React, { useState } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VerifiedIcon from "@mui/icons-material/Verified";
import DrawerHeader from "../drawer";
import ConfirmModal from "../confirmboxmodal";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';



const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const icons = [
  <SpaceDashboardOutlinedIcon />,
  <ReceiptIcon />,
  <PeopleIcon />,
  <FastfoodIcon />,
  <SubscriptionsIcon />,
  <VerifiedIcon />,
];

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Order List", path: "/orderlist" },
  { name: "Users", path: "/users" },
  { name: "Food Providers", path: "/food-providers" },
  { name: "subscription", path: "/subscription" },
  { name: "Vendor Verification", path: "/vendor-verification" },
];

export default function NavBar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
 
  const handleLogoutOpen = () => setLogoutModalOpen(true);
  const handleLogoutClose = () => setLogoutModalOpen(false);
  

  const navigate=useNavigate();

  const handleMenuItemClick = (index: number) => {
    setActiveIndex(index);
    navigate(menuItems[index].path);
  };

  const handleNotificationClick = () => {
    navigate("/notification");
  };

  const handleLogoutConfirm = () => {
    localStorage.clear();
    navigate('/')
    setLogoutModalOpen(false);
    
  };
  const role=localStorage.getItem('name');
  if (role!='admin') {
    return <div className="flex items-center justify-center h-screen">Unauthorized</div>;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "#f5a561" }}
      ></AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <Typography
              width="100%"
              variant="h6"
              noWrap
              component="div"
              color="#e6852c"
              fontWeight="bold"
              fontSize="28px"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              TiffinMate
              <Typography color="#B9BBBD" fontSize="10px">
                Modern Admin Dashboard
              </Typography>
            </Typography>
          )}
        </DrawerHeader>

        <List
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {menuItems.map((item, index) => (
            <ListItem key={item.name} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handleMenuItemClick(index)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  fontWeight: "bold",
                  color: activeIndex === index ? "#e6852c" : "inherit",
                  backgroundColor:
                    activeIndex === index ? "#FF943126" : "inherit",
                  "&:hover": {
                    backgroundColor: "#FF943126", 
                  },
                  borderLeft:
                    activeIndex === index ? "3px solid #e6852c" : "none", 
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {icons[index]}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#EEEEEE",
          height: "100vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: 20, right: 80} } >
        <NotificationsActiveIcon sx={{ fontSize: 25 }} onClick={handleNotificationClick} />
        <Box
              sx={{
                position: "absolute",
                top: -5,
                right: -5,
                width: 16,
                height: 16,
                backgroundColor: "#FF9431",
                borderRadius: "50%",
                color: "white",
                fontSize: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
            </Box>
        </Box>

        <LogoutOutlinedIcon onClick={handleLogoutOpen}
          sx={{ position: "absolute", top: 20, right: 30, fontSize: 25,cursor:"pointer" }}
        />
         <ConfirmModal
        open={logoutModalOpen}
        onClose={handleLogoutClose}
        onConfirm={handleLogoutConfirm}
      />
        {/* <DrawerHeader /> */}
        {children}
        
      </Box>   
    </Box>
    
  );
}
