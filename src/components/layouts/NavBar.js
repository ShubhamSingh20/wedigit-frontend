import React from "react";
import {
  Heading,
  Flex,
  IconButton,
  Button,
} from "@chakra-ui/core";
import { useAuth } from "hooks/useAuth";
import { GrLogout } from "react-icons/gr";

const Navbar = (props) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Flex
      as="nav"
      alignItems="center"
      justifyContent="space-between"
      wrap="wrap"
      height="4rem"
      borderBottom="1px solid rgb(224,224,224)"
      {...props}
    >
      <Flex alignItems="center" ml={1}>
        {isAuthenticated && (
          <IconButton
            bg="transparent"
            border="none"
            onClick={logout}
            icon={GrLogout}
            _hover={{ bg: "transparent" }}
          />
        )}
        <Heading as="h1" size="lg">
          WeDigIT
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Navbar;
