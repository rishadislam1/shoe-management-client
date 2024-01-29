import React, { useEffect, useState, ChangeEvent } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Swal from "sweetalert2";
import { usePostSalesMutation } from "../../Redux/features/sales/salesApi.ts";
import { useGetShoeQuery } from "../../Redux/features/shoe/shoeApi.ts";
import { useAppSelector } from "../../Redux/hook.ts";

interface Shoe {
  _id: string;
  productName: string;
  productPrice: string;
  productQuantity: string;
  releaseDate: string;
  brand: string;
  model: string;
  style: string;
  size: string;
  color: string;
  material: string;
}

const Sales: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: shoeData, isLoading } = useGetShoeQuery(user?.email);
  const userEmail = user?.email;
  // product search start

  const [selectFilters, setSelectFilters] = useState<Shoe[]>([]);
  const [modalState, setModalState] = useState('');
  const [salesData, setSalesData] = useState(false);

  useEffect(() => {
    setSelectFilters(shoeData || []);
  }, [shoeData]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSelectFilters(
      shoeData.filter((it: Shoe) => {
        return (
          (it.brand && it.brand.toLowerCase().includes(searchTerm)) ||
          (it.productName &&
            it.productName.toLowerCase().includes(searchTerm)) ||
          (it.productPrice && it.productPrice === searchTerm) ||
          (it.productQuantity && it.productQuantity === searchTerm) ||
          (it.releaseDate && it.releaseDate.includes(searchTerm)) ||
          (it.brand && it.brand.toLowerCase().includes(searchTerm)) ||
          (it.model && it.model.toLowerCase().includes(searchTerm)) ||
          (it.style && it.style.toLowerCase().includes(searchTerm)) ||
          (it.size && it.size.toLowerCase().includes(searchTerm)) ||
          (it.material && it.color.toLowerCase().includes(searchTerm))
        );
      })
    );
  };

  //   sales management
  const [postSales, { isLoading: isSalesLoading, data: salespostData }] =
    usePostSalesMutation();

  const handleSaleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    shoe: Shoe
  ) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const sellQuantity = formData.get("sellQuantity") as string;
    const buyerName = formData.get("buyerName") as string;
    const saleDate = formData.get("saleDate") as string;
    const productName = shoe.productName;
    const productId = shoe._id;
    const avaiableQuantity =
      Number(shoe.productQuantity) - Number(sellQuantity);

    const data = {
      sellQuantity,
      buyerName,
      saleDate,
      productName,
      productId,
      avaiableQuantity,
      userEmail,
    };
    postSales(data);
  };

  if (!isSalesLoading && salespostData?.status === true) {
    Swal.fire({
      title: "Congratulations",
      text: "Your Product Sell Successfully",
      icon: "success",
    });
  }

  //   loading state
  if (isLoading) {
    return <p>Loading.............</p>;
  }
  // full page
  return (
    <div className="">
      <h1 className="mb-5 text-xl">Search Product</h1>
      <div className="my-5 flex flex-wrap gap-10">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-error w-full max-w-xs lg:ml-20"
          onChange={handleSearch}
        />

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

      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead className="font-bold text-black">
            <tr>
              <th>#</th>

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
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn"
                    onClick={() => {
                      const modalElement = document.getElementById(
                        "my_modal_1"
                      ) as HTMLDialogElement | null;
                      setModalState(shoe.productQuantity);
                      modalElement?.showModal();
                    }}
                  >
                    Sell
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <h1 className="text-center font-bold text-xl mb-10 underline">
                        Fill Up The Details
                      </h1>
                      <form onSubmit={(e) => handleSaleSubmit(e, shoe)}>
                        Product Sales Quantity:{" "}
                        <input
                          required
                          type="number"
                          name="sellQuantity"
                          className="input input-bordered "
                          onChange={(e) => {
                            if (
                              Number(e.target.value) > Number(modalState) ||
                              Number(e.target.value) < 1
                            ) {
                              setSalesData(true);
                            } else {
                              setSalesData(false);
                            }
                          }}
                        />
                        {salesData && (
                          <>
                            <br />
                            <p className="mt-5 text-red-500">
                              Your quantity is more than the available quantity
                              or less than 1. Available is{" "}
                              {modalState}
                            </p>
                          </>
                        )}
                        <br />
                        <br />
                        Name Of The Buyer:{" "}
                        <input
                          type="text"
                          name="buyerName"
                          className="input input-bordered "
                          required
                        />
                        <br />
                        <br />
                        Date Of The Sale:{" "}
                        <input
                          required
                          type="date"
                          name="saleDate"
                          className="input input-bordered "
                        />
                        <br />
                        <br />
                        <button
                          className="btn btn-accent w-full"
                          disabled={salesData}
                        >
                          Sell Now
                        </button>
                      </form>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>

                  {/* 
                  <Link to={`/home/update/${shoe._id}`} className="btn btn-sm">
                    Sell
                  </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;
