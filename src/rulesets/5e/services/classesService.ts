import api from "@/scripts/config/axios";

interface GetAllClasses {
  gameId: string | null
  worldId: string | null
  userContent: boolean
}


// === GET routes === //

export const getClasses = async (params: GetAllClasses): Promise<Class_5e[]> => {
  try {
    const res = await api.get(`/api/v1/5e/classes`, { params });
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getClassById = async (id: number): Promise<Class_5e | null> => {
  try {
    const res = await api.get(`/api/v1/5e/classes/id/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
