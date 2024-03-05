import axios from "axios";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";


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

export const getMap = async (mapId: number, gameId: number) => {
  try {
    const res = await axios.get(`/api/map/{"mapId":${mapId}, "gameId":${gameId}}`);
    res.data.boardState = res.data.boardState.map((token: any) => {
      return { ...token, creature: JSON.parse(token.creature) };
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// === POST routes === //

export const addMap = async (payload: NewMap, gameId: number) => {
  try {
    // Upload map image to firebase
    if (!payload.isBlank) {
      const mapRef = ref(storage, payload.name);
      uploadBytes(mapRef, payload.image);
    }
    
    // Build map data object
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/tabletop-of-many-things.appspot.com/o/${payload.name}?alt=media&token=43812579-1456-4432-8005-2006de47ce45`;
    const mapData = {
      id: gameId,
      name: payload.name,
      image: payload.isBlank ? payload.image : imageUrl
    };

    await axios.post('/api/map', mapData);
  } catch (err) {
    console.log(err);
  }
};

export const addTokenToMap = async (gameId: number, token: Token, mapId: number, x: number, y: number) => {
  try {
    await axios.post('/api/map/token', {
      gameId: gameId,
      mapId: mapId,
      assetId: token.id,
      x: x,
      y: y,
      size: token.size || 1,
      creature: token.creature || null
    });
  } catch (err) {
    console.log(err);
  }
};

// === PUT routes === //

export const setMap = async (payload: Board) => {
  try {
    await axios.put('/api/map', payload);
  } catch (err) {
    console.log(err);
  }
};

// Update token board state
export const updateToken = async (id: number, size: number, x: number, y: number) => {
  try {
    await axios.put('/api/map/token', {
      id: id,
      x: x,
      y: y,
      size: size
    });
  } catch (err) {
    console.log(err);
  }
};

// === POST routes === //

export const deleteTokenFromMap = async (id: number) => {
  try {
    await axios.delete(`/api/map/token/${id}`);
  } catch (err) {
    console.log(err);
  }
};
