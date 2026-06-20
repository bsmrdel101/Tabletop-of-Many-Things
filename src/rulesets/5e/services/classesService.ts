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
  }
};
