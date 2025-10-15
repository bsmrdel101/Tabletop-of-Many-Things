import api from "@/scripts/config/axios";


// === GET routes === //

export const getAllRaces = async (gameId: number): Promise<Race_Dnd[]> => {
  try {
    const res = await api.get(`/api/5e/races/${gameId}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getRaceById = async (id: number): Promise<Race_Dnd | null> => {
  try {
    const res = await api.get(`/api/5e/races/id/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSubraceById = async (id: number): Promise<Subrace_Dnd | null> => {
  try {
    const res = await api.get(`/api/5e/races/subrace/id/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
