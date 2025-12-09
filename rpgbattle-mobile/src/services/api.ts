import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.15.6:5087/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
