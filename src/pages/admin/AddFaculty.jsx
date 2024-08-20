import React, { useEffect, useState } from 'react';
import AddStudentPopOver from './AddStudentPopOver';
import { useAuth } from '../../auth/AuthProvider';
import axios from 'axios';
import CustomPaginationActionsTable from '../table/CustomPaginationActionsTable';
import AddFacultyPopOver from './AddFacultyPopOver';
import CustomPaginationActionsTableFaculty from '../table/CustomPaginationActionsTableFaculty';
function AddFaculty() {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch student data when the component mounts
    axios.get('http://localhost:5050/api/faculty/get-faculties', { // Update the URL as needed
      headers: {
        'Authorization': `Bearer ${token}` // Include token in headers
      }
    })
    .then(response => {
      setStudents(response.data);
      console.log(response.data)
    })
    .catch(error => {
      console.error('Error fetching students:', error);
    });
  }, [token]); // Dependency array ensures useEffect runs when token changes

  return (
    <div>
      <h1 className='text-2xl font-bold p-2 m-3'>Register Faculty</h1>

      <div className='flex  ml-[87%]'>
        <AddFacultyPopOver />
      </div>

      <div>
        {/* <h2 className='text-xl font-semibold p-2'>List of Students</h2> */}
        {/* <ul>
          {students.length > 0 ? (
            students.map((student) => (
              <li key={student.student_id} className='p-2'>
                {student.student_name} ({student.student_email})
              </li>
            ))
          ) : (
            <p>No students found.</p>
          )}
        </ul> */}

        {
          students?.length>0 ? <CustomPaginationActionsTableFaculty data={students}/>:"No students registered"
        }

        {/* {
          students.map((student) => (
           <h1>{student.student_name}</h1>
          ))
        } */}
      </div>
    </div>
  )
}

export default AddFaculty