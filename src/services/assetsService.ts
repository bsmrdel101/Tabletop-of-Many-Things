import api from "@/scripts/config/axios";


// === GET routes === //

export const getAssetsByGame = async (gameId: number): Promise<Game[]> => {
  try {
    const auth = { withCredentials: true };
    const res = await api.get(`/api/assets/game/${gameId}`, auth);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// === POST routes === //

export const addAsset = async (gameId: number | null, name: string, filepath: string, img: string): Promise<number | null> => {
  try {
    const auth = { withCredentials: true };
    const res = await api.post('/api/assets', { gameId, name, filepath, img }, auth);
    return res.data.id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// === PATCH routes === //

export const editAssetFilepath = async (id: number, filepath: string) => {
  try {
    const auth = { withCredentials: true };
    await api.patch('/api/assets/filepath', { id, filepath }, auth);
  } catch (error) {
    console.log(error);
  }
};

export const editAssetName = async (id: number, name: string) => {
  try {
    const auth = { withCredentials: true };
    await api.patch('/api/assets/name', { id, name }, auth);
  } catch (error) {
    console.log(error);
  }
};

// === DELETE routes === //

export const deleteAsset = async (id: number) => {
  try {
    const auth = { withCredentials: true };
    await api.patch(`/api/assets/${id}`, auth);
  } catch (error) {
    console.log(error);
  }
};
