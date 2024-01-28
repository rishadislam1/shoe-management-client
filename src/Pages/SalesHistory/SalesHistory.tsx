import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useGetSalesQuery } from "../../Redux/features/sales/salesApi.ts";
import { useAppSelector } from "../../Redux/hook.ts";

const SalesHistory = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: shoeData, isLoading } = useGetSalesQuery(user?.email);
  // product search start

  const [selectFilters, setSelectFilters] = useState([]);

  useEffect(() => {
    setSelectFilters(shoeData);
  }, [shoeData]);

  const handleSearch = (e: Event) => {
    const searchTerm = e.target.value;
    setSelectFilters(
      shoeData.filter((it) => {
        return (
          (it.productName &&
            it.productName.toLowerCase().includes(searchTerm)) ||
          (it.sellQuantity && it.sellQuantity === searchTerm) ||
          (it.buyerName && it.buyerName.toLowerCase().includes(searchTerm)) ||
          (it.saleDate && it.saleDate.includes(searchTerm))
        );
      })
    );
  };

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
              <th>Sell Quantity</th>
              <th>Buyer Name</th>
              <th>Sales Date</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {selectFilters?.map((shoe, index) => (
              <tr key={shoe._id}>
                <td>{index + 1}</td>

                <td>{shoe.productName}</td>
                <td>{shoe.sellQuantity}</td>
                <td>{shoe.buyerName}</td>
                <td>{shoe.saleDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesHistory;
