import axios from "axios";
import { Map } from "../scripts/types";


// === GET routes === //

export const getMaps = async (id: number) => {
  try {
    const res = await axios.get(`/api/map/all/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getMap = async (id: number) => {
  try {
    const res = await axios.get(`/api/map/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// === POST routes === //

export const addMap = async (payload: Map) => {
  try {
    await axios.post('/api/map', payload);
  } catch (err) {
    console.log(err);
  }
};

// === PUT routes === //

export const setMap = async (payload: Map) => {
  try {
    await axios.put('/api/map', payload);
  } catch (err) {
    console.log(err);
  }
};
