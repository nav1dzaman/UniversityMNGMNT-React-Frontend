import React from 'react'
import { useAuth } from '../../auth/AuthProvider';

function FacultyPanel() {

  const {user,loggedIn}=useAuth();
  return (
    <div>FacultyPanel

<div>
        {user?.roles}
      </div>
    </div>
  )
}

export default FacultyPanel