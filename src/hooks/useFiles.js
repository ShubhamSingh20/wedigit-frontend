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

const file = createContext(null);
const { Provider } = file;

export const useFile = () => useContext(file);

export const FileProvider = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const { successAlert, errorAlert } = useAlerts();

  const [documents, setDocuments] = useState([]);
  const [deleteDocument, setDeleteDocument] = useState(false);
  const [newDocument, setNewDocument] = useState(false);
  const [isFetchingDocuments, setIsFetchingDocuments] = useState(false);

  const value = useMemo(
    () => ({
      documents,
      newDocument,
      isFetchingDocuments,
      setNewDocument,
      setDeleteDocument,
      deleteDocument,
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
          errorAlert({ description, title: "Error while fetching documents up!" });
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
