import { useEffect, useState } from "react";
import { useAppSelector } from "../../Redux/hook.ts";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useGetSalesQuery } from "../../Redux/features/sales/salesApi.ts";
import { format, startOfMonth } from 'date-fns';

const MonthlySales = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: shoeData, isLoading } = useGetSalesQuery(user?.email);

  const [selectFilters, setSelectFilters] = useState([]);

  useEffect(() => {
    // Sort the shoeData based on saleDate before setting selectFilters
    const sortedData = shoeData.slice().sort((a, b) => {
      const dateA = new Date(a.saleDate);
      const dateB = new Date(b.saleDate);
      return dateA - dateB;
    });

    setSelectFilters(sortedData);
  }, [shoeData]);

  // sales data by month
  const groupByMonth = () => {
    const groupedData = {};

    selectFilters?.forEach((shoe) => {
      const saleDate = new Date(shoe.saleDate);
      const monthStart = startOfMonth(saleDate);
      const monthKey = format(monthStart, 'yyyy-MM');

      if (!groupedData[monthKey]) {
        groupedData[monthKey] = [];
      }

      groupedData[monthKey].push(shoe);
    });

    return groupedData;
  };

  const monthlyData = groupByMonth();

  // loading state
  if (isLoading) {
    return <p>Loading.............</p>;
  }

  // full page
  return (
    <div className="m-10">
      {Object.keys(monthlyData).map((monthKey, index) => (
        <div key={index} className="overflow-x-auto">
          <h2 className="font-bold text-black">{`Month: ${format(new Date(monthKey), 'MMMM yyyy')}`}</h2>
          <table className="table ">
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
              {monthlyData[monthKey].map((shoe, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{shoe.productName}</td>
                  <td>{shoe.sellQuantity}</td>
                  <td>{shoe.buyerName}</td>
                  <td>{shoe.saleDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default MonthlySales;
