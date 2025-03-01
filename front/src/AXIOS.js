import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3002",
});

export const googleAuth = (code) =>
  API.get(`/google?code=${code}`, {
    withCredentials: true,
  });
