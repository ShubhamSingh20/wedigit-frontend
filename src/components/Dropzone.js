import React, { useEffect, useState } from "react";
import { Box, Code, Icon, Image, Progress, PseudoBox } from "@chakra-ui/core";
import { useDropzone } from "react-dropzone";
import { GrDocument, GrDocumentVideo } from "react-icons/gr";
import Axios from "axios";
import { useAlerts } from "hooks/useAlerts";
import {useFile} from "hooks/useFiles";
import { Controller, useFormContext } from "react-hook-form";

const getFileIcon = (type) => {
  if (!type || typeof type !== "string") return GrDocument;
  if (type.includes("video")) return GrDocumentVideo;
};
const FileList = ({ files }) => {
  return (
    <Box
      as="ul"
      mt="0.5rem"
      listStyleType="none"
      d="flex"
      flexWrap="wrap"
      alignItems="stretch"
    >
      {files.map((file) => (
        <Box
          d="flex"
          flexDir="column"
          justifyContent="space-between"
          as="li"
          border="1px solid"
          borderRadius="0.25rem"
          maxW={["4rem", "6rem", "8rem", "8rem"]}
          _notLast={{ marginRight: "0.75rem" }}
        >
          {file?.type?.includes("image") ? (
            <Image
              src={file.src ? file.src : URL.createObjectURL(file)}
              w="100%"
            />
          ) : (
            <Icon
              as={getFileIcon(file?.type)}
              w="calc(100% - 0.5rem)"
              m="0.25rem"
              h="50%"
            />
          )}
          <Code fontSize="0.75rem">{file.name}</Code>
        </Box>
      ))}
    </Box>
  );
};

const Dropzone = ({
  extraContent,
  accept,
  multiple,
  defaultValue,
  onChange,
  ...props
}) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ multiple, accept });
  const { errorAlert } = useAlerts();
  const {setNewDocument} = useFile();

  const [uploadProgress, setUploadProgress] = useState({
    isUploading: false,
    total: 0,
    loaded: 0,
  });

  useEffect(() => {
    const uploadFiles = (fileList) => {
      const formdata = new FormData();
      formdata.append("file", fileList[0]);
      Axios.post(`api/v1/documents/`, formdata, {
        headers: {
          "Content-Type": 'multipart/form-data',
        },
        onUploadProgress: (progress) => {
          if (progress.loaded < progress.total)
            setUploadProgress({
              isUploading: true,
              loaded: progress.loaded,
              total: progress.total,
            });
          else setUploadProgress({ isUploading: false, uploaded: true });
        },
      })
        .then((res) => setNewDocument(true))
        .catch((err) => {
          errorAlert({ title: "Error while uploading." });
        });
    };
    if (acceptedFiles && acceptedFiles?.length) uploadFiles(acceptedFiles);
  }, [acceptedFiles]);

  return (
    <>
      <PseudoBox
        minH="4rem"
        d="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        border="2px dashed"
        borderColor="gray.400"
        color="gray.400"
        borderRadius="4px"
        userSelect="none"
        transition="0.3s"
        _hover={{ color: "#1A202C", borderColor: "black" }}
        {...getRootProps()}
      >
        <input {...props} {...getInputProps()} />
        {(() => {
          if (uploadProgress.uploaded || defaultValue) return <p>Uploaded!</p>;
          if (uploadProgress.isUploading)
            return (
              <>
                <Progress
                  hasStripe
                  mb="0.5rem"
                  value={100 * (uploadProgress.loaded / uploadProgress.total)}
                />
                <p>Uploading...</p>
              </>
            );
          if (isDragActive) return <p>Drop the files here...</p>;
          return (
            <Box className="dropzone-inner">
              <p>Click or Drag 'n' drop files here</p>
              {extraContent}
            </Box>
          );
        })()}
      </PseudoBox>
      {acceptedFiles?.length > 0 && <FileList files={acceptedFiles} />}
      {!acceptedFiles?.length && defaultValue && (
        <FileList files={[defaultValue]} />
      )}
    </>
  );
};

export default Dropzone;
