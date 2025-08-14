import { emitServerEvent } from "@/scripts/config/socket-io";
import { editCharacterHealth, editCharacterMaxHp } from "@/services/5e/charactersService";


// HEALTH

export const healPlayer = async (character: Character_5e, amount: number, room: string) => {
  const newHp = Math.min(character.hp + amount, character.maxHp);
  await editCharacterHealth(character.id, newHp, character.tempHp);
  emitServerEvent('UPDATE_PLAYER', [{ ...character, hp: newHp }, room]);
};

export const dmgPlayer = async (character: Character_5e, dmg: number, room: string) => {
  const actualDmg = Math.max(0, dmg - character.tempHp);
  const tempHp = Math.max(0, character.tempHp - dmg);

  const newHp = Math.max(0, character.hp - actualDmg);
  await editCharacterHealth(character.id, newHp, tempHp);
  emitServerEvent('UPDATE_PLAYER', [{ ...character, hp: newHp, tempHp }, room]);
};

export const addPlayerTempHp = async (character: Character_5e, amount: number, room: string) => {
  if (amount <= 0) return;
  await editCharacterHealth(character.id, character.hp, amount);
  emitServerEvent('UPDATE_PLAYER', [{ ...character, tempHp: amount }, room]);
};

export const dmgPlayerMaxHp = async (character: Character_5e, amount: number, room: string) => {
  const newMaxHpDmg = character.maxHpDmg + amount;
  await editCharacterMaxHp(character.id, character.maxHpMod, character.maxHpOverride, newMaxHpDmg, character.maxHp);
  emitServerEvent('UPDATE_PLAYER', [{ ...character, maxHpDmg: newMaxHpDmg }, room]);
};
