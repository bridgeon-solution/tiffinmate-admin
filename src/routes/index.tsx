import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from '../atoms/navbar';
import DashboardPage from '../pages/dashboardPage';
import Orderlist from '../pages/orderlist';
import Users from '../pages/users';
import LoginPage from '../pages/loginPage';
import Barchart from '../components/dashboard/barchart';
import PieCharts from '../components/dashboard/piecharts';
import Cards from '../components/dashboard/cards';
import Vendorverificationpage from '../pages/vendorverificationpage';

const AppRouter = () => {
  return (
    <BrowserRouter>
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
                <Route path="barchart" element={<Barchart />} />
                <Route path="piechart" element={<PieCharts />} />
                <Route path="cards" element={<Cards />} />
                <Route path="vendor-verification" element={<Vendorverificationpage/>}/>
              </Routes>
            </NavBar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
