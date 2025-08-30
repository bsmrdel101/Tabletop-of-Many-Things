import { numPrefix } from "@/scripts/tools/utils";

export const formatCharacterCardClasses = (classes: { name: string, lvl: number, subclass: string | null }[]): string => {
  return classes.map((c) => {
    return `${c.subclass ?? ''} ${c.name} lvl ${c.lvl}`.trim();
  }).join(' / ');
};

export const formatCharacterClasses = (classes: PlayerClass_5e[] | PlayerClass_2024[]): string => {
  return classes.map((c) => {
    return `${c.subclass?.name ?? ''} ${c.name} lvl ${c.lvl}`.trim();
  }).join(' / ');
};

export const getHealthColor = (hp: number, maxHp: number) => {
  const healthyColor = 'var(--green-light-2)';
  const woundedColor = 'var(--orange-0)';
  const criticalColor = 'var(--red-4)';
  let color = healthyColor;
  
  if (hp <= maxHp * 0.5) {
    color = woundedColor;
  }
  if (hp <= maxHp * 0.25) {
    color = criticalColor;
  }
  return color;
};

export const createDice = (amount: number, type: number, mod = 0): Dice_Dnd => {
  return { amount, type, mod, display: `${1}d${type}${mod ? numPrefix(mod) : ''}` };
};
