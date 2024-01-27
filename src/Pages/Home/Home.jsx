import { useState } from "react";
import { useDeleteAllShoeMutation, useDeleteShoeMutation, useGetShoeQuery } from "../../Redux/features/shoe/shoeApi.ts";
import "./home.css";
import { useAppSelector } from "../../Redux/hook.ts";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: shoeData, isLoading } = useGetShoeQuery(user?.email);
  const [deleteShoe,{isLoading:deleteLoading, data:deleteShoeData}] = useDeleteShoeMutation();
  const [deleteAllShoe,{isLoading:deleteAllLoading, data:deleteAllData}] = useDeleteAllShoeMutation();


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

  const handleDelete = ()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        if(allCheck === true){
          deleteAllShoe();
        }
        else{
          deleteShoe({ids: isChecked});
        }
        
       
      }
    });
    

  }
  if(!deleteLoading && deleteShoeData?.success===true && !allCheck){
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
  else if(!deleteAllLoading && deleteAllData?.success===true && isChecked.length===0){
    Swal.fire({
      title: "Deleted!",
      text: "All File Deleted",
      icon: "success"
    });
  }

  if (isLoading) {
    return <p>Loading.............</p>;
  }
  return (
    <div className="">
      <button className={`btn btn-error text-gray-200 transition-all delay-1000 ${(isChecked.length>0 || allCheck)?'':'hidden'} `} onClick={handleDelete}> Delete</button>

      <table className="table overflow-x-auto">
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
          {shoeData?.map((shoe, index) => (
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
  );
};

export default Home;
