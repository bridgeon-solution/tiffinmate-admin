import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const NavBar=lazy(()=>import('../atoms/navbar'))
const DashboardPage=lazy(()=>import('../pages/dashboardPage'))
const Orderlist=lazy(()=>import('../pages/orderlist'))
const Users=lazy(()=>import('../pages/users'))
const LoginPage =lazy(()=>import('../pages/loginPage'))
const Vendorverificationpage =lazy(()=>import('../pages/vendorverificationpage'))
const Vendorpage =lazy(()=>import('../pages/vendorPage'))


const AppRouter = () => {
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
                <Route path="food-providers" element={<Vendorpage/>}/>
                <Route path="vendor-verification" element={<Vendorverificationpage/>}/>

                
              </Routes>
            </NavBar>
          }
        />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
