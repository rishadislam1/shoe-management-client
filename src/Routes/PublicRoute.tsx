import React, { ReactNode } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({children}) => {

    const isLoggedIn = useAuth();

    const location = useLocation();

    const from = location?.state?.from?.pathname;
    
    if(!isLoggedIn){
        return children;
    }
    else{
        return <Navigate to ={from?from:'/home'}></Navigate>
    }
};

export default PublicRoute;