import axios from "axios";
import { Token } from "../types";


// === GET routes === //

export const getTokens = async () => {
  try {
    const res: any = await axios.get('/api/token');
    const newTokenRes = res.data.map((token: Token) => {
      return { id: token.id, image: token.image, size: token.size, creature: token.creature };
    });
    return newTokenRes;
  } catch (err) {
    console.log(err);
  }
};

export const getToken = async (id: number) => {
  try {
    const res: any = await axios.get(`/api/token/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// === POST routes === //

export const addToken = async (payload: Token) => {
  try {
    await axios.post('/api/token', payload);
  } catch (err) {
    console.log(err);
  }
};