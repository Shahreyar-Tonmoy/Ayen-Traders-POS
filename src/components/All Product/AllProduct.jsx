import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";
import ProductUpdate from "./ProductUpdate";

const AllProduct = () => {
  const axiosPublic = UseAxiosPublic();
  const [updateProduct, setUpdateProduct] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axiosPublic.get("/api/allitems/get").then((res) => res.data.data),
  });

  const handleClick = (data) => {
    setSelectedData(data);
    setUpdateProduct(true);
  };

  const handleCheckboxChange = async (id, currentStockStatus) => {
    try {
      const newStockStatus = !currentStockStatus; // Toggle the current stock status

      const Status = {
        stock: newStockStatus,
      };

      // Send the updated boolean value to your server
      const response = await axiosPublic.put(
        `/api/product/update/stock/${id}`,
        Status
      );

      if (response?.data?.status == 200) {
        refetch();
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.error("Error updating stock status:", error);
      toast.error("An error occurred while updating stock status.");
    }
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/api/product/delete/${id}`).then((res) => {
          if (res.data.status === 200) {
            toast.success(res?.data?.message);
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div className="overflow-x-auto  lg:rounded-lg mt-2 md:mx-6 lg:mx-8 ">
        <table className="table ">
          {/* head */}
          <thead className="bg-gray-50 text-white dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                No
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Name
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Price
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Stock
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white  text-white  dark:bg-[#001529]">
            {data?.map((data, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>

                <td className="text-gray-700 dark:text-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={data?.photo} alt="product image" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{data?.name}</div>
                      <div className="text-sm opacity-50">{data?.category}</div>
                    </div>
                  </div>
                </td>
                <td>{data?.price} TK</td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={data.stock}
                    onChange={() =>
                      handleCheckboxChange(data?._id, data?.stock)
                    }
                  />
                </td>
                <th>
                  <div className="flex gap-5 ">
                    <button
                      onClick={() => handleClick(data)}
                      className="text-white btn btn-sm btn-circle bg-transparent border-none text-xl transition-colors duration-200 hover:bg-green-500 hover:text-white focus:outline-none"
                    >
                      <RxUpdate></RxUpdate>
                    </button>
                    <button
                      onClick={() => handleDelete(data?._id)}
                      className="text-white btn btn-sm btn-circle bg-transparent border-none text-2xl transition-colors duration-200 hover:bg-red-500 hover:text-white focus:outline-none"
                    >
                      <MdDeleteForever></MdDeleteForever>
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>

        <ProductUpdate
          updateProduct={updateProduct}
          refetch={refetch}
          setUpdateProduct={setUpdateProduct}
          data={selectedData}
        ></ProductUpdate>
      </div>
    </div>
  );
};

export default AllProduct;
