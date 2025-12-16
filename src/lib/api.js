import axios from "axios";
import { getHostIP } from "./storage.js";

const getBaseUrl = async () => {
  const hostIP = await getHostIP();
  if (!hostIP) {
    throw new Error("Host IP not set. Please link a password manager first.");
  }
  return `http://${hostIP}:5421/passwords`;
};

export const getPasswords = async () => {
  const url = await getBaseUrl();
  const response = await axios.get(url);
  return response.data;
};

export const createPassword = async (url, username, password) => {
  const baseUrl = await getBaseUrl();
  const response = await axios.post(baseUrl, { url, username, password });
  return response.data;
};

export const deletePasswordById = async (id) => {
  const baseUrl = await getBaseUrl();
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};