import React from "react";

import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetSingleShoeQuery,
  useUpdateShoeMutation,
} from "../../Redux/features/shoe/shoeApi.ts";
import { useAppSelector } from "../../Redux/hook";

const UpdateShoe = () => {
  const { id } = useParams();

  const { user } = useAppSelector((state) => state.auth);

  const email = user?.email;

  const { data: shoeData } = useGetSingleShoeQuery({ email, id });

  const [updateShoe, { data: updateShoeData, isLoading }] =
    useUpdateShoeMutation();

  const handleShoeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const quantity = formData.get("quantity") as string;
    const date = formData.get("releaseDate") as string;
    const brand = formData.get("brand") as string;
    const model = formData.get("model") as string;
    const style = formData.get("style") as string;
    const size = formData.get("size") as string;
    const color = formData.get("color") as string;
    const material = formData.get("material") as string;

    const data = {
      productName: name,
      productPrice: price,
      productQuantity: quantity,
      releaseDate: date,
      brand,
      model,
      style,
      size,
      color,
      material,
      email: user?.email,
    };

    updateShoe({ data, id });
    e.currentTarget.reset();
  };

  if (updateShoeData && !isLoading) {
    Swal.fire({
      title: "Thanks",
      text: `Update Show Successfully`,
      icon: "success",
    });
  }
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="mt-10 font-bold text-2xl underline mb-20">
        Enter Your Products Details
      </h1>
      <form
        className="border p-10 rounded shadow-md"
        onSubmit={handleShoeSubmit}
      >
        {/* product name price */}
        <div className="w-full flex gap-10">
          <div>
            <label>Product Name</label>
            <br />
            <input
              defaultValue={shoeData?.productName}
              type="text"
              name="name"
              id="name"
              placeholder="enter product name"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label>Product Price</label>
            <br />
            <input
              defaultValue={shoeData?.productPrice}
              type="number"
              name="price"
              id="price"
              placeholder="enter product price"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* release date quantity */}

        <div className="w-full flex gap-10 mt-5">
          <div>
            <label>Product Quantity</label>
            <br />
            <input
              defaultValue={shoeData?.productQuantity}
              type="number"
              name="quantity"
              placeholder="enter product Quantity"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label>Release Date</label>
            <br />
            <input
              defaultValue={shoeData?.releaseDate}
              type="date"
              name="releaseDate"
              id=""
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* brand  model */}

        <div className="w-full flex gap-10 mt-5">
          <div>
            <label>Product Brand</label>
            <br />
            <input
              defaultValue={shoeData?.brand}
              type="text"
              name="brand"
              placeholder="enter product brand"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label>Product Model</label>
            <br />
            <input
              defaultValue={shoeData?.model}
              type="text"
              name="model"
              placeholder="enter product Model"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* style size */}

        <div className="w-full flex gap-10 mt-5">
          <div>
            <label>Product Style</label>
            <br />
            <input
              defaultValue={shoeData?.style}
              type="text"
              name="style"
              placeholder="enter product style"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label>Product Size</label>
            <br />
            <input
              defaultValue={shoeData?.size}
              type="text"
              name="size"
              placeholder="enter product size"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* color material */}

        <div className="w-full flex gap-10 mt-5">
          <div>
            <label>Product Color</label>
            <br />
            <input
              defaultValue={shoeData?.color}
              type="text"
              name="color"
              placeholder="enter product color"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label>Product Material</label>
            <br />
            <input
              defaultValue={shoeData?.material}
              type="text"
              name="material"
              placeholder="enter product material"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* submit button */}

        <button className="btn w-full mt-8 btn-accent">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateShoe;
