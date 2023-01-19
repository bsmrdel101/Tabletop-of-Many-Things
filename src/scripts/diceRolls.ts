import { Roll } from "./types";

export const rollDice = (amount: number, type: number, mod?: number): Roll => {
  let result: number;
  let roll = 0;
  // Get dice roll
  for (let i = 0; i < amount; i++) {
    roll += Math.floor(Math.random() * (type - 1 + 1)) + 1;
  }
  result = roll;
  // Get total result
  if (mod) result += mod;
  
  return { amount: amount, type: type, mod: mod || 0, roll: roll, total: result };
};
