/* eslint-disable no-unused-vars */

import { Link, NavLink } from "react-router-dom";

import { FaHome, FaMoneyBillWave } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { CiCircleList } from "react-icons/ci";

const DashBoardSideBar = () => {
  const header = [
    {
      name: "Home",
      pathName: "/",
      icon: <FaHome />,
    },

    {
      name: "All Items",
      pathName: "/allitems",
      icon: <CiCircleList />,
    },
    {
      name: "Bills",
      pathName: "/bills",
      icon: <FaMoneyBillWave />
      ,
    },



    {
      name: "All Customer",
      pathName: "/allcustomer",
      icon: <IoIosPeople />,
    },


    {
      name: "Add Items",
      pathName: "/additems",
      icon: <BsDatabaseFillAdd />,
    },

  ];

  return (
    <div>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3  w-full flex flex-col justify-between h-screen text-white border-r bg-[#001529] transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        {/* dashboard condication apply here */}

        <div>
          {/* logo section */}
          <div className="-mx-6 px-6 py-4">
            <img
              src="https://i.ibb.co/r0qLnJ8/Ayen-Traders-removebg-preview.png"
              className="w-28 rounded-full mx-auto"
              alt="Ayen Traders logo"
            />

            <h1 className="text-center text-2xl font-semibold">Ayen Traders</h1>
          </div>

          {/* navigation button section */}

          <ul className="space-y-2 tracking-wide mt-5">
            {header.map((data,idx) => (
              <li key={idx} className="mt-1 w-full">
                <NavLink
                  to={data.pathName}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "relative px-4 py-2 flex items-center space-x-4 rounded-xl text-white text-sm  bg-[#1677FF]"
                      : "relative px-4 py-3 flex text-sm items-center space-x-4 "
                  }
                >
                  <span className="flex items-center pl-5 justify-start gap-3  ">
                    {data.icon}
                    {data.name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="  pt-4 flex flex-col  border-t">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-white group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="group-hover:text-gray-700">Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default DashBoardSideBar;
