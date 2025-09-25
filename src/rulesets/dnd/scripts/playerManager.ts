import { emitServerEvent } from "@/scripts/config/socket-io";
import { editCharacterHealth, editCharacterMaxHp } from "@/rulesets/dnd/services/charactersService";


// HEALTH

export const healPlayer = (character: Character_Dnd, amount: number, room: string) => {
  if (character.hp === character.maxHp - character.maxHpDmg || amount === 0) return;
  const newHp = Math.min(character.hp + amount, character.maxHp - character.maxHpDmg);
  editCharacterHealth(character.id, newHp, character.tempHp);
  emitServerEvent('UPDATE_PLAYER', [{ ...character, hp: newHp }, room]);
};

export const dmgPlayer = (character: Character_Dnd, amount: number, room: string) => {
  if (amount === 0) return;
  const actualDmg = Math.max(0, amount - character.tempHp);
  const tempHp = Math.max(0, character.tempHp - amount);
  const newHp = Math.max(0, character.hp - actualDmg);
  editCharacterHealth(character.id, newHp, tempHp);
  emitServerEvent('UPDATE_PLAYER', [{ ...character, hp: newHp, tempHp }, room]);
};

export const addPlayerTempHp = (character: Character_Dnd, amount: number, room: string) => {
  if (amount <= 0) return;
  editCharacterHealth(character.id, character.hp, amount);
  emitServerEvent('UPDATE_PLAYER', [{ ...character, tempHp: amount }, room]);
};

export const dmgPlayerMaxHp = (character: Character_Dnd, amount: number, room: string) => {
  if (amount === 0) return;
  const newMaxHpDmg = character.maxHpDmg + amount;
  const newHp = Math.min(character.hp, character.maxHp - newMaxHpDmg);
  editCharacterMaxHp(character.id, character.maxHpMod, character.maxHpOverride, newMaxHpDmg, character.maxHp);
  editCharacterHealth(character.id, newHp, character.tempHp);
  emitServerEvent('UPDATE_PLAYER', [{ ...character, maxHpDmg: newMaxHpDmg, hp: newHp }, room]);
};

export const restorePlayerMaxHp = (character: Character_Dnd, room: string) => {
  editCharacterMaxHp(character.id, character.maxHpMod, character.maxHpOverride, 0, character.maxHp);
  emitServerEvent('UPDATE_PLAYER', [{ ...character, maxHpDmg: 0 }, room]);
};
