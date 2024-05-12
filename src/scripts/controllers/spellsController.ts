import axios from "axios";


export const getSpell = async (id: number) => {
  try {
    const res = await axios.get(`/api/spells/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
