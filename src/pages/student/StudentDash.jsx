import React from 'react'
import { useAuth } from '../../auth/AuthProvider';
import StudentTabs from './StudentTabs';


function StudentDash() {
  const {user,loggedIn}=useAuth();
  return (
    <div>Welcome to student portal
  <StudentTabs/>
<div>
        
      </div>


    </div>
  )
}

export default StudentDash