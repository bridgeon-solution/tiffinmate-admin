import { BarChart } from "@mui/icons-material";
import Cards from "../Components/DashBoardComponent/cards";
import PieCard from "../Components/DashBoardComponent/PieCharts";

const DashboardPage = () => {
  return (
    <div>
      <Cards />
      <PieCard />
      <BarChart />
    </div>
  );
};

export default DashboardPage;
