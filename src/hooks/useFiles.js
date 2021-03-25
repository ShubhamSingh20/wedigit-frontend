import propTypes from "prop-types";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import authServices from "services/authServices";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useAlerts } from "./useAlerts";
import Axios from "axios";
import api from "services/api";

const file = createContext(null);
const { Provider } = file;

export const useFile = () => useContext(file);

export const FileProvider = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const { successAlert, errorAlert } = useAlerts();

  const [document, setDocument] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [deleteDocument, setDeleteDocument] = useState(false);
  const [newDocument, setNewDocument] = useState(false);
  const [isFetchingDocument, setIsFetchingDocument] = useState(false);
  const [isFetchingDocuments, setIsFetchingDocuments] = useState(false);

  const value = useMemo(
    () => ({
      document,
      documents,
      newDocument,
      isFetchingDocument,
      isFetchingDocuments,
      setNewDocument,
      setDeleteDocument,
      deleteDocument,
      getDocumentById: function(id) {
        setIsFetchingDocument(true);
        api().get(`/documents/${id}`)
        .then((data) => {
          setDocument(data);
          setIsFetchingDocument(false);
        })
        .catch((e = {response : { } }) => {
          let description =
          e.response?.data?.message || e.response?.data?.error;
          errorAlert({ description, title: "Error while fetching document!" });
          setIsFetchingDocument(false);
        })
      },
      getDocuments: function() {
        setIsFetchingDocuments(true);
        Axios.get('api/v1/documents/')
        .then((res) => {
          setDocuments(res.data)
          setIsFetchingDocuments(false);
        })
        .catch((e = {response : { } }) => {
          let description =
          e.response?.data?.message || e.response?.data?.error;
          errorAlert({ description, title: "Error while fetching documents up" });
          setIsFetchingDocuments(false);
        })
      },
      deleteDocumentWithId: function(id) {
        Axios.delete(`api/v1/documents/${id}/`)
        .then((res) => setDeleteDocument(true))
        .catch((e = {response : { } }) => {
          let description =
          e.response?.data?.message || e.response?.data?.error;
          errorAlert({ description, title: "Error while deleting document!" });
        })
      }
    }),
    [
      documents,
      document,
      isFetchingDocuments,
      setNewDocument,
      errorAlert,
      history,
      location,
      successAlert,
      newDocument,
      deleteDocument,
      setNewDocument,
    ]
  );

  return <Provider value={value}>{children}</Provider>;
};

FileProvider.propTypes = {
  children: propTypes.any,
};
