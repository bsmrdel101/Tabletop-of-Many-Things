import api from "@/scripts/config/axios";

interface PlayerClass {
  id: number,
  lvl: number,
  subclassId: number | null
}


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

// === PUT routes === //

export const editPlayerClass = async (playerClass: PlayerClass) => {
  try {
    await api.put(`/api/5e/classes/player-classes`, playerClass);
  } catch (error) {
    console.error(error);
  }
};

// === DELETE routes === //

export const removePlayerClass = async (classId: number) => {
  try {
    await api.delete(`/api/5e/classes/player-classes/${classId}`);
  } catch (error) {
    console.error(error);
  }
};
