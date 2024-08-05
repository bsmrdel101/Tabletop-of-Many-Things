import axios from "axios";


// === GET routes === //

export const getAllCharacters = async () => {
  try {
    const res = await axios.get('/api/character');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCharacter = async (id: number) => {
  try {
    const res = await axios.get(`/api/character/${id}`);
    return res.data[0];
  } catch (err) {
    console.log(err);
  }
};

// === POST routes === //

export const addCharacter = async () => {
  try {
    await axios.post('/api/character');
  } catch (err) {
    console.log(err);
  }
};

// === PUT routes === //

export const editCharacter = async (character: Character) => {
  try {
    await axios.put('/api/character', character);
  } catch (err) {
    console.log(err);
  }
};
