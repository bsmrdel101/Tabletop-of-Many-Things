import axios from "axios";


const parseCharacter5eData = (char: any) => {
  const ac = char.acOverride ? char.acOverride : 10 + char.acMod;
  return { ...char, ac };
};

// === GET routes === //

export const getCharactersByUser = async (): Promise<Character_5e[]> => {
  try {
    const res = await axios.get(`/api/5e/characters`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCharacterById = async (id: number): Promise<Character_5e | null> => {
  try {
    const res = await axios.get(`/api/5e/characters/${id}`);
    return parseCharacter5eData(res.data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

// === POST routes === //

export const addCharacter = async () => {
  try {
    await axios.post(`/api/5e/characters`);
  } catch (error) {
    console.log(error);
  }
};

// === PATCH routes === //

export const editCharacterHealth = async (id: number, hp: number) => {
  try {
    await axios.patch(`/api/5e/characters/health`, { id, hp });
  } catch (error) {
    console.log(error);
  }
};

export const restoreCharacterMaxHp = async (id: number) => {
  try {
    await axios.patch(`/api/5e/characters/restore-max-hp`, { id });
  } catch (error) {
    console.log(error);
  }
};

export const setCharacterInspiration = async (id: number, insp: boolean) => {
  try {
    await axios.patch(`/api/5e/characters/insp`, { id, insp });
  } catch (error) {
    console.log(error);
  }
};

// === PUT routes === //

export const editCharacter = async (character: Character_5e) => {
  try {
    await axios.put(`/api/5e/characters`, character);
  } catch (error) {
    console.log(error);
  }
};

// === DELETE routes === //

export const deleteCharacter = async (id: number) => {
  try {
    await axios.delete(`/api/5e/characters/${id}`);
  } catch (error) {
    console.log(error);
  }
};
