import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Registration/Login";
import Home from "../Pages/Home/Home.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/home',
        element: <MainLayout/>,
        children:[
            {
                path: '/home',
                element: <Home/>
            }
        ]
    }
])

export default router;