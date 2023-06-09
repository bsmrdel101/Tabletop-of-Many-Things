import axios from "axios";
import { Game, Map } from "../types";
import { gameRef } from "../../views/GamePage";


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
    return res.data[0];
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
    getGames();
  } catch (err) {
    console.log(err);
  }
};

export const addGameToHistory = async (payload: Game) => {
  try {
    await axios.post('/api/dashboard/history', payload);
  } catch (err) {
    console.log(err);
  }
};

// === PUT routes === //

export const setSelectedMap = async (payload: Map) => {
  try {
    await axios.put(`/api/dashboard/${gameRef.id}`, payload);
  } catch (err) {
    console.log(err);
  }
};
