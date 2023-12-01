import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {

  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Link,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
const Signup = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

   // Function to handle form submission
   const handleSubmit = (e) => {
     e.preventDefault();
     axios.post('https://tired-mite-tights.cyclic.app/user/register',{name, phone_number:phoneNumber, password, email }).then((r)=>{
      alert(r.data.message)
      navigate("/login")
     }).catch((e)=>{
       console.log(e)
      alert("Error while Signup ")
     })




   };
 
  return (
  
    <Box p={4} maxW={"400px"} m={"auto"} border='1px' borderColor='gray.200' mt="20">
      <VStack spacing={4} align="center">
        <Heading as="h2">Sign Up</Heading>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4} align="start" w="100%">
            {/* Name Input */}
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            {/* Email Input */}
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            {/* Phone Number Input */}
            <FormControl id="phoneNumber" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormControl>

            {/* Password Input */}
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            {/* Submit Button */}
            <Button type="submit" colorScheme="blue" w="100%">
              Sign Up
            </Button>
          </VStack>
        </form>

        {/* Additional Links (e.g., Already have an account?) */}
        <VStack spacing={2} align="start" w="100%">
          <Link href="/login">Already have an account? Login</Link>
        </VStack>
      </VStack>
    </Box>
  
  )
}

export default Signup
