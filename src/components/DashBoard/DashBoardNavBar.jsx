import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { BsDatabaseFillAdd } from "react-icons/bs";

const DashBoardNavBar = () => {
  const header = [
    {
      name: "Home",
      pathName: "/",
      icon: <FaHome />,
    },
    {
      name: "All Customer",
      pathName: "/allcoustomer",
      icon: <IoIosPeople />,
    },
    {
      name: "Add Items",
      pathName: "/additems",
      icon: <BsDatabaseFillAdd />,
    },
  ];

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div>
      <div className="sticky z-10 mt-2 top-0 h-16 border-b text-white bg-white lg:py-2.5">
        <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
          <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
            Ayen Traders
          </h5>

          <div className="lg:hidden  z-50">
            <div className="drawer drawer-end overflow-hidden">
              <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle"
                checked={drawerOpen}
                onChange={toggleDrawer}
              />
              <div className="drawer-content flex justify-between items-center ">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer"
                  className="btn btn-ghost hover:bg-transparent cursor-pointer"
                >
                  <span className="w-12 flex text-black items-center lg:hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 my-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </span>
                </label>
                <h1 className="text-2xl text-black font-medium lg:block">
                  Ayen Traders
                </h1>
              </div>

              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                  onClick={closeDrawer}
                ></label>

                <ul className="p-4 w-56 min-h-full bg-[#001529] text-base-content">
                  {/* logo section */}
                  <div className=" flex justify-between items-center ">
                    <h1 className="text-center text-white text-xl font-semibold">
                      Ayen Traders
                    </h1>
                    <label
                      className=" text-white text-2xl btn btn-ghost bg-transparent hover:bg-transparent "
                      onClick={closeDrawer}
                    >
                      <RxCrossCircled></RxCrossCircled>
                    </label>
                  </div>

                  <ul className="space-y-2 tracking-wide mt-8">
                    {header.map((data,idx) => (
                      <li key={idx} className="mt-1 w-full">
                        <NavLink
                          onClick={closeDrawer}
                          to={data.pathName}
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending"
                              : isActive
                              ? "relative px-4 py-2 flex items-center space-x-4 rounded-xl text-white text-sm  bg-[#1677FF]"
                              : "relative px-4 py-3 flex text-sm text-white items-center space-x-4 "
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

                  <div className="px-2  mt-5 pt-4 flex flex-col border-t">
                    <button
                      className="px-4 py-3 flex items-center space-x-4 rounded-md text-white hover:text-slate-200 group"
                      onClick={closeDrawer}
                    >
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
                      <span className="">Logout</span>
                    </button>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardNavBar;
