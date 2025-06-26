import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const ApiService = {
  sendMessage: async (message, styles, taste) => {
    const response = await api.post("/chat", { message, styles, taste });
    return response.data;
  },

  saveConversation: async (payload) => {
    return await api.post("/conversas", payload);
  },

  searchConversation: async () => {
    const response = await api.get("/conversas");
    return response.data;
  },
};

export default ApiService;