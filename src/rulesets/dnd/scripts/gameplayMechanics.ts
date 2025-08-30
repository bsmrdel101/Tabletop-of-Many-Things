import { randomInt } from "@/scripts/tools/utils";
import { createDice } from "./utils";


export const rollDice = (diceList: Dice_Dnd[], globalMod = 0): RollResult_Dnd => {
  const diceGroups: DiceGroupResult_Dnd[] = [];
  diceList.forEach((dice: Dice_Dnd) => {
    const { amount, type, mod } = dice;
    const rolls: DieResult_Dnd[] = [];
    for (let i = 0; i < amount; i++) {
      const rolled = randomInt(1, type);
      rolls.push({ type, rolled });
    }
    const sum = rolls.reduce((acc, cur) => acc + cur.rolled, 0);
    const groupTotal = sum + mod;
    diceGroups.push({ dice, rolls, mod, rolled: sum, total: groupTotal });
  });
  const rolled = diceGroups.reduce((acc, group) => acc + group.total, 0);
  const total = rolled + globalMod;
  return { total, rolled, diceGroups };
};

export const rollDC = (target: number, mod: number): DCRollResult_Dnd => {
  const roll = rollDice([createDice(1, 20, mod)]).total;
  return { target, roll, success: roll >= target };
};

export const rollCheck = (mod: number, target?: number): DCRollResult_Dnd | null => {
  if (target) {
    return rollDC(target, mod);
  } else {
    rollDice([createDice(1, 20, mod)]);
    return null;
  }
};

export const rollInit = (mod: number) => {
  rollDice([createDice(1, 20, mod)]);
};
