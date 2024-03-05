export const rollDice = (amount: number, type: number, mod?: number): Roll => {
  let result: number;
  let roll = 0;
  
  for (let i = 0; i < amount; i++) {
    if (type === 100) {
      roll += (Math.floor(Math.random() * (10 - 1 + 1)) + 1) * 10;
    } else {
      roll += Math.floor(Math.random() * (type - 1 + 1)) + 1;
    }
  }

  result = roll;
  if (mod) result += mod;
  return { amount: amount, type: type, mod: mod || 0, roll: roll, total: result };
};
