import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Registration/Login";
import Home from "../Pages/Home/Home.jsx";
import NotFound from "../Pages/NotFound.js";
import Signup from "../Pages/Registration/Signup.js";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/signup',
        element: <Signup/>
    },
    {
        path: '/home',
        element: <MainLayout/>,
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