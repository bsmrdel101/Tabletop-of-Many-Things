import api from "@/scripts/config/axios";

export interface SearchItems_5e {
  gameId: string | null
  worldId: string | null
  userContent: boolean
}


// === GET routes === //

export const searchItems = async (params: SearchItems_5e): Promise<Item_5e[]> => {
  try {
    const res = await api.get(`/api/v1/5e/items`, { params });
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getItemById = async (id: number): Promise<Item_5e | null> => {
  try {
    const res = await api.get(`/api/v1/5e/items/id/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// === DELETE routes === //

export const deleteItem = async (id: number) => {
  try {
    await api.delete(`/api/v1/5e/items/${id}`);
  } catch (error) {
    console.error(error);
  }
};
