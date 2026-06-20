import api from "@/scripts/config/axios";

interface GetAllClasses {
  gameId: string | null
  worldId: string | null
  userContent: boolean
}


// === GET routes === //

export const getClasses = async (params: GetAllClasses) => {
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
    const res = await api.get(`/api/5e/classes/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// === POST routes === //

export const addPlayerClass = async (playerClass: NewPlayerClass): Promise<NewPlayerClassRes | null> => {
  try {
    const res = await api.post(`/api/5e/classes/player-classes`, playerClass);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// === PUT routes === //

export const editPlayerClass = async (playerClass: EditPlayerClass) => {
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
