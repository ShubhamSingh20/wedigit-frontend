import { Box } from "@chakra-ui/core";
import React from "react";

const Card = React.forwardRef(({ children, ...props }, ref) => (
  <Box
    minW={["sm", "md", "lg", "lg"]}
    maxW={["sm", "xl", "2xl", "4xl"]}
    display="flex"
    flexDir="column"
    borderWidth="1px"
    borderRadius="lg"
    mx="auto"
    bg="gray.50"
    shadow="lg"
    ref={ref}
    {...props}
  >
    {children}
  </Box>
));
export default Card;
