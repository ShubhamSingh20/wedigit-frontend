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
import { useAuth } from "hooks/useAuth";
import { useHistory } from "react-router-dom";
import FullscreenLoader from "components/FullscreenLoader";

const Login = () => {
  const { login, isAuthenticated, isLoggingIn } = useAuth();
  const { handleSubmit, errors, register, formState } = useForm({
    mode: "onTouched",
  });

  const validateEmail = (email) => {
    var re = new RegExp(
      /* eslint-disable no-useless-escape */
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    let error;
    if (!email) {
      error = "Email is required!";
    } else if (!re.test(email)) {
      error = "Invalid Email!";
    }
    return error ?? true;
  };

  return (
    <form onSubmit={handleSubmit(login)}>
      <FormControl textAlign="left" isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          isInvalid={!!errors.email}
          id="email"
          name="email"
          type="email"
          placeholder="i.e jeff@gmail.com"
          ref={register({ validate: validateEmail })}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl textAlign="left" isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          isInvalid={!!errors.password}
          id="password"
          name="password"
          type="password"
          ref={register({
            required: true,
            minLength: 3,
          })}
          placeholder="*****"
        />
        {errors.password && (
          <FormErrorMessage>Password is required!</FormErrorMessage>
        )}
      </FormControl>
      <Button
        type="submit"
        variantColor="teal"
        variant="outline"
        width="full"
        isLoading={formState.isSubmitting}
        mt={4}
      >
        Sign In
      </Button>
    </form>
  );
};

export default Login;
