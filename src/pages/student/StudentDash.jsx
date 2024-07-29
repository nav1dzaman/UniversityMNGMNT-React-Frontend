import React from 'react'
import { useAuth } from '../../auth/AuthProvider';


function StudentDash() {
  const {user,loggedIn}=useAuth();
  return (
    <div>StudentDash

<div>
        {user?.roles}
      </div>


    </div>
  )
}

export default StudentDash