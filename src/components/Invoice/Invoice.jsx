/* eslint-disable react/prop-types */
import { RxCross2 } from "react-icons/rx";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function Invoice({ setOpenModal, openModal, data }) {

  

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      // Close the modal after printing
      setOpenModal(false);
    },
  });







  const today = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedDate = today.toLocaleString("en-US", options);

  return (
    <div>
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-[100] flex items-center overflow-y-scroll justify-center ${
          openModal ? "visible opacity-100" : "invisible opacity-0"
        } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={` absolute lg:w-1/3  rounded-sm   p-6 mt-32 lg:mt-20 drop-shadow-lg  dark:text-white ${
            openModal
              ? "scale-1 opacity-1 duration-300"
              : "scale-0 opacity-0 duration-150"
          }`}
        >
          <div className="text-end">
            {" "}
            <button
              onClick={() => setOpenModal(false)}
              className="text-red btn btn-sm text-red-500 hover:border-none btn-circle b bg-transparent hover:bg-red-500 text-xl transition-colors duration-200 hover:text-white border-red-500 focus:outline-none"
            >
              <RxCross2></RxCross2>
            </button>
          </div>

          <div
            ref={componentRef}
            className="py-5 px-8 max-w-sm mx-auto bg-white text-black rounded-xl shadow-md flex flex-col"
          >
            <div className="text-sm">
              <div className="mx-auto">
                <img
                  className="w-14  mx-auto"
                  src="https://i.ibb.co/r0qLnJ8/Ayen-Traders-removebg-preview.png"
                  alt="Ayen Traders"
                />
                <h2 className="text-lg font-bold text-center ">Ayen Traders</h2>
                <h2 className=" text-center ">Md.Sanower Hossain</h2>
                <h2 className="text-center ">01717424159</h2>
                <p className="text-center ">
                  Punot Bazar, Kalai, Joupurhat 5930
                </p>
              </div>
              <div className="mt-5">
                <h2 className="text-lg text-start font-bold ">
                  Customer Details
                </h2>

                <h2 className="text-start ">{data?.name}</h2>
                <h2 className=" text-start">{data?.phoneNumber}</h2>
                <p className="text-start">{data?.address}</p>
              </div>
            </div>

            <div className="flex justify-between mt-6 gap-6 text-[13px]">
              <p className="text-sm font-semibold">No : {data?.invoiceId}</p>
              <p className="text-center">
                {" "}
                {data?.createdAt &&
                  new Date(data.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
              </p>
            </div>

            <table className="w-full border-t mt-2 text-sm">
              <thead>
                <tr>
                  <th className="border-b p-2">#</th>
                  <th className="border-b p-2">Item</th>
                  <th className="border-b p-2">Qty</th>
                  <th className="border-b p-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {data?.items?.map((data, idx) => (
                  <tr key={idx}>
                    <td className="border-b p-2">{idx + 1}</td>
                    <td className="border-b p-2">{data?.itemsId?.name}</td>
                    <td className="border-b p-2">{data?.quantity}</td>
                    <td className="border-b p-2">
                      {parseInt(data?.itemsId?.price) *
                        parseInt(data?.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-5">
              <div>
                <p className="text-start">Total</p>
                <p className="text-start">Pay</p>
                <p className="text-start">Due</p>
              </div>
              <div>
                <p className="text-end">{data?.totalPrice} TK</p>
                <p className="text-end">{data?.payAmount} Tk</p>
                <p className="text-end">{data?.dueAmount} Tk</p>
              </div>
            </div>
            <div className="mt-5">
              <p>Thank you for your purchase!</p>
              <p className="text-end text-[10px] mt-5">Print at {formattedDate}</p>
            </div>
          </div>

          <div className="text-end mt-5">
            <button
              onClick={handlePrint}
              className="btn btn-md bg-[#001529] text-white hover:bg-[#001529]"
            >
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
