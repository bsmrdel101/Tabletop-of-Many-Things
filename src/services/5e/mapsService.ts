import axios from "axios";


interface NewMap {
  name: string
  image: File
  isBlank: boolean
}

// === GET routes === //

export const getMaps = async (id: number) => {
  try {    
    const res = await axios.get(`/api/5e/map/all/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMap = async (mapId: number, gameId: number) => {
  try {
    const res = await axios.get(`/api/5e/map/{"mapId":${mapId}, "gameId":${gameId}}`);
    res.data.boardState = res.data.boardState.map((token: any) => {
      return { ...token, creature: JSON.parse(token.creature) };
    }).filter((token: Token_5e) => token.id);
    res.data.offsetX = Number(res.data.offsetX);
    res.data.offsetY = Number(res.data.offsetY);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// === POST routes === //

export const addMap = async (payload: NewMap, gameId: number) => {
  try {
    // Upload map image to firebase
    if (!payload.isBlank) {
      // const mapRef = ref(storage, payload.name);
      // uploadBytes(mapRef, payload.image);
    }
    
    // Build map data object
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/tabletop-of-many-things.appspot.com/o/${payload.name}?alt=media&token=43812579-1456-4432-8005-2006de47ce45`;
    const mapData = {
      id: gameId,
      name: payload.name,
      image: payload.isBlank ? payload.image : imageUrl
    };

    await axios.post('/api/5e/map', mapData);
  } catch (error) {
    console.error(error);
  }
};

export const addTokenToMap = async (gameId: number, token: Token_5e, mapId: number, x: number, y: number) => {
  try {
    await axios.post('/api/5e/map/token', {
      gameId: gameId,
      mapId: mapId,
      assetId: token.assetId,
      x: x,
      y: y,
      size: token.size || 1,
      creature: token.creature || null
    });
  } catch (error) {
    console.error(error);
  }
};

// === PUT routes === //

export const updateMap = async (payload: Map_5e) => {
  try {
    await axios.put('/api/5e/map', payload);
  } catch (error) {
    console.error(error);
  }
};

// Update token board state
export const updateToken = async (id: number, size: number, x: number, y: number) => {
  try {
    await axios.put('/api/5e/map/token', {
      id: id,
      x: x,
      y: y,
      size: size
    });
  } catch (error) {
    console.error(error);
  }
};

// === POST routes === //

export const deleteTokenFromMap = async (id: number) => {
  try {
    await axios.delete(`/api/5e/map/token/${id}`);
  } catch (error) {
    console.error(error);
  }
};
