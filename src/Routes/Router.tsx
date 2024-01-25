import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Registration/Login";
import Home from "../Pages/Home/Home.jsx";
import NotFound from "../Pages/NotFound.js";
import Signup from "../Pages/Registration/Signup.js";
import PublicRoute from "./PublicRoute.tsx";
import PrivateRoute from "./PrivateRoute.tsx";

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
          
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;