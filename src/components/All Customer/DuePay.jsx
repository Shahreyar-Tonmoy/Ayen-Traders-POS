/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import toast, { Toaster } from "react-hot-toast";

const DuePay = ({ payDueModal, setPayDueModal, data, refetch }) => {
  const { register, handleSubmit,  reset } = useForm();
  const id = data?._id

  const axiosPublic = UseAxiosPublic()



  const onSubmit = async (data) => {

    const PayDueData ={
        dueAmount: parseInt(data.payDue)
    }
    


    axiosPublic.put(`/api/customers/${id}/update-due`,PayDueData)
    .then((res)=>{
        

        if(res.data.status === 200){
            refetch()
            reset()
            setPayDueModal(false)
            toast.success(res?.data?.message);

        }
        if(res?.data?.status === 300){
            refetch()
            reset()
            setPayDueModal(false)
            toast.error(res?.data?.message);

        }

        


    })


 
    
    

  };

  return (
    <div>
          <div>
        <Toaster />
      </div>
      <div
        onClick={() => setPayDueModal(false)}
        className={`fixed z-[100] flex items-center justify-center ${
          payDueModal ? "visible opacity-100" : "invisible opacity-0"
        } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`text- absolute max-w-md rounded-sm bg-white p-6 drop-shadow-lg  text-black ${
            payDueModal
              ? "scale-1 opacity-1 duration-300"
              : "scale-0 opacity-0 duration-150"
          }`}
        >
          <div className="text-end">
            <button
              onClick={() => setPayDueModal(false)}
              className="btn btn-circle btn-xs border-red-600  text-red-600 duration-150 hover:bg-red-600 hover:text-white"
            >
              <RxCross2></RxCross2>
            </button>
          </div>

          <h1 className="mb-2 text-xl font-semibold">
            Total Price: {data?.totalPrice} Tk
          </h1>
          <h1 className="mb-2  font-semibold">
            Pay Amount: {data?.payAmount} Tk
          </h1>
          <h1 className="mb-2  font-semibold">
            Due Amount: {data?.dueAmount} Tk
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative h-11 w-80 my-5 ">
              <input 
                type="number"
                placeholder=""
                required
                {...register("payDue")}
                className="peer text-black h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              />
              <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-base font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-base peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Pay Due
              </label>
            </div>
            <button
              
              className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
            >
              Ok
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DuePay;
