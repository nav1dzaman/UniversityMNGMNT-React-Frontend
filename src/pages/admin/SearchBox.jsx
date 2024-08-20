import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useAuth } from '../../auth/AuthProvider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Checkbox = ({ children, ...props }) => (
  <label style={{ marginRight: '1em' }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

const SearchBox = () => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [students, setStudents] = useState([]);
  const [sections, setSections] = useState([]);
  const [studentId, setStudentId] = useState(null);
  const [sectionId, setSectionId] = useState(null);
  const [grade, setGrade] = useState(0.00);

  const { token } = useAuth();

  const notify = () => toast.success("Successfully Course Assigned!");
  const notifyError = errorName => toast.error(errorName);

  useEffect(() => {
    axios.get('http://localhost:5050/api/students/get-students', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setStudents(response.data);
    })
    .catch(error => {
      console.error('Error fetching students:', error);
    });

    axios.get('http://localhost:5050/api/section/get-sections', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setSections(response.data);
    })
    .catch(error => {
      console.error('Error fetching sections:', error);
    });
  }, [token]);

  const studentOptions = students.map(student => ({
    value: student.student_id, // Assuming this is already a number
    label: student.student_email
  }));

  const sectionOptions = sections.map(section => ({
    value: section.section_id, // Assuming this is already a number
    label: `${section.sectioncode} (${section.sessionName})`
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(
      'http://localhost:5050/api/enrollment/enroll-student',
      JSON.stringify({
        studentId: Number(studentId), // Convert to number
        sectionId: Number(sectionId), // Convert to number
        grade
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )
    .then(response => {
      console.log(response.data);
      if (response.data.message === "ok") {
        notify();
      } else if (response.data.message === "exist") {
        notifyError("Course already Assigned!");
      }
    })
    .catch(error => {
      console.error('Error Course Registering:', error);
      notifyError("Error!");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className='text-xl font-bold p-2 m-3'>Enter Student Email*</h1>
      <Select
        className="basic-single"
        classNamePrefix="select"
        value={studentOptions.find(option => option.value === studentId)}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="student"
        options={studentOptions}
        onChange={selectedOption => setStudentId(selectedOption ? Number(selectedOption.value) : null)} // Convert to number
      />

      <h1 className='text-xl font-bold p-2 m-3'>Select Section*</h1>
      <Select
        className="basic-single"
        classNamePrefix="select"
        value={sectionOptions.find(option => option.value === sectionId)}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="section"
        options={sectionOptions}
        onChange={selectedOption => setSectionId(selectedOption ? Number(selectedOption.value) : null)} // Convert to number
      />

      <div
        style={{
          color: 'hsl(0, 0%, 40%)',
          display: 'inline-block',
          fontSize: 12,
          fontStyle: 'italic',
          marginTop: '1em',
        }}
      >
        {/* Add additional form controls here if needed */}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 mt-5"
        
      >
        Submit
      </button>

      <ToastContainer />
    </form>
  );
};

export default SearchBox;
