import api from "@/scripts/config/axios";
import { addAsset } from "@/services/assetsService";
import { uploadFile } from "@/services/mediaService";


const parseCharacter5eData = (character: any) => {
  const ac = character.acOverride ? character.acOverride : 10 + character.acMod;
  return { ...character, ac };
};

// === GET routes === //

export const getCharactersByUser = async (): Promise<CharacterCard_5e[]> => {
  try {
    const auth = { withCredentials: true };
    const res = await api.get(`/api/5e/characters`, auth);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCharacterById = async (id: number): Promise<Character_5e | null> => {
  try {
    const auth = { withCredentials: true };
    const res = await api.get(`/api/5e/characters/${id}`, auth);
    return parseCharacter5eData(res.data);
  } catch (error) {
    console.error(error);
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
    console.error(error);
  }
};

// === PATCH routes === //

export const editCharacterHealth = async (id: number, hp: number, tempHp: number) => {
  try {
    const auth = { withCredentials: true };
    await api.patch(`/api/5e/characters/health`, { id, hp, tempHp }, auth);
  } catch (error) {
    console.error(error);
  }
};

export const editCharacterMaxHp = async (id: number, maxHpMod: number, maxHpOverride: number, maxHpDmg: number, maxHp: number) => {
  try {
    const auth = { withCredentials: true };
    await api.patch(`/api/5e/characters/max-hp`, { id, maxHpMod, maxHpOverride, maxHpDmg, maxHp }, auth);
  } catch (error) {
    console.error(error);
  }
};

export const editCharacterInspiration = async (id: number, insp: boolean) => {
  try {
    const auth = { withCredentials: true };
    await api.patch(`/api/5e/characters/insp`, { id, insp }, auth);
  } catch (error) {
    console.error(error);
  }
};

// === PUT routes === //

export const editCharacter = async (character: Character_5e) => {
  try {
    const auth = { withCredentials: true };
    await api.put(`/api/5e/characters`, character, auth);
  } catch (error) {
    console.error(error);
  }
};

// === DELETE routes === //

export const deleteCharacter = async (id: number) => {
  try {
    const auth = { withCredentials: true };
    await api.delete(`/api/5e/characters/${id}`, auth);
  } catch (error) {
    console.error(error);
  }
};
