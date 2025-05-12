
import axios from "axios";

const API_BASE_URL = "https://linkbrary-api.vercel.app";

// Set up axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("linkbrary_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (email: string, password: string, nickname: string) => {
  try {
    const response = await api.post("/auth/signup", { email, password, nickname });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Links API
export const fetchAllLinks = async () => {
  try {
    const response = await api.get("/links");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchLinksByFolder = async (folderId: string) => {
  try {
    const response = await api.get(`/links/folder/${folderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createLink = async (linkData: { url: string; title?: string; description?: string; folderId?: string }) => {
  try {
    const response = await api.post("/links", linkData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateLink = async (linkId: string, linkData: { url?: string; title?: string; description?: string; folderId?: string }) => {
  try {
    const response = await api.put(`/links/${linkId}`, linkData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLink = async (linkId: string) => {
  try {
    const response = await api.delete(`/links/${linkId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Folders API
export const fetchAllFolders = async () => {
  try {
    const response = await api.get("/folders");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createFolder = async (name: string) => {
  try {
    const response = await api.post("/folders", { name });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFolder = async (folderId: string, name: string) => {
  try {
    const response = await api.put(`/folders/${folderId}`, { name });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFolder = async (folderId: string) => {
  try {
    const response = await api.delete(`/folders/${folderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
