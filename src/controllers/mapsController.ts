import axios from "axios";
import { Map } from "../scripts/types";

export let maps: Map[];

// === GET routes === //

export const getMaps = async () => {
  try {
    const res = await axios.get('/api/maps');
    maps = res.data;
  } catch (err) {
    console.log(err);
  }
};

// === POST routes === //

export const addMap = async (payload: Map) => {
  try {
    console.log(payload);
    await axios.post('/api/maps', payload);
  } catch (err) {
    console.log(err);
  }
};
