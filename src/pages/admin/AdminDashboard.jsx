import React from 'react'
import { useAuth } from '../../auth/AuthProvider';

function AdminDashboard() {

  const {user,loggedIn}=useAuth();
  return (
    <div>AdminDashboard


      <div>
        {user?.roles}
      </div>
    </div>
  )
}

export default AdminDashboard