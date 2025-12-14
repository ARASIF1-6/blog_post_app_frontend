// src/api.js
import axios from "axios";

export const API_BASE = "https://localhost:7255/api";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

// attach token
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
