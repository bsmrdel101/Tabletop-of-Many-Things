import axios from "axios";

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

export const getGamesByUser = async (): Promise<Game[]> => {
  try {
    const res = await axios.get('/api/dashboard');
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getGame = async (id: number): Promise<Game | null> => {
  try {
    const res = await axios.get(`/api/dashboard/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getGamesHistory = async (): Promise<Game[]> => {
  try {
    const res = await axios.get('/api/dashboard/history');
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// === POST routes === //

export const addGame = async (payload: NewGamePayload) => {
  try {
    await axios.post('/api/dashboard', payload);
  } catch (error) {
    console.log(error);
  }
};

export const addGameToHistory = async (gameId: number) => {
  try {
    await axios.post('/api/dashboard/history', { gameId });
  } catch (error) {
    console.log(error);
  }
};

// === PUT routes === //

export const editGame = async (payload: EditGamePayload) => {
  try {
    await axios.patch(`/api/dashboard`, payload);
  } catch (error) {
    console.log(error);
  }
};

// === DELETE routes === //

export const deleteGame = async (id: number) => {
  try {
    await axios.patch(`/api/dashboard/${id}`);
  } catch (error) {
    console.log(error);
  }
};
