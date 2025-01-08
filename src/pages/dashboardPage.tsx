import Cards from "../components/dashboard/cards";
import Barchart from "../components/dashboard/barchart";
import PieCard from "../components/dashboard/piecharts";

const DashboardPage = () => {
  return (
    <div>
      <Cards />
      <PieCard />
      <Barchart />
    </div>
  );
};

export default DashboardPage;
