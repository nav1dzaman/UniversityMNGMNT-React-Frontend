import React, { useRef, useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddStudentPopOver() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { token } = useAuth();

  const notify = () => toast.success("Successfully added Student!");
  const notifyError = errorName => toast.error(errorName);

  // State variables for form data
  const [student_name, setStudent_name] = useState('');
  const [student_email, setStudent_email] = useState('');
  const [student_address, setStudent_address] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(student_email)
    console.log(student_address)
    console.log(token)
    axios.post(
        'http://localhost:5050/api/students/register-student', // Update the URL as needed
        JSON.stringify({
        
          student_email,
          student_name,
          password,
          student_address,
         
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
            notifyError("Student Already Exist!")
        }
      })
      .catch(error => {
        console.error('Error registering student:', error);
        notifyError("Error!")
      });
  };

  return (
    <>
      <Button onClick={onOpen} bg='blue.500' color='white' _hover={{ bg: 'blue.600' }}>
        Register Student
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
                  placeholder='Student name'
                  value={student_name}
                  onChange={(e) => setStudent_name(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Student Email</FormLabel>
                <Input
                  placeholder='Student Email'
                  type='email'
                  value={student_email}
                  onChange={(e) => setStudent_email(e.target.value)}
                />
              </FormControl>
              
              <FormControl mt={4} isRequired>
                <FormLabel>Student Address</FormLabel>
                <Input
                  placeholder='Student Address'
                  value={student_address}
                  onChange={(e) => setStudent_address(e.target.value)}
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

export default AddStudentPopOver;
