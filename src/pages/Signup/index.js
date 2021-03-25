import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Heading,
  Flex,
} from "@chakra-ui/core";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import { useAuth } from "hooks/useAuth";
import { useHistory } from "react-router-dom";
import FullscreenLoader from "components/FullscreenLoader";

import Login from "./Login.js";
import Signup from "./Signup.js";

const SignupPage = () => {
  const { handleSubmit, errors, register, formState } = useForm({
    mode: "onTouched",
  });
  const { login, isAuthenticated, isLoggingIn } = useAuth();
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/d");
    }
  }, []);

  return (
    <Flex
      w="full"
      h="calc(100vh - 4rem)"
      align="center"
      justifyContent="center"
    >
      <FullscreenLoader open={isLoggingIn} />
      <Box
        p={8}
        minW="320px"
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        mb="10%"
        boxShadow="lg"
        bg="white"
      >
        <Heading my={4} textAlign="center" size="xl" letterSpacing={"-.1rem"}>
          Login
        </Heading>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Login</Tab>
            <Tab>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default SignupPage;
