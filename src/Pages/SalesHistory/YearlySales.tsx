import { useEffect, useState } from "react";
import { useAppSelector } from "../../Redux/hook.ts";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useGetSalesQuery } from "../../Redux/features/sales/salesApi.ts";
import { format, startOfYear } from 'date-fns';


interface Shoe {
  productName: string;
  sellQuantity: number;
  buyerName: string;
  saleDate: string;
}


const YearlySales: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: shoeData, isLoading } = useGetSalesQuery(user?.email);

  const [selectFilters, setSelectFilters] = useState<Shoe[]>([]);

  useEffect(() => {
    // Sort the shoeData based on saleDate before setting selectFilters
    const sortedData = (shoeData || []).slice().sort((a: Shoe, b: Shoe) => {
      const dateA = new Date(a.saleDate);
      const dateB = new Date(b.saleDate);
      return Number(dateA) - Number(dateB);
    });

    setSelectFilters(sortedData);
  }, [shoeData]);

  // sales data by year
  const groupByYear = () => {
    const groupedData: { [key: string]: Shoe[] } = {};

    selectFilters?.forEach((shoe) => {
      const saleDate = new Date(shoe.saleDate);
      const yearStart = startOfYear(saleDate);
      const yearKey = format(yearStart, 'yyyy');

      if (!groupedData[yearKey]) {
        groupedData[yearKey] = [];
      }

      groupedData[yearKey].push(shoe);
    });

    return groupedData;
  };

  const yearlyData = groupByYear();

  // loading state
  if (isLoading) {
    return <p>Loading.............</p>;
  }

  // full page
  return (
    <div className="m-10">
      {Object.keys(yearlyData).map((yearKey, index) => (
        <div key={index} className="overflow-x-auto">
          <h2 className="font-bold text-black">{`Year: ${yearKey}`}</h2>
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
              {yearlyData[yearKey].map((shoe, i) => (
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

export default YearlySales;
