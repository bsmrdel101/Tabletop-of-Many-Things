import axios from "axios";


// === GET routes === //

export const getAllClasses = async () => {
  try {
    const res = await axios.get(`/api/5e/classes`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
