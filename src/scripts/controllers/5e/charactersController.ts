import axios from "axios";


const parseCharacter5eData = (char: any) => {
  const ac = char.acOverride ? char.acOverride : 10 + char.acMod;
  return { ...char, ac };
};

// === GET routes === //

export const getAllCharacters = async () => {
  try {
    const res = await axios.get(`/api/5e/characters`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCharacterById = async (id: number) => {
  try {
    const res = await axios.get(`/api/5e/characters/${id}`);
    return parseCharacter5eData(res.data);
  } catch (err) {
    console.log(err);
  }
};

// === POST routes === //

export const addCharacter = async () => {
  try {
    await axios.post(`/api/5e/characters`);
  } catch (err) {
    console.log(err);
  }
};

// === PATCH routes === //

export const editCharacterHealth = async (id: number, hp: number) => {
  try {
    await axios.patch(`/api/5e/characters/health`, { id, hp });
  } catch (err) {
    console.log(err);
  }
};

export const restoreCharacterMaxHp = async (id: number) => {
  try {
    await axios.patch(`/api/5e/characters/restore-max-hp`, { id });
  } catch (err) {
    console.log(err);
  }
};

export const setCharacterInspiration = async (id: number, insp: boolean) => {
  try {
    await axios.patch(`/api/5e/characters/insp`, { id, insp });
  } catch (err) {
    console.log(err);
  }
};

// === PUT routes === //

export const editCharacter = async (character: Character_5e) => {
  try {
    await axios.put(`/api/5e/characters`, character);
  } catch (err) {
    console.log(err);
  }
};

// === DELETE routes === //

export const deleteCharacter = async (id: number) => {
  try {
    await axios.delete(`/api/5e/characters/${id}`);
  } catch (err) {
    console.log(err);
  }
};
