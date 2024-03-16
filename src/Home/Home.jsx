import DailyChart from "../Home Page/DailyChart";
import MonthChart from "../Home Page/MonthChart";
import TotalSum from "../Home Page/TotalSum";

const Home = () => {
  return (
    <div>
      <div className="lg:flex items-center mx-8 justify-between">
        <MonthChart></MonthChart>
        <DailyChart></DailyChart>
      </div>

      <TotalSum></TotalSum>


    </div>
  );
};

export default Home;
