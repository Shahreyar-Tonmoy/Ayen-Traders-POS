/* eslint-disable react/prop-types */

import toast, { Toaster } from "react-hot-toast";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useNavigate } from "react-router-dom";

/* eslint-disable no-unused-vars */
const ItemsCard = ({ data }) => {
  const { _id, name, photo, price, category } = data;
  const axiosPublic = UseAxiosPublic();

  const navigate = useNavigate();

  const handleClick = (_id) => {
    const data = {
      billingItems: _id,
    };

    axiosPublic.post("/api/billingitems/add", data).then((res) => {
      if (res.data.status === 200) {
        toast.success(res.data.message);
      }
      if (res.data.status === 409) {
        toast.error(res.data.message);
      }
    });
  };

  return (
    <div onClick={() => handleClick(_id)}>
      <div>
        <Toaster />
      </div>
      <article className="rounded-xl w-40 h-[310px] mx-auto bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        <a href="#">
          <div className="relative flex items-end overflow-hidden rounded-xl">
            <img src={photo} className="w-full h-32" />
          </div>
          <div className="mt-1 p-2">
            <h2 className="text-slate-700">{name}</h2>
            <p className="mt-1 text-sm text-slate-400">{category}</p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-lg  font-bold text-blue-500">{price} TK</p>
            </div>
          </div>
        </a>
      </article>
    </div>
  );
};
export default ItemsCard;
