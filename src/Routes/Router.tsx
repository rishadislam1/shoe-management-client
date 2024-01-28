import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Registration/Login";
import Home from "../Pages/Home/Home.jsx";
import NotFound from "../Pages/NotFound.js";
import Signup from "../Pages/Registration/Signup.js";
import PublicRoute from "./PublicRoute.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import AddShoe from "../Pages/AddShoe/AddShoe.tsx";
import Sales from "../Pages/Sales/Sales.tsx";
import SalesHistory from "../Pages/SalesHistory/SalesHistory.tsx";
import UpdateShoe from "../Pages/UpdateShoe/UpdateShoe.tsx";
import WeeklySales from "../Pages/SalesHistory/WeeklySales.tsx";
import DailySales from "../Pages/SalesHistory/DailySales.tsx";
import YearlySales from "../Pages/SalesHistory/YearlySales.tsx";
import MonthlySales from "../Pages/SalesHistory/MonthlySales.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicRoute><Login/></PublicRoute>
    },
    {
        path: '/signup',
        element: <PublicRoute><Signup/></PublicRoute>
    },
    {
        path: '/home',
        element: <PrivateRoute><MainLayout/></PrivateRoute>,
        children:[
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/home/addshoe',
                element: <AddShoe/>
            },
            {
                path: '/home/sales',
                element: <Sales/>
            },
            {
                path: '/home/history',
                element: <SalesHistory/>
            },
            {
                path: '/home/update/:id',
                element: <UpdateShoe/>
            },
            {
                path: '/home/weekly',
                element: <WeeklySales/>
            },
            {
                path: '/home/daily',
                element: <DailySales/>
            },
            {
                path: '/home/yearly',
                element: <YearlySales/>
            },
            {
                path: '/home/monthly',
                element: <MonthlySales/>
            }
          
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;