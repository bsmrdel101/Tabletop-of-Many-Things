import { emitServerEvent } from "../../config/socket-io";
import { editCharacter, editCharacterHealth } from "../../controllers/5e/charactersController";


export const getCharacterSubtitle = (character: Character): string => {
  const arr = [];
  if (character.race) arr.push(character.race.name);
  character.classes.forEach((c) => {
    if (c) arr.push(`${c.name}${character.classes.length > 1 ? ` lvl ${c.lvl}` : ''}`);
  });
  if (character.background) arr.push(character.background.name);
  return arr.join(', ');
};

export const getXpFromLvl = (lvl: number): number => {
  switch (lvl) {
  case 1:
    return 300;
  case 2:
    return 900;
  case 3:
    return 2700;
  case 4:
    return 6500;
  case 5:
    return 14000;
  case 6:
    return 23000;
  case 7:
    return 34000;
  case 8:
    return 48000;
  case 9:
    return 64000;
  case 10:
    return 85000;
  case 11:
    return 100000;
  case 12:
    return 120000;
  case 13:
    return 140000;
  case 14:
    return 165000;
  case 16:
    return 195000;
  case 17:
    return 225000;
  case 18:
    return 265000;
  case 19:
    return 305000;
  default:
    return 355000;
  }
};

export const dmgPlayerMaxHp = async (character: Character, dmg: number) => {
  const maxHpMod = character.maxHp - dmg < 0 ? -character.maxHp : -dmg;
  const hp = character.hp > character.maxHp - dmg ? character.maxHp : character.hp;
  emitServerEvent('UPDATE_PLAYER', [{ ...character, maxHpMod, hp }]);
  await editCharacter({ ...character, maxHpMod, hp });
};

export const dmgPlayer = async (character: Character, dmg: number) => {
  const { maxHp } = character;
  let totalDmg = dmg;
  let tempHp = character.tempHp;
  let hp = character.hp;
  if (tempHp > 0) {
    tempHp -= dmg;
    if (tempHp < 0) {
      totalDmg = Math.abs(tempHp);
      tempHp = 0;
    } else {
      totalDmg = 0;
    }
  }
  hp -= totalDmg;
  if (hp < 0) hp = 0;
  emitServerEvent('UPDATE_PLAYER', [{ ...character, hp, tempHp }]);
  await editCharacterHealth(character.id, maxHp, hp, tempHp);
};

export const addPlayerTempHp = async (character: Character, tempHp: number) => {
  const { maxHp, hp } = character;
  emitServerEvent('UPDATE_PLAYER', [{ ...character, tempHp }]);
  await editCharacterHealth(character.id, maxHp, hp, tempHp);
};

export const healPlayer = async (character: Character, value: number) => {
  const { maxHp, tempHp } = character;
  const hp = character.hp + value > character.maxHp ? character.maxHp : character.hp + value;
  emitServerEvent('UPDATE_PLAYER', [{ ...character, hp }]);
  await editCharacterHealth(character.id, maxHp, hp, tempHp);
};

export const restorePlayerMaxHp = async (character: Character) => {
  emitServerEvent('UPDATE_PLAYER', [{ ...character, maxHpMod: 0 }]);
  await editCharacter({ ...character, maxHpMod: 0 });
};
