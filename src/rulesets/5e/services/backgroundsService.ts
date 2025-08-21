import axios from "axios";


// === GET routes === //

export const getAllBackgrounds = async () => {
  try {
    const res = await axios.get(`/api/5e/backgrounds`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
