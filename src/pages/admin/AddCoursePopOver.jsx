import React, { useRef, useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCousePopOver() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { token } = useAuth();

  const notify = () => toast.success("Successfully added Student!");
  const notifyError = errorName => toast.error(errorName);

  // State variables for form data
  const [course_name, setCourse_name] = useState('');
  const [coursecode, setCoursecode] = useState('');

  const navigate=useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    axios.post(
        'http://localhost:5050/api/course/add-course', // Update the URL as needed
        JSON.stringify({
        
          course_name,
          coursecode,
         
        }),
        {
          headers: {
            'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}` // Include token if required
          }
        }
      )
      .then(response => {
        console.log(response.data);
              
        if(response.data.message==="ok"){
        notify()
        navigate("/adminpanel")
        onClose()

        }
        else if(response.data.message==="exist"){
            notifyError("Course Already Exist!")
        }
      })
      .catch(error => {
        console.error('Error registering Course:', error);
        notifyError("Error!")
      });
  };

  return (
    <>
      <Button onClick={onOpen} bg='blue.500' color='white' _hover={{ bg: 'blue.600' }}>
        Register Course
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Course</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Course Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder='Course Name'
                  value={course_name}
                  onChange={(e) => setCourse_name(e.target.value)}
                />
              </FormControl>

        
              
              <FormControl mt={4} isRequired>
                <FormLabel>COurse Code</FormLabel>
                <Input
                  placeholder='Course Code'
                  value={coursecode}
                  onChange={(e) => setCoursecode(e.target.value)}
                />
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

export default AddCousePopOver;
