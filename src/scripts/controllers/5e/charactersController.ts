import axios from "axios";


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
    return res.data;
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

// === PUT routes === //

export const editCharacter = async (character: Character) => {
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
