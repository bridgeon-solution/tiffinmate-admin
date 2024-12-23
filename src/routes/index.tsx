import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Providerdetailspage from '../components/provider/providerdetailspage';

const NavBar = lazy(() => import('../atoms/navbar'));
const DashboardPage = lazy(() => import('../pages/dashboardPage'));
const Orderlist = lazy(() => import('../pages/orderlist'));
const Users = lazy(() => import('../pages/users'));
const LoginPage = lazy(() => import('../pages/loginPage'));
const VendorVerificationPage = lazy(() => import('../pages/providerverificationpage'));
const VendorPage = lazy(() => import('../pages/providerPage'));

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....</div>}>
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
                  <Route path="vendor-verification" element={<VendorVerificationPage />} />
                  <Route path="/food-providers/details/:id" element={<Providerdetailspage/>}/>

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
