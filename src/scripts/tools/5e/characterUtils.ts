import { emitServerEvent } from "../../config/socket-io";
import { editCharacter, editCharacterHealth, restoreCharacterMaxHp } from "../../controllers/5e/charactersController";


export const getCharacterSubtitle = (character: Character_5e): string => {
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

export const dmgPlayerMaxHp = async (character: Character_5e, dmg: number, room: string) => {
  const newMaxHp = Math.max(character.maxHp - dmg, 0);
  const newHp = Math.min(character.hp, newMaxHp);
  emitServerEvent('UPDATE_PLAYER', [{ ...character, maxHp: newMaxHp, hp: newHp }, room]);
  await editCharacter({ ...character, maxHp: newMaxHp, hp: newHp });
};

export const dmgPlayer = async (character: Character_5e, dmg: number, room: string) => {
  let { tempHp, hp } = character;
  let remainingDmg = dmg;

  if (tempHp > 0) {
    const absorbed = Math.min(tempHp, dmg);
    tempHp -= absorbed;
    remainingDmg -= absorbed;
  }
  if (remainingDmg > 0) {
    hp = Math.max(hp - remainingDmg, 0);
  }

  emitServerEvent('UPDATE_PLAYER', [{ ...character, hp, tempHp }, room]);
  await editCharacter({ ...character, hp, tempHp });
};

export const addPlayerTempHp = async (character: Character_5e, tempHp: number, room: string) => {
  const updatedTempHp = character.tempHp + tempHp;
  emitServerEvent('UPDATE_PLAYER', [{ ...character, tempHp: updatedTempHp }, room]);
  await editCharacter({ ...character, tempHp: updatedTempHp });
};

export const healPlayer = async (character: Character_5e, value: number, room: string) => {
  const newHp = Math.min(character.hp + value, character.maxHp);
  emitServerEvent('UPDATE_PLAYER', [{ ...character, hp: newHp }, room]);
  await editCharacterHealth(character.id, newHp);
};

export const restorePlayerMaxHp = async (character: Character_5e, room: string) => {
  emitServerEvent('UPDATE_PLAYER', [{ ...character, maxHp: character.prevMaxHp }, room]);
  await restoreCharacterMaxHp(character.id);
};

export const getHealthColor = (hp: number, maxHp: number) => {
  const healthyColor = '#23a82e';
  const woundedColor = '#f27746';
  const criticalColor = '#f53333';
  let color = healthyColor;
  
  if (hp <= maxHp * 0.5) {
    color = woundedColor;
  }
  if (hp <= maxHp * 0.25) {
    color = criticalColor;
  }
  return color;
};
