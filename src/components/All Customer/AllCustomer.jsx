import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { CgSandClock } from "react-icons/cg";
import toast, { Toaster } from "react-hot-toast";
import { LuPrinter } from "react-icons/lu";
import { useState } from "react";
import Modal1 from "../Invoice/Invoice";

const AllCustomer = () => {
  const axiosPublic = UseAxiosPublic();

  const [selectedData, setSelectedData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const {
    isPending,
    error,
    data: datas,
    refetch,
  } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/customer/get`);
      return res.data;
    },
  });

  const handleDelete = (_id) => {
    axiosPublic.delete(`/api/customer/delete/${_id}`).then((res) => {
      if (res.data.status === 200) {
        toast.success(res.data.message);
        refetch();
      }
    });
  };

  // const handleOnPrint = (_id) => {
  //   <Invoice id={_id}></Invoice>;
  // };



  const handleRowClick = (data) => {
    setSelectedData(data);
    setOpenModal(true)
  };


  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <section className="container">
        <div className="flex flex-col">
          <div className="overflow-x-auto ">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <button className="flex items-center gap-x-2">
                            <span>Invoice</span>
                            <svg
                              className="h-3"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0.1"
                              />
                              <path
                                d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0.1"
                              />
                              <path
                                d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0.3"
                              />
                            </svg>
                          </button>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Customer
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Pay
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Due
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Total Price
                      </th>
                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Actions
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {datas?.map((data) => (
                      <tr  key={data._id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            {data?.invoiceId}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {data?.createdAt &&
                            new Date(data.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                        </td>

                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {data?.dueAmount === 0 ? (
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                              <svg
                                width={12}
                                height={12}
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10 3L4.5 8.5L2 6"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <h2 className="text-sm font-normal">Paid</h2>
                            </div>
                          ) : (
                            <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                              <CgSandClock></CgSandClock>
                              <h2 className="text-sm font-normal">Due</h2>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <div>
                              <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                {data?.name}
                              </h2>
                              <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                {data?.phoneNumber}{" "}
                                <span className="ml-2">{data?.address}</span>
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {data?.totalQuantity}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {data?.payAmount} TK
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {data?.dueAmount} TK
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {data?.totalPrice} TK
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-5">
                            <button
                              onClick={() => handleRowClick(data)}
                              className="text-white btn btn-sm btn-circle bg-transparent border-none text-lg transition-colors duration-200 hover:text-blue-800 focus:outline-none"
                            >
                              <LuPrinter></LuPrinter>
                            </button>



                            <div className="flex justify-center">
                              <button onClick={() => handleDelete(data?._id)}>
                                <svg
                                  className="h-8 w-8 rounded-full p-1 text-white hover:bg-gray-100 hover:text-blue-800 duration-200"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>


<Modal1 setOpenModal={setOpenModal} openModal={openModal} data={selectedData} ></Modal1>


              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllCustomer;
