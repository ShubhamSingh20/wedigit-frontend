import { Flex } from "@chakra-ui/core";
import React from "react";

const CardHeader = ({ children, ...props }) => (
  <Flex
    w="100%"
    justifyContent="space-between"
    alignItems="center"
    py="1rem"
    px="1.5rem"
    {...props}
  >
    {children}
  </Flex>
);
export default CardHeader;
