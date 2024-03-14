
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const AddAllItems = () => {
  const axiosPublic = UseAxiosPublic();

  const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const { register, handleSubmit,required,reset } = useForm();

  
  const onSubmit = async (data) => {
    if(data?.photo[0]){
      const imageFile = { image: data?.photo[0] };
      // console.log(imageFile);
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
  
      if (res.data.success) {
        
        const  name= data?.name
  
        const  price= data?.price
        const  category= data?.category
        const  photo= res?.data?.data?.display_url

        const  item={name,price,category,photo}



        axiosPublic.post ( "/api/items/add" ,item)
        .then((res)=>{


           if(res?.data?.status === 200){
            reset()
           }



        })
        
  
        
  

  
        
      }
    }
  }



  return (
    <div className="bg-[#001529] bg-opacity-80 py-32 px-10 min-h-screen ">
      <div className="bg-white glass rounded-md p-5 lg:p-10 md:w-3/4 lg:w-1/2 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center mb-5">
            <label
              className="inline-block w-20 mr-6 text-right 
                           font-bold text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              {...register("name",{ required })}
              placeholder="Name"
              className="flex-1 py-2 overflow-hidden border-b-2 border-gray-400 focus:border-black
                text-gray-600 placeholder-gray-400
                outline-none"
            />
          </div>

          <div className="flex items-center overflow-hidden mb-5">
            <label
              className="inline-block w-20 mr-6 text-right 
                           font-bold text-gray-600"
            >
              Category
            </label>
            <select
              className="flex-1 py-2  border-b-2 border-gray-400 focus:border-black
                text-gray-600 placeholder-gray-400
                outline-none" {...register("category",{ required })}
            >
              <option selected disabled>
                None
              </option>
              <option>Pipe</option>
              <option>Pump</option>
              <option>Ventilator</option>
              <option>Sanitary</option>
              <option>Fitting</option>
              <option>Burner</option>
            </select>
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="number"
              className="inline-block w-20 mr-6 text-right 
                           font-bold text-gray-600"
            >
              Price
            </label>
            <input
              type="number"
              id="number"
              name="number"
              {...register("price",{ required })}
              placeholder="Price"
              className="flex-1 py-2 overflow-hidden border-b-2 border-gray-400 focus:border-black
                text-gray-600 placeholder-gray-400
                outline-none"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              
              className="inline-block w-20 mr-6 text-right 
                           font-bold text-gray-600 overflow-hidden"
            >
              Photo
            </label>
            <input
              type="file"
              {...register("photo",{ required })}
              className="file-input file-input-ghost w-full rounded-none border-t-0 border-r-0 border-l-0 flex-1 py-2 border-b-2 border-gray-400 focus:border-black text-gray-600 placeholder-gray-400 outline-none"
            />
          </div>

          <div className="text-right">
            <button className="py-3 px-8 bg-[#1677FF] text-white font-bold">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAllItems;
