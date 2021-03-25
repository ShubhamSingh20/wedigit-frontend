import React, { useEffect } from "react";
import Card from "components/Card";
import {Heading} from "@chakra-ui/core";
import CardContent from "components/Card/CardContent";
import CardHeader from "components/Card/CardHeader";
import { useHistory, useParams } from "react-router-dom";
import { useFile } from "hooks/useFiles";

const Details = () => {
  const history = useHistory();
  const { id } = useParams();
  const { isFetchingDocument, document, getDocumentById } = useFile();

  useEffect(() => {
    if (id && document === null) {
      getDocumentById(id);
    }
  }, [document]);

  return (
    <>
      <Card mt="2rem" w="sm" mx="sm">
        <CardHeader>
          <Heading size="md">File Details</Heading>
        </CardHeader>
        <CardContent>
          {isFetchingDocument && <> </> }
        </CardContent>
      </Card>
    </>
  );
};

export default Details;
