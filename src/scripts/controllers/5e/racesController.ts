import axios from "axios";


// === GET routes === //

export const getAllRaces = async () => {
  try {
    const res = await axios.get(`/api/5e/races`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
