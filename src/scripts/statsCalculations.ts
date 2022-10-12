import { character } from "../controllers/charactersController";

// Returns modifiers for each ability score
export const getAbilityScoreModifiers = () => {
    const strMod = Math.floor((character.str - 10) / 2);
    const dexMod = Math.floor((character.dex - 10) / 2);
    const conMod = Math.floor((character.con - 10) / 2);
    const intMod = Math.floor((character.int - 10) / 2);
    const wisMod = Math.floor((character.wis - 10) / 2);
    const charMod = Math.floor((character.char - 10) / 2);
    return { strMod, dexMod, conMod, intMod, wisMod, charMod };
};