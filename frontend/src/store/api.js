import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Create a shared axios instance with automatic token injection
const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

// Automatically attach the token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Helper to save/clear the token
export const setToken = (token) => {
    if (token) {
        localStorage.setItem("token", token);
    }
};

export const clearToken = () => {
    localStorage.removeItem("token");
};

export const getToken = () => localStorage.getItem("token");

export default api;
