import React, { useState } from 'react';
import {  Box, Heading, FormControl, FormLabel, Input, Button, VStack, Link } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {login} from "../features/authSlice"
import { useNavigate } from "react-router-dom";

const Login = () => {
   const dispatch=useDispatch();
   const navigate=useNavigate();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
 
   // Function to handle form submission
   const handleSubmit = (e) => {
     e.preventDefault();
     axios.post('https://tired-mite-tights.cyclic.app/user/login',{email,password}).then((r)=>{
       dispatch(login(r.data.token))
        navigate("/")
     }).catch((e)=>{
       console.log(e)
       alert("Error While Login ...")
     })




   };
 
   return (
     
       <Box p={4} maxW={"400px"} m={"auto"} border='1px' borderColor='gray.200' mt="20">
         <VStack spacing={4} align="center">
           <Heading as="h2">Login</Heading>
           <form onSubmit={handleSubmit} style={{ width: '100%' }}>
             <VStack spacing={4} align="start" w="100%">
              
               <FormControl id="email" isRequired>
                 <FormLabel>Email Address</FormLabel>
                 <Input
                   type="email"
                   placeholder="Enter your email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                 />
               </FormControl>
 
             
               <FormControl id="password" isRequired>
                 <FormLabel>Password</FormLabel>
                 <Input
                   type="password"
                   placeholder="Enter your password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                 />
               </FormControl>
 
              
               <Button type="submit" colorScheme="blue" w="100%">
                 Login
               </Button>
             </VStack>
           </form>
 
           <VStack spacing={2} align="start" w="100%">
            
             <Link href="/signup">Sign Up</Link>
           </VStack>
         </VStack>
       </Box>
   
   );
}

export default Login