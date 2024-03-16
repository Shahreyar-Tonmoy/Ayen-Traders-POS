/* eslint-disable react/prop-types */

import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";

const ProductUpdate = ({ updateProduct, setUpdateProduct, refetch, data }) => {
  const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const axiosPublic = UseAxiosPublic();

  const image = data?.photo;

  const handleForm = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.photo.files.length === 0) {
      const name = form.name.value;
      const price = form.price.value;
      const category = form.category.value;
      const photo = image;

      const item = { name, price, category, photo };

      axiosPublic.put(`/api/product/update/${data?._id}`, item).then((res) => {
        if (res?.data?.status === 200) {
          refetch();
          setUpdateProduct(false);
          toast.success(res.data.message);
        }
      });
    }

    if (form.photo.files[0]) {
      const imageFile = { image: form.photo.files[0] };
      // console.log(imageFile);
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const name = form.name.value;
        const price = form.price.value;
        const category = form.category.value;
        const photo = res?.data?.data?.display_url;

        const item = { name, price, category, photo };

        axiosPublic
          .put(`/api/product/update/${data?._id}`, item)
          .then((res) => {
            if (res?.data?.status === 200) {
              refetch();
              setUpdateProduct(false);
              toast.success(res.data.message);
            }
          });
      }
    }
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div
        onClick={() => setUpdateProduct(false)}
        className={`fixed z-[100] flex items-center justify-center ${
          updateProduct ? "visible opacity-100" : "invisible opacity-0"
        } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`text- absolute  rounded-sm  p-6 drop-shadow-lg  dark:text-white ${
            updateProduct
              ? "scale-1 opacity-1 duration-300"
              : "scale-0 opacity-0 duration-150"
          }`}
        >
          <div className="bg-white w-full glass rounded-md p-5 lg:p-10  mx-auto">
            <div className="text-end">
              {" "}
              <button
                onClick={() => setUpdateProduct(false)}
                className="text-red btn btn-sm text-red-500 hover:border-none btn-circle b bg-transparent hover:bg-red-500 text-xl transition-colors duration-200 hover:text-white border-red-500 focus:outline-none"
              >
                <RxCross2></RxCross2>
              </button>
            </div>
            <form onSubmit={handleForm}>
              <div>
                <img
                  src={data?.photo}
                  className="w-36 h-36 rounded-full border mx-auto mb-5"
                  alt="product image"
                />
              </div>

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
                  defaultValue={data?.name}
                  name="name"
                  placeholder="Name"
                  className="flex-1 py-2 overflow-hidden border-b-2 border-gray-400 focus:border-black
                text-gray-600 placeholder-gray-400
                outline-none"
                />
              </div>

              <div className="flex items-center mb-5">
                <label
                  className="inline-block w-20 mr-6 text-right 
                           font-bold text-gray-600"
                >
                  Category
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={data?.category}
                  name="category"
                  placeholder="Name"
                  className="flex-1 py-2 overflow-hidden border-b-2 border-gray-400 focus:border-black
                text-gray-600 placeholder-gray-400
                outline-none"
                />
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
                  defaultValue={data?.price}
                  name="price"
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
                  name="photo"
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
      </div>
    </div>
  );
};

export default ProductUpdate;
