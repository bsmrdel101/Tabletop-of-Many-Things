import axios from "axios";
import { Character, Skill } from "../scripts/types";

export let characters: Character[];
export let character: Character;
export let skills: Skill[];

export const updateCharacter = (data: Character) => character = data;
export const updateCharacterSkills = (data: Skill[]) => skills = data;

interface NewHealthPayload {
    id: number
    health: number
}

interface NewInspirationPayload {
    id: number
    newInspiration: boolean
}

interface NewSkillPayload {
    id: number
    characterId: number
    name: string
    type: string
    bonus_mod: number
    proficient: boolean
}

// === GET routes === //

export const getCharacters = async () => {
    try {
        const res = await axios.get('/api/characters');
        characters = res.data;
    } catch (err) {
        console.log(err);
    }
};

export const getCharacter = async (id: number) => {
    try {
        const res = await axios.get(`/api/characters/${id}`);
        return res.data[0];
    } catch (err) {
        console.log(err);
    }
};

export const getCharacterSkills = async (id: number) => {
    try {
        const res = await axios.get(`/api/characters/skills/${id}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

// === POST routes === //

export const addCharacter = async (payload: Character) => {
    try {
        await axios.post('/api/characters', payload);
    } catch (err) {
        console.log(err);
    }
};

export const addCharacterSkill = async (payload: Skill) => {
    try {
        await axios.post('/api/characters/skills', {id: character.id, ...payload});
    } catch (err) {
        console.log(err);
    }
};

// === PUT routes === //

export const setHealth = async (payload: NewHealthPayload) => {
    try {
        await axios.put('/api/characters/health', payload);
        character = await getCharacter(payload.id);
    } catch (err) {
        console.log(err);
    }
};

export const setTempHealth = async (payload: NewHealthPayload) => {
    try {
        await axios.put('/api/characters/temp', payload);
        character = await getCharacter(payload.id);
    } catch (err) {
        console.log(err);
    }
};

export const setInspiration = async (payload: NewInspirationPayload) => {
    try {
        await axios.put('/api/characters/inspiration', payload);
        character = await getCharacter(payload.id);
    } catch (err) {
        console.log(err);
    }
};

export const setCharacterSkill = async (payload: NewSkillPayload) => {
    try {
        await axios.put('/api/characters/skills', payload);
        skills = await getCharacterSkills(payload.characterId);
    } catch (err) {
        console.log(err);
    }
};
