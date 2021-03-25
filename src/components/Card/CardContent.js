import { Flex } from "@chakra-ui/core";
import React from "react";

const CardContent = ({ children, ...props }) => (
  <Flex w="100%" flexDirection="column" py="1rem" px="1.5rem" {...props}>
    {children}
  </Flex>
);
export default CardContent;
