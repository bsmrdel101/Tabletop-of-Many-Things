import api from "@/scripts/config/axios";
import { addAsset } from "../assetsService";
import { uploadFile } from "../mediaService";


const parseCharacter5eData = (char: any) => {
  const ac = char.acOverride ? char.acOverride : 10 + char.acMod;
  return { ...char, ac };
};

// === GET routes === //

export const getCharactersByUser = async (): Promise<CharacterMin_5e[]> => {
  try {
    const auth = { withCredentials: true };
    const res = await api.get(`/api/5e/characters`, auth);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCharacterById = async (id: number): Promise<Character_5e | null> => {
  try {
    const auth = { withCredentials: true };
    const res = await api.get(`/api/5e/characters/${id}`, auth);
    return parseCharacter5eData(res.data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

// === POST routes === //

export const addCharacter = async (user: User, name: string, img: File | null, ruleset: string) => {
  try {
    const auth = { withCredentials: true };
    const url = img && await uploadFile('tokens', img, `${user.id}_${user.username}/${img.name}`, { upsert: true });
    const assetId = (url && img) ? await addAsset(null, img.name, 'assets', url) : 1;
    await api.post(`/api/5e/characters`, { name, assetId, ruleset }, auth);
  } catch (error) {
    console.log(error);
  }
};

// === PATCH routes === //

export const editCharacterHealth = async (id: number, hp: number) => {
  try {
    const auth = { withCredentials: true };
    await api.patch(`/api/5e/characters/health`, { id, hp }, auth);
  } catch (error) {
    console.log(error);
  }
};

export const restoreCharacterMaxHp = async (id: number) => {
  try {
    const auth = { withCredentials: true };
    await api.patch(`/api/5e/characters/restore-max-hp`, { id }, auth);
  } catch (error) {
    console.log(error);
  }
};

export const setCharacterInspiration = async (id: number, insp: boolean) => {
  try {
    const auth = { withCredentials: true };
    await api.patch(`/api/5e/characters/insp`, { id, insp }, auth);
  } catch (error) {
    console.log(error);
  }
};

// === PUT routes === //

export const editCharacter = async (character: Character_5e) => {
  try {
    const auth = { withCredentials: true };
    await api.put(`/api/5e/characters`, character, auth);
  } catch (error) {
    console.log(error);
  }
};

// === DELETE routes === //

export const deleteCharacter = async (id: number) => {
  try {
    const auth = { withCredentials: true };
    await api.delete(`/api/5e/characters/${id}`, auth);
  } catch (error) {
    console.log(error);
  }
};
