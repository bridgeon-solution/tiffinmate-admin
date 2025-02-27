import Cards from "../Components/DashBoardComponent/cards";
import Barchart from "../Components/DashBoardComponent/barchart";
import PieCard from "../Components/DashBoardComponent/piecharts";

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
