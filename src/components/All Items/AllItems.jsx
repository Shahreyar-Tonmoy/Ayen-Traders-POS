import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import ItemsCard from "./ItemsCard";
import { useState } from "react";

const AllItems = () => {
  const axiosPublic = UseAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axiosPublic.get("/api/allitems/get/stock").then((res) => res.data.data),
  });



  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    try {
      const response = await fetch(
        `http://localhost:5000/api/search/items?search=${encodeURIComponent(
          searchTerm
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching customers:", error.message);
    }
  };



  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>

<div className="max-w-md mx-auto mt-3 mb-5 ">
        <div className="relative border flex items-center w-full h-12 rounded-lg focus-within:shadow-xl  bg-slate-200 overflow-hidden">
          <div className="grid text-black  place-items-center h-full w-12 ">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            value={searchTerm}
            onChange={handleSearch}
            className="peer h-full bg-slate-200  w-full outline-none text-sm text-black placeholder:text-black pr-2"
            type="text"
            id="search"
            placeholder="Search something.."
          />
        </div>
      </div>


      {data.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-6 xl:grid-cols-7 gap-4 px-3  mx-auto">
          {(searchTerm ? searchResults : data)?.map((data, idx) => (
            <ItemsCard key={idx} data={data}></ItemsCard>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center h-[80vh]  justify-center">
          <h1 className="text-5xl text-red-500">
            There is no product are available
          </h1>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default AllItems;
