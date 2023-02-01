import axios from "axios";
import { Token } from "../scripts/components/token";
import { Game, Map } from "../scripts/types";
import { gameRef, roomRef } from "../views/GamePage/GamePage";
import { getGame } from "./dashboardController";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../scripts/firebase";

interface MapTokenData {
  token: Token
  x: number
  y: number
  size: number
  game: Game
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
    res.data.boardState = JSON.parse(res.data.boardState);
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
    const mapData = {
      id: gameRef.id,
      name: payload.name,
      image: payload.isBlank ? payload.image : imageUrl
    };

    await axios.post('/api/map', mapData);
  } catch (err) {
    console.log(err);
  }
};

export const updateMapTokens = async (payload: MapTokenData) => {
  try {
    const map: Map = await getMap(payload.game.map_id);
    const boardState: string = JSON.stringify(map.boardState).replace(']', '').replace('[', '');
    const { token, x, y, size } = payload;
    const newState = `[${`${boardState}{"map_id": ${map.id}, "token_id": ${token.id}, "x": ${x}, "y": ${y}, "size": ${size}}`}]`.replaceAll('}{', '},{');
    setMapBoardState(map.id, newState);
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

// Update token board state
export const setMapBoardState = async (mapId: number, boardState: string) => {
  try {
    await axios.put('/api/map/token', { mapId: mapId, boardState: boardState });
  } catch (err) {
    console.log(err);
  }
};

export const clearTokensFromMap = async () => {
  try {
    const game: Game = await getGame(roomRef);
    setMapBoardState(game.map_id, '[]');
  } catch (err) {
    console.log(err);
  }
};
