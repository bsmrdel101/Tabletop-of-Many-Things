import { character } from "../controllers/charactersController";

// Returns modifiers for each ability score
export const getAbilityScoreModifiers = () => {
    let strMod = Math.floor((character.str - 10) / 2);
    let dexMod = Math.floor((character.dex - 10) / 2);
    let conMod = Math.floor((character.con - 10) / 2);
    let intMod = Math.floor((character.int - 10) / 2);
    let wisMod = Math.floor((character.wis - 10) / 2);
    let charMod = Math.floor((character.char - 10) / 2);
    return { strMod, dexMod, conMod, intMod, wisMod, charMod };
};