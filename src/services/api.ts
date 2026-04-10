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
    console.log(memoryToken);
  }
  return config;
});

// Interceptor for error handling centrally
api.interceptors.response.use(
  (response) => {
        const newToken = response.headers.authorization?.split(" ")[1];
        console.log(newToken);
        if (newToken) {
          memoryToken = newToken;
        }
        return response;
    },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;