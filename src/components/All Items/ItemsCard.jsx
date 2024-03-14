/* eslint-disable react/prop-types */

import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

/* eslint-disable no-unused-vars */
const ItemsCard = ({ data }) => {
  const { _id, name, photo, price, category } = data;
const axiosPublic = UseAxiosPublic()

const  handleClick = (_id)=>{


    const data = {
        billingItems: _id
    }


  
axiosPublic.post("/api/billingitems/add",data)
.then((res)=>{
    console.log(res.data)
})







}


  return (
    <div onClick={()=>handleClick(_id)}>
      <article className="rounded-xl w-60 h-[330px] bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        <a href="#">
          <div className="relative flex items-end overflow-hidden rounded-xl">
            <img src={photo} className="w-full h-40" />
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
