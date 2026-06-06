import { showError } from "@/components/library/Errors";
import api from "@/scripts/config/axios";

interface NewGamePayload {
  name: string
  ruleset: Ruleset
  password: string | null
  gameSettings: GameSettings
}

interface EditGamePayload {
  pubId: string
  name: string
  ruleset: Ruleset
  password: string | null
}


// === GET routes === //

export const getGamesByUser = async (): Promise<Game[]> => {
  try {
    const res = await api.get('/api/v1/games');
    return res.data;
  } catch (error) {
    showError(error);
    return [];
  }
};

export const getGameById = async (id: number): Promise<Game | null> => {
  try {
    const res = await api.get(`/api/v1/games/id/${id}`);
    return res.data;
  } catch (error) {
    showError(error);
    return null;
  }
};

export const getGamesHistory = async (): Promise<Game[]> => {
  try {
    const res = await api.get('/api/v1/games/history');
    return res.data;
  } catch (error) {
    showError(error);
    return [];
  }
};

// === POST routes === //

export const addGame = async (payload: NewGamePayload): Promise<number | null> => {
  try {
    const res = await api.post('/api/v1/games', payload);
    return res.data.id;
  } catch (error) {
    showError(error);
    return null;
  }
};

export const addGameToHistory = async (gameId: number) => {
  try {
    await api.post('/api/v1/games/history', { gameId });
  } catch (error) {
    showError(error);
  }
};

// === PUT routes === //

export const editGame = async (payload: EditGamePayload) => {
  try {
    await api.put(`/api/v1/games`, payload);
  } catch (error) {
    showError(error);
  }
};

// === DELETE routes === //

export const deleteGame = async (pubId: string) => {
  try {
    await api.delete(`/api/v1/games/${pubId}`);
  } catch (error) {
    showError(error);
  }
};
