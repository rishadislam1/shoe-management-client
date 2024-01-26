
import { useState } from "react";
import { useGetShoeQuery } from "../../Redux/features/shoe/shoeApi.ts";
import './home.css';
import { useAppSelector } from "../../Redux/hook.ts";
import { Link } from "react-router-dom";

const Home = () => {

  const {user} = useAppSelector(state=>state.auth);
  const { data: shoeData, isLoading } = useGetShoeQuery(user?.email);

  const [allCheck, setAllCheck] = useState(false);

  const handleAllCheck = ()=>{
    setAllCheck(!allCheck);
  }


  if (isLoading) {
    return <p>Loading.............</p>;
  }
  return (
    <div className="">


      <table className="table">
        {/* head */}
        <thead className="font-bold text-black">
          <tr>
            <th>#</th>
            <th>
              <label>
                <input type="checkbox" className="checkbox" onClick={handleAllCheck} />
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
          {shoeData?.map((shoe, index) => (
            <tr key={shoe._id}>
              <td>{index + 1}</td>
              <td>
                <label>
                  {
                    allCheck?<input type="checkbox" className="checkbox" checked/>:<input type="checkbox" className="checkbox"/>
                  }
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
              <td><Link to={`/home/update/${shoe._id}`} className="btn btn-sm">Update</Link></td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Home;
