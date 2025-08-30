import axios from "axios";


export const getSpell = async (id: number) => {
  try {
    const res = await axios.get(`/api/5e/spells/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
