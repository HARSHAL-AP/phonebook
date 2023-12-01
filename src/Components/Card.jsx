import React, { useState } from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  VStack,
  Button,
  IconButton,
  Collapse,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,FormControl,FormLabel
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon, ChatIcon, ViewIcon, CheckCircleIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { edit,remove} from "../features/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

const Card = ({ user, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Added state for editing mode
  const [editedUser, setEditedUser] = useState(user); // Added state for edited user
  const [showEditPopup, setShowEditPopup] = useState(false); // Added state for edit popup
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowEditPopup(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    setShowEditPopup(false);
    // Perform save edit logic and update user details in the parent component
    onEdit(editedUser);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setShowEditPopup(false);
    // Reset editedUser state to original user details
    setEditedUser(user);
  };

  const handleDelete = () => {

    axios
      .delete(`https://tired-mite-tights.cyclic.app/contactinfo/remove/${user._id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        dispatch(remove(user._id))
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });  
    
   
  };

  return (
    <Flex maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="4px">
      <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcJgJb4ZA4Yg4GvFyRv6pVr-I2we2BPvJ76fltjM4LFA&s" alt={`${user.name}'s Image`} boxSize="100px" />

      <VStack align="start" flex="1" p="4">
        <Text fontSize="lg" fontWeight="bold">
          {isEditing ? (
            <Input
              value={editedUser.name}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
            />
          ) : (
            user.name
          )}
        </Text>

        <Text fontSize="sm">
          <Badge colorScheme="blue" mr="1">
            Contact No:
          </Badge>
          {isEditing ? (
            <Input
              value={editedUser.contactNumber}
              onChange={(e) => setEditedUser({ ...editedUser, contactNumber: e.target.value })}
            />
          ) : (
            user.contactNumber
          )}
        </Text>
      </VStack>

      <Flex direction="column">
        <IconButton
          aria-label="Call"
          icon={<PhoneIcon />}
          colorScheme="green"
          size="sm"
          mb="2"
        />
       
        
        {/* Edit and Delete buttons */}
        <IconButton
          aria-label="Edit"
          icon={<EditIcon />}
          colorScheme="yellow"
          size="sm"
          onClick={handleEdit}
        />
        <IconButton
          aria-label="Delete"
          icon={<DeleteIcon />}
          colorScheme="red"
          size="sm"
          onClick={handleDelete}
        />
      </Flex>

      {/* Details Popup */}
      <Modal isOpen={isOpen} onClose={handleToggle} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Display all details of the contact */}
            <Text>Name: {user.name}</Text>
            <Text>Contact Number: {user.contactNumber}</Text>
            {/* Add more details as needed */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleToggle}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Popup */}
      <Modal isOpen={showEditPopup} onClose={handleCancelEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Editable fields */}
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contact Number</FormLabel>
              <Input
                value={editedUser.contactNumber}
                onChange={(e) => setEditedUser({ ...editedUser, contactNumber: e.target.value })}
              />
            </FormControl>
            {/* Add more editable fields as needed */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button onClick={handleCancelEdit}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Card;
