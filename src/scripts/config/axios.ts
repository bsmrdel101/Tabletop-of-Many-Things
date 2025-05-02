import axios from 'axios';

const getUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://tabletop-of-many-things-server.up.railway.app';
  } else {
    return 'http://localhost:8000';
  }
};

const baseURL = getUrl();

const api = axios.create({
  baseURL,
});

export default api;
