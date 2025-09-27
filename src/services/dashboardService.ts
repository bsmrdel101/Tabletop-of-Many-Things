import api from "@/scripts/config/axios";

interface NewGamePayload {
  name: string
  ruleset: string
  password?: string
  gameSettings: GameSettings
}

interface EditGamePayload {
  id: number
  name: string
  ruleset: string
  password?: string
}


// === GET routes === //

export const getGamesByUser = async (): Promise<GameMin[]> => {
  try {
    const res = await api.get('/api/dashboard');
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getGameById = async (id: number): Promise<Game | null> => {
  try {
    const res = await api.get(`/api/dashboard/id/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getGamesHistory = async (): Promise<GameMin[]> => {
  try {
    const res = await api.get('/api/dashboard/history');
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// === POST routes === //

export const addGame = async (payload: NewGamePayload): Promise<number | null> => {
  try {
    const res = await api.post('/api/dashboard', payload);
    return res.data.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addGameToHistory = async (gameId: number) => {
  try {
    await api.post('/api/dashboard/history', { gameId });
  } catch (error) {
    console.error(error);
  }
};

// === PUT routes === //

export const editGame = async (payload: EditGamePayload) => {
  try {
    await api.patch(`/api/dashboard`, payload);
  } catch (error) {
    console.error(error);
  }
};

// === DELETE routes === //

export const deleteGame = async (id: number) => {
  try {
    await api.patch(`/api/dashboard/${id}`);
  } catch (error) {
    console.error(error);
  }
};
