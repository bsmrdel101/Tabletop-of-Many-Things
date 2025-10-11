import { emitServerEvent } from "@/scripts/config/socket-io";
import { editCharacterHealth, editCharacterMaxHp } from "@/rulesets/dnd/services/charactersService";
import { addPlayerClass, editPlayerClass, removePlayerClass } from "@/rulesets/5e/services/classesService";
import { alert } from "@/scripts/tools/popups";


export const playerManager = {
  // HEALTH

  heal: (character: Character_Dnd, amount: number, room: string) => {
    if (character.hp === character.maxHp - character.maxHpDmg || amount === 0) return;
    const newHp = Math.min(character.hp + amount, character.maxHp - character.maxHpDmg);
    editCharacterHealth(character.id, newHp, character.tempHp);
    emitServerEvent('UPDATE_PLAYER', [{ ...character, hp: newHp }, room]);
  },
  dmg: (character: Character_Dnd, amount: number, room: string) => {
    if (amount === 0) return;
    const actualDmg = Math.max(0, amount - character.tempHp);
    const tempHp = Math.max(0, character.tempHp - amount);
    const newHp = Math.max(0, character.hp - actualDmg);
    editCharacterHealth(character.id, newHp, tempHp);
    emitServerEvent('UPDATE_PLAYER', [{ ...character, hp: newHp, tempHp }, room]);
  },
  setTempHp: (character: Character_Dnd, amount: number, room: string) => {
    if (amount <= 0) return;
    editCharacterHealth(character.id, character.hp, amount);
    emitServerEvent('UPDATE_PLAYER', [{ ...character, tempHp: amount }, room]);
  },
  dmgMaxHp: (character: Character_Dnd, amount: number, room: string) => {
    if (amount === 0) return;
    const newMaxHpDmg = character.maxHpDmg + amount;
    const newHp = Math.min(character.hp, character.maxHp - newMaxHpDmg);
    editCharacterMaxHp(character.id, character.maxHpMod, character.maxHpOverride, newMaxHpDmg, character.maxHp);
    editCharacterHealth(character.id, newHp, character.tempHp);
    emitServerEvent('UPDATE_PLAYER', [{ ...character, maxHpDmg: newMaxHpDmg, hp: newHp }, room]);
  },
  restoreMaxHp: (character: Character_Dnd, room: string) => {
    editCharacterMaxHp(character.id, character.maxHpMod, character.maxHpOverride, 0, character.maxHp);
    emitServerEvent('UPDATE_PLAYER', [{ ...character, maxHpDmg: 0 }, room]);
  },

  // CLASSES

  addClass: async (characterId: number, c: Class_5e): Promise<PlayerClass_5e | null> => {
    const res = await addPlayerClass({ characterId, classId: c.id });
    if (!res) {
      alert('Failed to add class');
      return null;
    }
    return {
      id: c.id,
      playerClassId: res.id,
      name: c.name,
      lvl: 1,
      hitDice: c.hitDice,
      subclass: null
    } as PlayerClass_5e;
  },
  removeClass: async (id: number, playerClasses: PlayerClass_5e[]): Promise<PlayerClass_5e[]> => {
    await removePlayerClass(id);
    return playerClasses.filter((c) => c.playerClassId !== id);
  },
  editClassLevel: async (playerClassId: number, lvl: number, playerClasses: PlayerClass_5e[]): Promise<PlayerClass_5e[]> => {
    const classesToEdit: PlayerClass_5e[] | PlayerClass_2024[] = [];
    for (const c of classesToEdit) {
      await editPlayerClass({ id: c.playerClassId, lvl: c.lvl, subclassId: null });
    }

    return playerClasses.map((c) => {
      if (c.id === playerClassId) {
        const newClass = { ...c, lvl };
        classesToEdit.push(newClass);
        return newClass;
      }
      return c;
    });
  }
};
