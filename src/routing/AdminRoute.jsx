import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import ErrorPage from '../pages/ErrorPage';
function AdminRoute({children}) {
    const {user,loggedIn}=useAuth();
  
     if(user?.roles==="ADMIN"){
        return <>{children}</>
     }
     else return <ErrorPage/>
  
}

export default AdminRoute