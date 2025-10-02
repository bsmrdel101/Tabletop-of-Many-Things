import api from "@/scripts/config/axios";


// === GET routes === //

export const getAllClasses = async (gameId: number): Promise<Class_5e[]> => {
  try {
    const params = new URLSearchParams();
    params.append('gameId', gameId.toString());
    const res = await api.get(`/api/5e/classes?${params}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getClassById = async (id: number): Promise<Class_5e | null> => {
  try {
    const res = await api.get(`/api/5e/classes/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// === DELETE routes === //

export const removePlayerClass = async (classId: number) => {
  try {
    const params = new URLSearchParams();
    params.append('classId', classId.toString());
    await api.delete(`/api/5e/player-classes?${params}`);
  } catch (error) {
    console.error(error);
  }
};
