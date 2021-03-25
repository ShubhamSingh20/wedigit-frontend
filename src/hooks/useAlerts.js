import { Box, Code, Heading, useToast } from "@chakra-ui/core";
import propTypes from "prop-types";
import React, { createContext, useContext, useMemo } from "react";

const alerts = createContext(null);
const { Provider } = alerts;

export const useAlerts = () => useContext(alerts);
export const ValidationErrorDescription = ({ errors }) =>
  errors && typeof error === "object" ? (
    <Box d="flex" flexDir="column">
      {Object.keys(errors).map((field) => (
        <Box d="flex">
          <Heading fontWeight="700">{field}</Heading>
          <Box d="flex" flexDir="column">
            {errors[field].map((error) => (
              <Code>{error}</Code>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  ) : (
    ""
  );

export const AlertProvider = ({ children }) => {
  const toast = useToast();
  const successAlert = (props) =>
    toast({ status: "success", duration: 6000, isClosable: true, ...props });
  const errorAlert = (props) =>
    toast({
      status: "error",
      duration: 9000,
      isClosable: true,
      ...props,
    });
  const value = useMemo(
    () => ({
      successAlert,
      errorAlert,
    }), // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return <Provider value={value}>{children}</Provider>;
};
AlertProvider.propTypes = {
  children: propTypes.any,
};
