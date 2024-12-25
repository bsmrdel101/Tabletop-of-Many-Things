import axios from "axios";


interface newGame {
  name: string
  ruleset: string
}

// === GET routes === //

export const getGames = async () => {
  try {
    const res = await axios.get('/api/dashboard');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getGame = async (code: string) => {
  try {
    const res = await axios.get(`/api/dashboard/game/${code}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getGamesHistory = async () => {
  try {
    const res = await axios.get('/api/dashboard/history');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// === POST routes === //

export const addGame = async (payload: newGame) => {
  try {
    await axios.post('/api/dashboard', payload);
  } catch (err) {
    console.log(err);
  }
};

export const addGameToHistory = async (gameId: number) => {
  try {
    await axios.post('/api/dashboard/history', { gameId });
  } catch (err) {
    console.log(err);
  }
};

// === PUT routes === //

export const setSelectedMap = async (payload: Map_5e, gameId: number) => {
  try {
    await axios.put(`/api/dashboard/${gameId}`, payload);
  } catch (err) {
    console.log(err);
  }
};
