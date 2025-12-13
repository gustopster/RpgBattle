import { Platform } from "react-native";
import axios from "axios";

// Web -> usa HTTPS localhost
// Mobile -> usa HTTP via IP da rede local (sem SSL)
const BASE_URL =
  Platform.OS === "web"
    ? "http://127.0.0.1:5087/api"   // Web
    : "http://192.168.15.8:5087/api"; // Mobile (mesma rede, HTTP)

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
