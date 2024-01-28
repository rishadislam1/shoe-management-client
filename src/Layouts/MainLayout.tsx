import { Link, Outlet, redirect } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { TiArrowUpThick } from "react-icons/ti";
import { FaArrowDownAZ } from "react-icons/fa6";
import { useAppDispatch } from "../Redux/hook";
import { userLoggedOut } from "../Redux/features/auth/authSlice";

const MainLayout = () => {
  const [show, setShow] = useState(true);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("auth");
    return redirect("/");
  };
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
       

          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <GiHamburgerMenu />
          </label>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content font-bold text-xl">
            {/* Sidebar content here */}
            <li className="mt-10">
              <button onClick={() => setShow(!show)}>
                Shoes Management{" "}
                {show ? (
                  <span>
                    <TiArrowUpThick />
                  </span>
                ) : (
                  <>
                    <FaArrowDownAZ />
                  </>
                )}
              </button>
              <ul className={`my-2 ${show ? "hidden" : ""}`}>
                <li className="my-3 text-blue-500">
                  <Link to="/home">All Shoe</Link>
                </li>
                <li className="text-blue-500">
                  <Link to="/home/addshoe">Add Shoe</Link>
                </li>
              </ul>
            </li>

            {/* sales management */}
            <li className="mt-5">
              <Link to="/home/sales">Sales Management</Link>
            </li>

            {/* sales history */}

            <li className="mt-5">
              <Link to="/home/history">Sales History</Link>
            </li>

            {/* logout */}

            <li className="mt-10">
              <button onClick={handleLogout}>LogOut</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
