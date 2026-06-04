import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';


const getUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://tabletop-of-many-things-server.up.railway.app';
  } else if (import.meta.env.VITE_NODE_ENV === 'test') {
    return 'http://localhost:8001';
  } else {
    return 'http://localhost:8000';
  }
};

const baseURL = getUrl();
const jar = new CookieJar();

const api = wrapper(axios.create({
  baseURL,
  jar,
  withCredentials: true
}));

export const setApiBaseUrl = (url: string) => {
  api.defaults.baseURL = url;
};

export default api;
