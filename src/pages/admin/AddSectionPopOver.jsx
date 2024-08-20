import React, { useRef, useState, useEffect } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Select, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddSectionPopOver() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { token } = useAuth();

  const notify = () => toast.success("Successfully added Section!");
  const notifyError = errorName => toast.error(errorName);

  // State variables for form data
  const [sectioncode, setSectionCode] = useState('');
  const [fk_course_id, setFkCourseId] = useState(0);
  const [fk_faculty_id, setFkFacultyId] = useState(0);
  const [fk_session_id, setFkSessionId] = useState(0);

  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [sessions, setSessions] = useState([]);

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(
      'http://localhost:5050/api/section/add-section',
      JSON.stringify({
        sectioncode,
        fk_course_id,
        fk_faculty_id,
        fk_session_id,
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
        navigate("/adminpanel");
        onClose();
      } else if (response.data.message === "exist") {
        notifyError("Section Already Exists!");
      }
    })
    .catch(error => {
      console.error('Error adding section:', error);
      notifyError("Error!");
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch courses
        const coursesResponse = await axios.get('http://localhost:5050/api/course/get-courses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCourses(coursesResponse.data);
        console.log('Courses:', coursesResponse.data);
  
        // Fetch faculties
        const facultiesResponse = await axios.get('http://localhost:5050/api/faculty/get-faculties', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFaculties(facultiesResponse.data);
        console.log('Faculties:', facultiesResponse.data);
  
        // Fetch sessions
        const sessionsResponse = await axios.get('http://localhost:5050/api/session/get-sessions', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setSessions(sessionsResponse.data);
        console.log('Sessions:', sessionsResponse.data);

      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <Button onClick={onOpen} bg='blue.500' color='white' _hover={{ bg: 'blue.600' }}>
        Register Section
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new section</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Section Code</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder='Section Code'
                  value={sectioncode}
                  onChange={(e) => setSectionCode(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Course</FormLabel>
                <Select placeholder='Select Course' value={fk_course_id} onChange={(e) => setFkCourseId(Number(e.target.value))}>
                  {courses.map(course => (
                    <option key={course.course_id} value={course.course_id}>{course.course_name}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Faculty</FormLabel>
                <Select placeholder='Select Faculty' value={fk_faculty_id} onChange={(e) => setFkFacultyId(Number(e.target.value))}>
                  {faculties.map(faculty => (
                    <option key={faculty.faculty_id} value={faculty.faculty_id}>{faculty.faculty_name}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Session</FormLabel>
                <Select placeholder='Select Session' value={fk_session_id} onChange={(e) => setFkSessionId(Number(e.target.value))}>
                  {sessions.map(session => (
                    <option key={session.session_id} value={session.session_id}>{session.sessioncode} ({session.startingdate} - {session.endingdate})</option>
                  ))}
                </Select>
              </FormControl>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} type='submit'>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddSectionPopOver;
