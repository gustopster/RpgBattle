import axios from "axios";

const BASE_URL = "http://192.168.15.8:5087/api";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
