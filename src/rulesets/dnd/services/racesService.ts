import axios from "axios";


// === GET routes === //

export const getAllRaces = async () => {
  try {
    const res = await axios.get(`/api/v1/5e/races`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
