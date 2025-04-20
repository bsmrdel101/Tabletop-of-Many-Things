import api from "@/config/axios"

interface NewGamePayload {
  name: string
  ruleset: string
  password?: string
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
    const auth = { withCredentials: true };
    const res = await api.get('/api/dashboard', auth);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getGame = async (id: number): Promise<Game | null> => {
  try {
    const auth = { withCredentials: true };
    const res = await api.get(`/api/dashboard/${id}`, auth);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getGamesHistory = async (): Promise<GameMin[]> => {
  try {
    const auth = { withCredentials: true };
    const res = await api.get('/api/dashboard/history', auth);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// === POST routes === //

export const addGame = async (payload: NewGamePayload) => {
  try {
    const auth = { withCredentials: true };
    await api.post('/api/dashboard', payload, auth);
  } catch (error) {
    console.log(error);
  }
};

export const addGameToHistory = async (gameId: number) => {
  try {
    const auth = { withCredentials: true };
    await api.post('/api/dashboard/history', { gameId }, auth);
  } catch (error) {
    console.log(error);
  }
};

// === PUT routes === //

export const editGame = async (payload: EditGamePayload) => {
  try {
    const auth = { withCredentials: true };
    await api.patch(`/api/dashboard`, payload, auth);
  } catch (error) {
    console.log(error);
  }
};

// === DELETE routes === //

export const deleteGame = async (id: number) => {
  try {
    const auth = { withCredentials: true };
    await api.patch(`/api/dashboard/${id}`, auth);
  } catch (error) {
    console.log(error);
  }
};
