import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { CircularProgress, Box } from "@mui/material";
import SubscriptionPage from '../Pages/Subscription';
import Notificationpage from '../Pages/Notification';
import ProviderDetailsPage from '../Pages/ProviderDetails';
const NavBar = lazy(() => import('../Atoms/Navbar'));
const DashboardPage = lazy(() => import('../Pages/Dashboard'));
const Orderlist = lazy(() => import('../Pages/Order'));
const Users = lazy(() => import('../Pages/User'));
const LoginPage = lazy(() => import('../Pages/Login'));
const VendorVerificationPage = lazy(() => import('../Pages/ProviderVerification'));
const VendorPage = lazy(() => import('../Pages/Provider'));

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <NavBar>
                <Routes>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="orderlist" element={<Orderlist />} />
                  <Route path="users" element={<Users />} />
                  <Route path="food-providers" element={<VendorPage />} />
                  <Route path="subscription" element={<SubscriptionPage />} />
                  <Route path="vendor-verification" element={<VendorVerificationPage />} />
                  <Route path="/food-providers/details/:id" element={<ProviderDetailsPage/>}/>
                  <Route path="/notification" element={<Notificationpage/>}/>
              </Routes>
              </NavBar>
            }
          />
        </Routes>
      </Suspense>
      
      <ToastContainer/>
    </BrowserRouter>
  );
};

export default AppRouter;
