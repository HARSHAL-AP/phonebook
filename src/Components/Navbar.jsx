import React,{useState} from "react";
import { logout } from "../features/authSlice";
import { add } from "../features/contactSlice";
import {  Box,
  Flex,
  Heading,
  Button,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,} from "@chakra-ui/react";
  import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios  from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    address: "",
  });
 
  const token = useSelector((state) => state.auth.token);
  const onOpen = () => setIsOpen(true);
  const onClose = () => {
    setIsOpen(false);
    // Clear the form data when closing the modal
    setFormData({
      name: "",
      contactNumber: "",
      email: "",
      address: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddContact = () => {
    axios
      .post("https://tired-mite-tights.cyclic.app/contactinfo/create",formData, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        dispatch(add(response.data.data));
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });  
    onClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box bg="blue.800" p={4} color="white">
      <Flex align="center">
        <Heading as="h1" size="lg">
          Phonebook
        </Heading>

        <Spacer />

        <Button colorScheme="green" mr={2} onClick={onOpen}>
          Add
        </Button>

        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Contact</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Contact Number</FormLabel>
                <Input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" onClick={handleAddContact}>
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
};

export default Navbar;