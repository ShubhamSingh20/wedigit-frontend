import React, { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { useFile } from "hooks/useFiles";

const Details = () => {
  const history = useHistory();
  const { id } = useParams();
  const { isFetchingDocument, document, getDocumentById } = useFile();

  useEffect(() => {
    if (id) {
      getDocumentById(id);
    }
  }, [id]);

  return <h1>{!isFetchingDocument && document}</h1>;
};

export default Details;
