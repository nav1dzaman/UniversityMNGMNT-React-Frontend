import React from 'react'

import { useAuth } from '../../auth/AuthProvider';
import axios from 'axios';

function StudentCourses() {

  const { user,token } = useAuth();

  return (
    <div>
       
         
      {user.email}
        
    
    </div>
  )
}

export default StudentCourses