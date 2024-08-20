import React, { useRef, useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

function AddSessionPopOver() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { token } = useAuth();

  const notify = () => toast.success("Successfully added Session!");
  const notifyError = errorName => toast.error(errorName);

  // State variables for form data
  const [sessioncode, setsessioncode] = useState('');
  const [startingdate, setstartingdate] = useState('');
  const [endingdate, setendingdate] = useState('');

  const navigate = useNavigate();

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setState([ranges.selection]);
    setstartingdate(formatDate(startDate));
    setendingdate(formatDate(endDate));
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`)
    return `${year}-${month}-${day}`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    axios.post(
        'http://localhost:5050/api/session/add-session', // Update the URL as needed
        JSON.stringify({
          sessioncode,
          startingdate,
          endingdate,
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
              
        if(response.data.message === "ok"){
          notify();
          navigate("/adminpanel");
          onClose();
        }
        else if(response.data.message === "exist"){
          notifyError("Session Already Exists!");
        }
      })
      .catch(error => {
        console.error('Error adding session:', error);
        notifyError("Error!");
      });
  };

  return (
    <>
      <Button onClick={onOpen} bg='blue.500' color='white' _hover={{ bg: 'blue.600' }}>
        Register Session
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Session</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Session Code</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder='Session Code'
                  value={sessioncode}
                  onChange={(e) => setsessioncode(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Date Range</FormLabel>
                <DateRange
                  editableDateInputs={true}
                  onChange={handleSelect}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
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

      <ToastContainer />
    </>
  );
}

export default AddSessionPopOver;
