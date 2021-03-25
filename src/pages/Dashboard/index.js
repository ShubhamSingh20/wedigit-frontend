import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Code,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/core";
import { useAlerts } from "hooks/useAlerts";
import Card from "components/Card";
import CardContent from "components/Card/CardContent";
import CardHeader from "components/Card/CardHeader";
import DropZone from "components/Dropzone";
import { useFile } from "hooks/useFiles";
import { FaPen, FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const { errorAlert } = useAlerts();
  const {
    getDocuments,
    documents,
    newDocument,
    setNewDocument,
    deleteDocumentWithId,
    deleteDocument,
    setDeleteDocument,
  } = useFile();

  useEffect(() => {
    getDocuments();
  }, []);

  useEffect(() => {
    if (newDocument || deleteDocument) {
      getDocuments();
      setNewDocument(false);
      setDeleteDocument(false);
    }
  }, [newDocument, deleteDocument]);

  return (
    <Stack shouldWrapChildren>
      <Card mt="2rem" w="sm" mx="sm">
        <CardHeader>
          <Heading size="md">Upload File</Heading>
        </CardHeader>
        <CardContent>
          <DropZone />
        </CardContent>
      </Card>

      <Card mt="2rem" w="md" mx="sm">
        <CardHeader>
          <Heading size="md">Files</Heading>
        </CardHeader>
        <CardContent>
          {(!documents || documents?.length === 0) && (
            <Text fontStyle="italic" textAlign="center">
              No Documents uploaded
            </Text>
          )}

          {Array.isArray(documents) &&
            documents.map((row, _) => (
              <>
                <Card shadow="xs" minW="md" mx="0px" mb={5} key={row.id}>
                  <CardHeader>
                    <Heading fontWeight="normal" size="sm">
                      {row.file_name} by {row.created_by.email}
                    </Heading>
                    <Box marginLeft="auto">
                      <Button
                        size="sm"
                        leftIcon={FaPen}
                        variantColor="teal"
                        variant="outline"
                        onClick={() => {}}
                      >
                        Edit
                      </Button>
                      <Popover isLazy>
                        <PopoverTrigger>
                          <Button
                            ml="0.5rem"
                            size="sm"
                            leftIcon={FaTrash}
                            variantColor="red"
                            variant="outline"
                          >
                            Delete
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent zIndex={1201}>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Confirmation!</PopoverHeader>
                          <PopoverBody>
                            Are you sure you want to delete{" "}
                            <Code>{row.board_name}</Code>?
                          </PopoverBody>
                          <PopoverFooter d="flex" flexDir="row-reverse">
                            <Button
                              variantColor="red"
                              variant="outline"
                              onClick={() => deleteDocumentWithId(row.id)}
                              //isLoading={isSubmiting}
                            >
                              Delete
                            </Button>
                          </PopoverFooter>
                        </PopoverContent>
                      </Popover>
                    </Box>
                  </CardHeader>
                </Card>
              </>
            ))}
        </CardContent>
      </Card>
    </Stack>
  );
};
export default Dashboard;
