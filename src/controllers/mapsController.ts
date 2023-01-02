import axios from "axios";
import { Token } from "../scripts/token";
import { Coord, Game, Map } from "../scripts/types";
import { roomRef } from "../views/GamePage/GamePage";
import { getGame } from "./dashboardController";

interface MapTokenData {
  token: Token
  x: number
  y: number
  size: number
}


// === GET routes === //

export const getMaps = async (id: number) => {
  try {
    const res = await axios.get(`/api/map/all/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getMap = async (id: number) => {
  try {
    const res = await axios.get(`/api/map/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getMapTokens = async (id: number) => {
  try {
    const res = await axios.get(`/api/map/token/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// === POST routes === //

export const addMap = async (payload: Map) => {
  try {
    await axios.post('/api/map', payload);
  } catch (err) {
    console.log(err);
  }
};

export const addTokenToMap = async (payload: MapTokenData) => {
  try {
    const game: Game = await getGame(roomRef);
    const map: Map = await getMap(game.map_id);
    await axios.post('/api/map/token', { mapId: map.id, ...payload });
  } catch (err) {
    console.log(err);
  }
};

// === PUT routes === //

export const setMap = async (payload: Map) => {
  try {
    await axios.put('/api/map', payload);
  } catch (err) {
    console.log(err);
  }
};

// === DELETE routes === //

export const deleteTokenFromMap = async (token: Token, cell: Coord) => {
  try {
    await axios.delete(`/api/map/token/${cell.x}, ${cell.y}, ${token.id}`);
  } catch (err) {
    console.log(err);
  }
};

export const clearTokensFromMap = async () => {
  try {
    const game: Game = await getGame(roomRef);
    await axios.delete(`/api/map/token/all/${game.map_id}`);
  } catch (err) {
    console.log(err);
  }
};

// const getTokenId = (tokens: Token[], selectedToken: Token): number => {
//   tokens.forEach((token: Token) => {
//     if (token.)
//   });
// };
