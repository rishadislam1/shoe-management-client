import { useEffect, useState } from "react";
import {
  useDeleteAllShoeMutation,
  useDeleteShoeMutation,
  useGetShoeQuery,
} from "../../Redux/features/shoe/shoeApi.ts";
import "./home.css";
import { useAppSelector } from "../../Redux/hook.ts";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: shoeData, isLoading } = useGetShoeQuery(user?.email);
  const [deleteShoe, { isLoading: deleteLoading, data: deleteShoeData }] =
    useDeleteShoeMutation();
  const [deleteAllShoe, { isLoading: deleteAllLoading, data: deleteAllData }] =
    useDeleteAllShoeMutation();

  // product checked
  const [allCheck, setAllCheck] = useState(false);
  const [isChecked, setIsChecked] = useState([]);

  const handleAllCheck = () => {
    setIsChecked([]);
    setAllCheck(!allCheck);
  };

  const handleCheckedbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setIsChecked([...isChecked, value]);
    } else {
      setIsChecked(isChecked.filter((e) => e !== value));
    }
  };
  // product delete
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (allCheck === true) {
          deleteAllShoe();
        } else {
          deleteShoe({ ids: isChecked });
        }
      }
    });
  };

  if (!deleteLoading && deleteShoeData?.success === true && !allCheck) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
    });
  } else if (
    !deleteAllLoading &&
    deleteAllData?.success === true &&
    isChecked.length === 0
  ) {
    Swal.fire({
      title: "Deleted!",
      text: "All File Deleted",
      icon: "success",
    });
  }

  // product delete end

  // product filter start
  const maxPrice = shoeData?.reduce((max, shoe) => {
    const productPrice = parseFloat(shoe.productPrice);
    return isNaN(productPrice) ? max : Math.max(max, productPrice);
  }, 0);

  const [selectFilters, setSelectFilters] = useState([]);
  const [brandSelect, setBrandSelect] = useState("all");
  const [modelSelect, setModelSelect] = useState("all");
  const [styleSelect, setStyleSelect] = useState("all");
  const [sizeSelect, setSizeSelect] = useState("all");
  const [colorSelect, setColorSelect] = useState("all");
  const [priceSelect, setPriceSelect] = useState(maxPrice);

  useEffect(() => {
    setSelectFilters(shoeData);
    setPriceSelect(maxPrice);
  }, [shoeData, maxPrice]);

  const handleFilterButton = (value, item) => {
    if (selectFilters.length === 0) {
      console.log("Product Not Found");
      setSelectFilters(shoeData);
    } else if (selectFilters.length !== 0) {
      if (item === "brand") {
        setBrandSelect(value);
      }
      if (item === "model") {
        setModelSelect(value);
      }
      if (item === "style") {
        setStyleSelect(value);
      }
      if (item === "size") {
        setSizeSelect(value);
      }
      if (item === "color") {
        setColorSelect(value);
      }
    }
  };

  const handleSearch = () => {
    setSelectFilters(
      shoeData.filter((it) => {
        return (
          it.brand === brandSelect ||
          it.model === modelSelect ||
          it.style === styleSelect ||
          it.size === sizeSelect ||
          it.color === colorSelect ||
          it.productPrice === priceSelect
        );
      })
    );
  };

  const handlePrice = (e) => {
    setPriceSelect(e.target.value);
    setSelectFilters(
      shoeData.filter((it) => {
        return it.productPrice <= e.target.value;
      })
    );
  };
  // date

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (date) => {
    const filterd = shoeData.filter((shoe) => {
      const shoeData1 = new Date(shoe["releaseDate"]);
      return (
        shoeData1 >= date.selection.startDate &&
        shoeData1 <= date.selection.endDate
      );
    });
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setSelectFilters(filterd);
  };

  const filters = ["brand", "model", "style", "size", "color"];

  if (isLoading) {
    return <p>Loading.............</p>;
  }

  return (
    <div className="">
      <h1 className="mb-5 text-xl">Select Your Filter</h1>
      <div className="my-5 flex flex-wrap gap-10">
        {filters.map((item, index) => (
          <div key={index}>
            {" "}
            <select
              onChange={(e) => handleFilterButton(e.target.value, item)}
              className="select select-bordered w-full max-w-xs"
              defaultValue={`Select ${item}`}
            >
              <option name="all" disabled>
                Select {item}
              </option>
              {item === "brand" && (
                <>
                  {" "}
                  {shoeData?.map((shoe) => (
                    <option key={shoe._id} name={shoe.brand}>
                      {shoe.brand}
                    </option>
                  ))}
                </>
              )}
              {item === "model" && (
                <>
                  {" "}
                  {shoeData?.map((shoe) => (
                    <option key={shoe._id} name={shoe.model}>
                      {shoe.model}
                    </option>
                  ))}
                </>
              )}
              {item === "style" && (
                <>
                  {" "}
                  {shoeData?.map((shoe) => (
                    <option key={shoe._id} name={shoe.style}>
                      {shoe.style}
                    </option>
                  ))}
                </>
              )}
              {item === "size" && (
                <>
                  {" "}
                  {shoeData?.map((shoe) => (
                    <option key={shoe._id} name={shoe.size}>
                      {shoe.size}
                    </option>
                  ))}
                </>
              )}
              {item === "color" && (
                <>
                  {" "}
                  {shoeData?.map((shoe) => (
                    <option key={shoe._id} name={shoe.color}>
                      {shoe.color}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
        ))}

        <button className="btn btn-success text-white" onClick={handleSearch}>
          Search
        </button>

        <button
          className="btn btn-accent "
          onClick={() => {
            setSelectFilters(shoeData);
          }}
        >
          Show All Data
        </button>
      </div>
      {/* select by price and date */}
      <div className="my-5">
        <h1 className="font-bold text-xl">Select By Price And Date</h1>
        <div className="flex flex-wrap items-center md:justify-center justify-start gap-20 px-10">
          <div className="xl:w-1/4 w-full mt-5">
            <div className="flex flex-wrap justify-around font-bold">
              <p className="text-red-500">0</p>
              <p className="text-blue-500">{priceSelect}</p>
              <p className="text-green-900">{maxPrice}</p>
            </div>
            <input
              type="range"
              name="price"
              min={"0"}
              max={maxPrice}
              step={"1"}
              value={priceSelect}
              className="w-full"
              onChange={handlePrice}
            />
          </div>
          <div className="overflow-x-auto">
            <DateRangePicker
         
              ranges={[selectionRange]}
              onChange={handleSelect}
            />
          </div>
        </div>
      </div>
      <button
        className={`btn btn-error text-gray-200 transition-all delay-1000 ${
          isChecked.length > 0 || allCheck ? "" : "hidden"
        } `}
        onClick={handleDelete}
      >
        {" "}
        Delete
      </button>

   <div className="overflow-x-auto">
   <table className="table ">
        {/* head */}
        <thead className="font-bold text-black">
          <tr>
            <th>#</th>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  onClick={handleAllCheck}
                />
              </label>
            </th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Quantity</th>
            <th>Release Date</th>
            <th>Product Brand</th>
            <th>Product Model</th>
            <th>Style</th>
            <th>Product Size</th>
            <th>Product Color</th>
            <th>Product Material</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {selectFilters?.map((shoe, index) => (
            <tr key={shoe._id}>
              <td>{index + 1}</td>
              <td>
                <label>
                  {allCheck ? (
                    <input type="checkbox" className="checkbox" checked />
                  ) : (
                    <input
                      type="checkbox"
                      className="checkbox"
                      value={shoe._id}
                      checked={shoe.isChecked}
                      onChange={handleCheckedbox}
                    />
                  )}
                </label>
              </td>
              <td>{shoe.productName}</td>
              <td>{shoe.productPrice}</td>
              <td>{shoe.productQuantity}</td>
              <td>{shoe.releaseDate}</td>
              <td>{shoe.brand}</td>
              <td>{shoe.model}</td>
              <td>{shoe.style}</td>
              <td>{shoe.size}</td>
              <td>{shoe.color}</td>
              <td>{shoe.material}</td>
              <td>
                <Link to={`/home/update/${shoe._id}`} className="btn btn-sm">
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
   </div>
    </div>
  );
};

export default Home;
