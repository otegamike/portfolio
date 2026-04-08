import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let memoryToken: string | null = null;

export const setHeaderToken = (token: string | null) => {
  memoryToken = token;
  console.log(memoryToken);
};

api.interceptors.request.use((config) => {

  if (memoryToken) {
    config.headers.authorization = `Bearer ${memoryToken}`;
  }
  return config;
});

// Interceptor for error handling centrally
api.interceptors.response.use(
  (response) => {
        memoryToken = response.headers.authorization?.split(" ")[1];
        return response;
    },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;