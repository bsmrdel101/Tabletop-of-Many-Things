import api from "@/scripts/config/axios";

interface SearchRaces {
  gameId: string | null
  worldId: string | null
  userContent: boolean
  name: string | null
}


// === GET routes === //

export const getRaces = async (params: SearchRaces): Promise<Race_5e[]> => {
  try {
    const res = await api.get(`/api/v1/5e/races`, { params });  
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getRaceById = async (id: number): Promise<Race_5e | null> => {
  try {
    const res = await api.get(`/api/v1/5e/races/id/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSubraceById = async (id: number): Promise<Subrace_5e | null> => {
  try {
    const res = await api.get(`/api/v1/5e/races/subrace/id/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
