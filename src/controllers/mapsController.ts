import axios from "axios";
import { Token } from "../scripts/token";
import { Coord, Game, Map } from "../scripts/types";
import { roomRef } from "../views/GamePage/GamePage";
import { getGame } from "./dashboardController";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../scripts/firebase";

interface MapTokenData {
  token: Token
  x: number
  y: number
  size: number
}

interface NewMap {
  name: string
  image: File
  isBlank: boolean
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

export const addMap = async (payload: NewMap) => {
  try {
    // Upload map image to firebase
    if (!payload.isBlank) {
      const mapRef = ref(storage, payload.name);
      uploadBytes(mapRef, payload.image);
    }
    
    // Build map data object
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/tabletop-of-many-things.appspot.com/o/${payload.name}?alt=media&token=43812579-1456-4432-8005-2006de47ce45`;
    const game: Game = await getGame(roomRef);
    const mapData = {
      id: game.id,
      name: payload.name,
      image: payload.isBlank ? payload.image : imageUrl
    };

    await axios.post('/api/map', mapData);
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
