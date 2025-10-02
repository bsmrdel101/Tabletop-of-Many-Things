import api from "@/scripts/config/axios";


// === GET routes === //

export const getAllBackgrounds = async () => {
  try {
    const res = await api.get(`/api/5e/backgrounds`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
