import React, { ReactNode } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode;
  }

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {

    const isLoggedIn = useAuth();
    const location = useLocation();
console.log(isLoggedIn)
    if(isLoggedIn){
        return children;
    }
    else{
        return <Navigate to='/' state={{from:location}} replace></Navigate>
    }
};

export default PrivateRoute;