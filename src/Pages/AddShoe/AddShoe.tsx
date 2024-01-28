import Swal from "sweetalert2";
import { useAddShoeMutation } from "../../Redux/features/shoe/shoeApi.ts";
import { useAppSelector } from "../../Redux/hook";

const AddShoe = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [addShoe, { data: addShoeData, isLoading }] = useAddShoeMutation();

  const handleShoeSubmit = (e: Event) => {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const quantity = e.target.quantity.value;
    const date = e.target.releaseDate.value;
    const brand = e.target.brand.value;
    const model = e.target.model.value;
    const style = e.target.style.value;
    const size = e.target.size.value;
    const color = e.target.color.value;
    const material = e.target.material.value;

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

    addShoe(data);
    e.target.reset();
  };

  if (addShoeData && !isLoading) {
    Swal.fire({
      title: "Thanks",
      text: `${addShoeData?.message}`,
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
              type="text"
              name="material"
              placeholder="enter product material"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* submit button */}

        <button className="btn w-full mt-8 btn-accent">Add Product</button>
      </form>
    </div>
  );
};

export default AddShoe;
