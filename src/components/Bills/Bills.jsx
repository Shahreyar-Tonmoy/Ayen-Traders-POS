import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";

const Bills = () => {
  const axiosPublic = UseAxiosPublic();
  const [openModal, setOpenModal] = useState(false);
  const [isDueChecked, setIsDueChecked] = useState(false);
  const { register, handleSubmit, required } = useForm();

  const [quantities, setQuantities] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const { isLoading, error, data,refetch } = useQuery({
    queryKey: ["data"],
    queryFn: () =>
      axiosPublic.get("/api/billingitems/get").then((res) => res.data),
  });

  const itemsData = data



  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);

    if (data && data.length > index && data[index]?.billingItems) {
      // Check if data[index] and data[index].billingItems exist
      handleMakeInvoice(data, newQuantities);
      
    }
  };

  useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      // Initialize quantities state with default values
      setQuantities(data.map(() => 1));
      handleMakeInvoice(
        data,
        data.map(() => 1)
      );
    }
  }, [isLoading, data]);

  const handleDueChange = (event) => {
    setIsDueChecked(event.target.checked);
  };

  const handleMakeInvoice = (items, quantities) => {
    // Check if items and quantities are arrays and have the same length
    if (
      !Array.isArray(items) ||
      !Array.isArray(quantities) ||
      items?.length !== quantities?.length
    ) {
      console.error("Invalid items or quantities:", items, quantities);
      return;
    }

    // Check if any item or quantity is undefined
    if (
      items.some((item) => item === undefined) ||
      quantities.some((quantity) => quantity === undefined)
    ) {
      console.error("Invalid items or quantities:", items, quantities);
      return;
    }

    // Proceed with calculations
    const totalPrice = items.reduce(
      (acc, item, idx) =>
        acc + (item?.billingItems?.price || 0) * quantities[idx],
      0
    );
    const totalQuantity = quantities.reduce(
      (acc, quantity) => acc + quantity,
      0
    );

    setTotalPrice(totalPrice.toFixed(2));
    setTotalQuantity(totalQuantity);
  };

  const onSubmit = async (data) => {

    const {name,address,phoneNumber,payAmount} = data

    const dueAmount = parseInt(totalPrice) - parseInt(payAmount)




    const due = {
      name: name,
      address:address,
      phoneNumber:phoneNumber,
      totalPrice: parseInt(totalPrice),
      totalQuantity:totalQuantity,
      dueAmount:dueAmount || 0,
      payAmount:parseInt(payAmount) || 0,
      items: itemsData?.map((billingItem, idx) => ({
        itemsId: billingItem?.billingItems?._id,
        quantity: quantities[idx],
      })),
      
    }




    const Paid = {
      name: name,
      address:address,
      phoneNumber:phoneNumber,
      totalPrice: parseInt(totalPrice),
      totalQuantity:totalQuantity,
      dueAmount: 0,
      payAmount:parseInt(totalPrice) || 0,
      items: itemsData?.map((billingItem, idx) => ({
        itemsId: billingItem?.billingItems?._id,
        
        quantity: quantities[idx],
      })),
      
    }








    if(isDueChecked){
      axiosPublic.post("/api/customer/add",due)
      .then(()=>{
        axiosPublic.get("/api/billingitems/delete")
        .then((res)=>{
          
          if(res.data.status === 200){
            refetch()
          }
        })
      })
    }

    else{
      axiosPublic.post("/api/customer/add",Paid)
      .then(()=>{
        axiosPublic.get("/api/billingitems/delete")
        .then((res)=>{
          
          if(res.data.status === 200){
            refetch()
          }
        })
      })
    }


  };

  const calculateTotal = (price, quantity) => {
    return (quantity * price).toFixed(2);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <section className="px-4 text-gray-600 antialiased">
        <div className="flex flex-col justify-center">
          <div className="mx-auto w-full rounded-sm border border-gray-200 bg-white shadow-lg">
            <header className="border-b border-gray-100 px-5 py-4">
              <div className="font-semibold text-gray-800">Makes Bills</div>
            </header>
            <div className="overflow-x-auto p-3">
              <table className="w-full table-auto">
                <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                  <tr>
                    <th className="p-2">
                      <div className="text-left font-semibold">Image</div>
                    </th>
                    <th className="p-2">
                      <div className="text-left font-semibold">
                        Product Name
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="text-left font-semibold">Price</div>
                    </th>
                    <th className="p-2">
                      <div className="text-left font-semibold">Quantity</div>
                    </th>
                    <th className="p-2">
                      <div className="text-left font-semibold">Total</div>
                    </th>
                    <th className="p-2">
                      <div className="text-center font-semibold">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {data?.map((billingItem, idx) => (
                    <tr key={idx}>
                      <td className="p-2">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={billingItem?.billingItems?.photo}
                              alt="Items Image"
                            />
                          </div>
                        </div>
                      </td>

                      <td className="p-2">
                        <div className="font-medium text-gray-800">
                          {billingItem?.billingItems?.name}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="font-medium text-gray-800">
                          {billingItem?.billingItems?.price} TK
                        </div>
                      </td>

                      <td className="p-2">
                        <div className="join">
                          <button
                            className="btn join-item  btn-sm"
                            onClick={() =>
                              handleQuantityChange(
                                idx,
                                Math.max(quantities[idx] - 1, 0)
                              )
                            }
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="w-16  border-gray-300 p-1 text-center  btn-sm"
                            value={quantities[idx]}
                            onChange={(e) =>
                              handleQuantityChange(
                                idx,
                                Math.max(1, parseInt(e.target.value)) || 1
                              )
                            }
                            readOnly
                            disabled
                            step={1}
                            min={0}
                          />

                          <button
                            className="btn join-item  btn-sm"
                            onClick={() =>
                              handleQuantityChange(idx, quantities[idx] + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="p-2">
                        <div className="text-left font-medium text-green-500">
                          {calculateTotal(
                            billingItem?.billingItems?.price,
                            quantities[idx]
                          )}{" "}
                          TK
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex justify-center">
                          <button>
                            <svg
                              className="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600"
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end space-x-4 border-t border-gray-100 px-5 py-4 text-2xl font-bold">
              <div>Total</div>
              <div className="text-blue-600">
                {data
                  .reduce(
                    (acc, item, idx) =>
                      acc + item?.billingItems?.price * quantities[idx],
                    0
                  )
                  .toFixed(2)}{" "}
                TK
              </div>
              {/* <button
                onClick={handleMakeInvoice}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Make Invoice
              </button> */}

              <div>
                <button
                  onClick={() => {
                    setOpenModal(true);
                    handleMakeInvoice();
                  }}
                  className="rounded-sm bg-sky-500 px-5 py-[6px] text-white"
                  id="_modal_NavigateUI"
                >
                  Make Invoice
                </button>
                <div
                  onClick={() => setOpenModal(false)}
                  className={`fixed z-[100] flex items-center justify-center ${
                    openModal ? "visible opacity-100" : "invisible opacity-0"
                  } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                >
                  <div
                    onClick={(e_) => e_.stopPropagation()}
                    className={`text- absolute max-w-lg rounded-sm w-80 lg:w-[500px] bg-white p-6 drop-shadow-lg  dark:text-white ${
                      openModal
                        ? "scale-1 opacity-1 duration-300"
                        : "scale-0 opacity-0 duration-150"
                    }`}
                  >
                    <div className="text-end">
                      <button
                        onClick={() => setOpenModal(false)}
                        className="btn btn-circle btn-xs border-red-600  text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                      >
                        <RxCross2></RxCross2>
                      </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="relative h-11 w-full mt-5 ">
                        <input
                          placeholder=""
                          {...register("name", { required })}
                          className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                        />
                        <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-base font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-base peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Name
                        </label>
                      </div>

                      <div className="relative h-11 w-full mt-5 ">
                        <input
                          placeholder=""
                          {...register("phoneNumber", { required })}
                          className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                        />
                        <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-base font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-base peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Phone Number
                        </label>
                      </div>

                      <div className="relative h-11 w-full mt-5 ">
                        <input
                          placeholder=""
                          {...register("address")}
                          className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                        />
                        <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-base font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-base peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Address
                        </label>
                      </div>

                      {isDueChecked && (
                        <div className="relative h-11 w-full mt-5">
                          <input
                            placeholder=""
                            {...register("payAmount")}
                            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 text-black focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                          />
                          <label className="after:content[''] text-black pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-base font-normal leading-tight  transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-base peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Pay Amount
                          </label>
                        </div>
                      )}

                      <div>
                        <div className="form-control mt-5">
                          <label className="label cursor-pointer">
                            <span className="label-text">Paid</span>
                            <input
                              type="radio"
                              name="radio-10"
                              className="radio checked:bg-red-500"
                              checked={!isDueChecked}
                              onChange={() => setIsDueChecked(false)}
                            />
                          </label>
                        </div>
                        <div className="form-control">
                          <label className="label cursor-pointer">
                            <span className="label-text">Due</span>
                            <input
                              type="radio"
                              name="radio-10"
                              className="radio checked:bg-blue-500"
                              checked={isDueChecked}
                              onChange={handleDueChange}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="mt-5">
                        <h1 className="text-black text-base">
                          Total Price: {totalPrice} TK
                        </h1>

                        <h1 className="text-black text-base">
                          Total Quantity: {totalQuantity}
                        </h1>
                      </div>

                      <div className="flex mt-5 justify-between">
                        <button
                          onClick={() => setOpenModal(false)}
                          className="me-2 rounded-md btn-sm bg-green-700  text-white text-base"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <input type="hidden" className="border border-black bg-gray-50" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bills;
