import { Outlet } from "react-router-dom";
import DashBoardSideBar from "../components/DashBoard/DashBoardSideBar";
import DashBoardNavBar from "../components/DashBoard/DashBoardNavBar";

const MainLayout = () => {
    return (
        <div>
    <div>
      <DashBoardSideBar></DashBoardSideBar>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        

            <DashBoardNavBar></DashBoardNavBar>

        

        <Outlet></Outlet>

      </div>
    </div>
        </div>
    );
};

export default MainLayout;