import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import ItemsCard from "./ItemsCard";

const AllItems = () => {
  const axiosPublic = UseAxiosPublic();

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axiosPublic.get("/api/allitems/get").then((res) => res.data.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;


  return (
    <div>
      
        <div className="grid  lg:grid-cols-5 gap-4 px-3  mx-auto">
          {data?.map((data, idx) => (
            <ItemsCard key={idx} data={data}></ItemsCard>
          ))}
        </div>


      </div>
    
  );
};

export default AllItems;
