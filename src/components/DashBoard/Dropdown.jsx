import  { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBoxOpen } from "react-icons/fa6";
import { BsDatabaseFillAdd } from "react-icons/bs";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };



  const header = [
    {
      name: "All Product",
      pathName: "/allproduct",
      icon: <FaBoxOpen />,
    },
    {
        name: "Add Product",
        pathName: "/additems",
        icon: <BsDatabaseFillAdd />,
      },


  ];



  return (
    <div className="group w-full">
      <button
        className="outline-none focus:outline-none w-full  px-9 py-2  items-center space-x-4 rounded-xl text-white text-sm     flex"
        onClick={toggleDropdown}
      >
      <span>
          <svg
            className={`fill-current h-4 w-4 transform ${isOpen ? '-rotate-180' : ''} transition duration-150 ease-in-out`}
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>
        <span className="pr-1 font-semibold ">Product</span>
        
      </button>
      {isOpen && (
        <ul className=" w-full rounded-sm transform scale-100 transition duration-150 ease-in-out origin-top min-w-32">
        {header.map((data, idx) => (
              <li key={idx} className="mt-1 w-full">
                <NavLink
                  to={data.pathName}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "relative px-4 py-2 flex items-center space-x-4 rounded-xl text-white text-sm  bg-[#1677FF]"
                      : "relative px-4 py-2 flex text-white text-sm hover:bg-[#1677FF] rounded-xl items-center space-x-4 "
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
      )}
    </div>
  );
};

export default Dropdown;
