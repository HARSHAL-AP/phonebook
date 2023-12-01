import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Grid,
  GridItem,
  Box,
  VStack,
  Image,
} from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Components/Card";
import axios from "axios";
import {get } from "../features/contactSlice";
const Home = () => {
  const [isloading, setisloading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.contacts.contacts);

  useEffect(() => {
    axios
      .get("https://tired-mite-tights.cyclic.app/contactinfo/getbyusers", {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        dispatch(get(response.data.data));
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });  
  }, [token]);

  return (
    <>
      <Navbar />
      <Grid
        templateColumns={["1fr", "repeat(2, 1fr)", "repeat(2, 1fr)"]}
        gap={6}
        w={["100%", "100%", "40%"]}
        m="auto"
        mt="10px"
      >
        {isloading&&<h1>Loading....</h1>}
        {data.length > 0 || (
          <Box m="auto">
            <Image
              src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?size=626&ext=jpg"
              alt=""
            />
          </Box>
        )}
        {data.length > 0 &&
          data.map((el) => {
            return <Card key={el._id} user={el} />;
          })}
      </Grid>
    </>
  );
};

export default Home;
