import { useEffect, useState } from "react";
import { useAppSelector } from "../../Redux/hook.ts";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useGetSalesQuery } from "../../Redux/features/sales/salesApi.ts";
import { format, startOfWeek, endOfWeek } from 'date-fns';

interface Shoe {
  productName: string;
  sellQuantity: number;
  buyerName: string;
  saleDate: string;
}

const WeeklySales: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: shoeData, isLoading } = useGetSalesQuery(user?.email);
  // product search start

  const [selectFilters, setSelectFilters] = useState<Shoe[]>([]);

  useEffect(() => {
    const sortedData = (shoeData || []).slice().sort((a: Shoe, b: Shoe) => {
      const dateA = new Date(a.saleDate);
      const dateB = new Date(b.saleDate);
      return Number(dateA) - Number(dateB);
    });
    setSelectFilters(sortedData);
  }, [shoeData]);





   // sales data by week
   const groupByWeek = () => {
    const groupedData: { [key: string]: Shoe[] } = {};
    
    selectFilters?.forEach((shoe:Shoe) => {
      const saleDate = new Date(shoe.saleDate);
      const weekStart = startOfWeek(saleDate);
      const weekEnd = endOfWeek(saleDate);
      const weekKey = `${format(weekStart, 'yyyy-MM-dd')} - ${format(weekEnd, 'yyyy-MM-dd')}`;

      if (!groupedData[weekKey]) {
        groupedData[weekKey] = [];
      }

      groupedData[weekKey].push(shoe);
    });

    return groupedData;
  };

  const weeklyData = groupByWeek();
  //   loading state
  if (isLoading) {
    return <p>Loading.............</p>;
  }
  // full page
  return (
    <div className="m-10">
   

      {Object.keys(weeklyData).map((weekKey, index) => (
        <div key={index} className="overflow-x-auto">
          <h2 className="font-bold text-black">{`Week: ${weekKey}`}</h2>
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
              {weeklyData[weekKey].map((shoe, i) => (
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
      
      {/* select by price and date */}

    </div>
  );
};

export default WeeklySales;