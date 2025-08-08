export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export const generateClasses = (className: string, variantsList: string[], elmt: string): string => {
  const variants = variantsList ? variantsList.map((i) => `${elmt}--${i}`).join(' ') : '';
  return [className, variants && variants, elmt].filter(Boolean).join(' ');
};

export const parseClasses = (classes: string): object => {
  return classes ? { className: classes } : {};
};

export const removeNullObjProps = (obj: any): object => Object.entries(obj).reduce((a: any, [k, v]) => (v == null ? a : (a[k] = v, a)), {});

export const formatCharacterCardClasses = (classes: { name: string, lvl: number, subclass: string | null }[]): string => {
  return classes.map((c) => {
    return `${c.subclass ?? ''} ${c.name} ${c.lvl}`.trim();
  }).join(' / ');
};

export const formatCharacterClasses = (classes: PlayerClass_5e[]): string => {
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

export const randomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateCode = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += characters[randomInt(0, characters.length - 1)];
  }
  return code;
};
