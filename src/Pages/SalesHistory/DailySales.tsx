import { useEffect, useState } from "react";
import { useAppSelector } from "../../Redux/hook.ts";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useGetSalesQuery } from "../../Redux/features/sales/salesApi.ts";
import { format, startOfDay } from 'date-fns';


interface Shoe {
  productName: string;
  sellQuantity: number;
  buyerName: string;
  saleDate: string;
}


const DailySales: React.FC = () => {
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

  // sales data by day
  const groupByDay = () => {
    const groupedData: { [key: string]: Shoe[] } = {};
    
    selectFilters?.forEach((shoe:Shoe) => {
      const saleDate = new Date(shoe.saleDate);
      const dayStart = startOfDay(saleDate);
      const dayKey = format(dayStart, 'yyyy-MM-dd');
      
      if (!groupedData[dayKey]) {
        groupedData[dayKey] = [];
      }

      groupedData[dayKey].push(shoe);
    });

    return groupedData;
  };

  const dailyData = groupByDay();

  // loading state
  if (isLoading) {
    return <p>Loading.............</p>;
  }

  // full page
  return (
    <div className="m-10">
      {Object.keys(dailyData).map((dayKey, index) => (
        <div key={index} className="overflow-x-auto">
          <h2 className="font-bold text-black">{`Day: ${format(new Date(dayKey), 'EEEE, MMMM d')}`}</h2>
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
              {dailyData[dayKey].map((shoe, i) => (
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

export default DailySales;
