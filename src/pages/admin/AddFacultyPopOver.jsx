import React, { useRef, useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddFacultyPopOver() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { token } = useAuth();

  const notify = () => toast.success("Successfully added faculty!");
  const notifyError = errorName => toast.error(errorName);

  // State variables for form data
  const [faculty_name, setfaculty_name] = useState('');
  const [faculty_email, setfaculty_email] = useState('');
  
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    axios.post(
        'http://localhost:5050/api/faculty/register-faculty', // Update the URL as needed
        JSON.stringify({
        
         
          faculty_name,
          faculty_email,
          password,
      
         
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
            notifyError("Faculty Already Exist!")
        }
      })
      .catch(error => {
        console.error('Error registering faculty:', error);
        notifyError("Error!")
      });
  };

  return (
    <>
      <Button onClick={onOpen} bg='blue.500' color='white' _hover={{ bg: 'blue.600' }}>
        Register Faculty
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register a new student</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Student Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder='Faculty name'
                  value={faculty_name}
                  onChange={(e) => setfaculty_name(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Faculty Email</FormLabel>
                <Input
                  placeholder='Faculty Email'
                  type='email'
                  value={faculty_email}
                  onChange={(e) => setfaculty_email(e.target.value)}
                />
              </FormControl>
              
              
              
              <FormControl mt={4} isRequired>
                <FormLabel>Portal Password</FormLabel>
                <Input
                  type='password'
                  placeholder='Portal Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

export default AddFacultyPopOver;
