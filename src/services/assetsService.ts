import api from "@/scripts/config/axios";


// === GET routes === //

export const getAssetsByGame = async (gameId: number): Promise<Game[]> => {
  try {
    const res = await api.get(`/api/assets/game/${gameId}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// === POST routes === //

export const addAsset = async (gameId: number | null, name: string, filepath: string, img: string): Promise<number | null> => {
  try {
    const res = await api.post('/api/assets', { gameId, name, filepath, img });
    return res.data.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// === PATCH routes === //

export const editAssetFilepath = async (id: number, filepath: string) => {
  try {
    await api.patch('/api/assets/filepath', { id, filepath });
  } catch (error) {
    console.error(error);
  }
};

export const editAssetName = async (id: number, name: string) => {
  try {
    await api.patch('/api/assets/name', { id, name });
  } catch (error) {
    console.error(error);
  }
};

// === DELETE routes === //

export const deleteAsset = async (id: number) => {
  try {
    await api.patch(`/api/assets/${id}`);
  } catch (error) {
    console.error(error);
  }
};
