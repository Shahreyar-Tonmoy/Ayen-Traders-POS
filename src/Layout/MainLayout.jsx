import { Outlet } from "react-router-dom";
import DashBoardSideBar from "../components/DashBoard/DashBoardSideBar";
import DashBoardNavBar from "../components/DashBoard/DashBoardNavBar";
import { useContext } from "react";
import { AuthContext } from "../components/Login/Firebase/AuthProvider";

const MainLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      
        <div>
        {
            user ? <DashBoardSideBar></DashBoardSideBar> : ""   
        }

          
          <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          {
            user ? <DashBoardNavBar></DashBoardNavBar> : ""   
        }

            

            <Outlet></Outlet>
          </div>
        </div>
      
    </div>
  );
};

export default MainLayout;
